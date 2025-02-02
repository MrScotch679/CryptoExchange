import { makeAutoObservable, runInAction } from 'mobx'

import { CryptoAPI } from '@api/CryptoAPI'

import { Crypto, CryptoType } from 'types/Crypto'

import { ExchangeInputStore } from './ExchangeInputStore'

export class ExchangeStore {
	private cryptoAPI: CryptoAPI

	availableCryptos: Crypto[] = []

	sourceCrypto?: ExchangeInputStore
	targetCrypto?: ExchangeInputStore

	isLoading: boolean = false
	ratePerOneSourceCrypto: number = 0

	constructor(cryptoAPI: CryptoAPI) {
		makeAutoObservable(this, undefined, { autoBind: true })

		this.cryptoAPI = cryptoAPI
	}

	async init() {
		runInAction(() => {
			this.isLoading = true
		})

		await this.getAvailableCryptos()

		if (!this.availableCryptos?.length) {
			return
		}

		const [source, target] = this.availableCryptos

		runInAction(() => {
			this.sourceCrypto = new ExchangeInputStore(source)
			this.targetCrypto = new ExchangeInputStore(target)
		})

		await this.calculateExchangeRate()

		runInAction(() => {
			this.sourceCrypto!.value = 1
			this.targetCrypto!.value = this.ratePerOneSourceCrypto

			this.isLoading = false
		})
	}

	async getAvailableCryptos() {
		try {
			const cryptos = await this.cryptoAPI.getAvailableCryptos()

			runInAction(() => {
				this.availableCryptos = cryptos.data
			})
		} catch (error) {
			console.error(error)
		}
	}

	async calculateExchangeRate() {
		if (!this.sourceCrypto || !this.targetCrypto) {
			return
		}

		const exchangeRateData = await this.getCryptoExchangeRateData(
			this.sourceCrypto?.selectedCrypto,
			this.targetCrypto?.selectedCrypto
		)

		if (!exchangeRateData) {
			return
		}

		const sourceCryptoUSDPrice =
			exchangeRateData?.[this.sourceCrypto?.selectedCrypto?.id]?.quote?.USD
				?.price

		const targetCryptoUSDPrice =
			exchangeRateData?.[this.targetCrypto?.selectedCrypto?.id]?.quote?.USD
				?.price

		runInAction(() => {
			this.ratePerOneSourceCrypto = Number(
				(sourceCryptoUSDPrice / targetCryptoUSDPrice).toFixed(4)
			)
		})
	}

	async getCryptoExchangeRateData(sourceCrypto: Crypto, targetCrypto: Crypto) {
		try {
			const rate = await this.cryptoAPI.getCryptoExchangeRate(
				sourceCrypto.id,
				targetCrypto.id
			)

			return rate.data
		} catch (error) {
			console.error(error)
		}
	}

	async onSelectCrypto(crypto: Crypto, cryptoType: CryptoType) {
		if (!this.sourceCrypto || !this.targetCrypto) {
			return
		}

		const isSource = cryptoType === 'sourceCrypto'

		runInAction(() => {
			if (isSource) {
				this.sourceCrypto!.selectedCrypto = crypto
			} else {
				this.targetCrypto!.selectedCrypto = crypto
			}
		})

		await this.calculateExchangeRate()

		runInAction(() => {
			this.targetCrypto!.value =
				this.sourceCrypto!.value * this.ratePerOneSourceCrypto
		})
	}

	async onValueChange(value: number, cryptoType: CryptoType) {
		if (
			!this.targetCrypto?.selectedCrypto ||
			!this.sourceCrypto?.selectedCrypto
		) {
			return
		}

		const isSource = cryptoType === 'sourceCrypto'

		runInAction(() => {
			if (isSource) {
				this.targetCrypto!.isLoading = true
			} else {
				this.sourceCrypto!.isLoading = true
			}
		})

		await this.calculateExchangeRate()

		runInAction(() => {
			if (isSource) {
				this.sourceCrypto!.value = value
				this.targetCrypto!.value = value * this.ratePerOneSourceCrypto
				this.targetCrypto!.isLoading = false
			} else {
				this.targetCrypto!.value = value
				this.sourceCrypto!.value = value / this.ratePerOneSourceCrypto
				this.sourceCrypto!.isLoading = false
			}
		})
	}

	async onCryptoSwap() {
		if (!this.sourceCrypto || !this.targetCrypto) {
			return
		}

		const sourceCrypto = this.sourceCrypto
		const targetCrypto = this.targetCrypto

		runInAction(() => {
			this.sourceCrypto = targetCrypto
			this.targetCrypto = sourceCrypto

			this.sourceCrypto.isLoading = true
			this.targetCrypto.isLoading = true
		})

		await this.calculateExchangeRate()

		runInAction(() => {
			this.sourceCrypto!.isLoading = false
			this.targetCrypto!.isLoading = false
		})
	}
}
