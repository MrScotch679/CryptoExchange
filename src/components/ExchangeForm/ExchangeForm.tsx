import { ExchangeStore } from '@store/ExchangeStore'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import { CryptoAPI } from '@api/CryptoAPI'

import { debounce } from '@utils/debounce'

import { ExchangeInput } from '@components/ExchangeInput'
import { InfoPanel } from '@components/InfoPanel'

import styles from './ExchangeForm.module.scss'

const exchangeStore = new ExchangeStore(new CryptoAPI())

export const ExchangeForm = observer(() => {
	useEffect(() => {
		exchangeStore.init()
	}, [])

	const debauncedOnValueChange = debounce(exchangeStore.onValueChange, 500)

	return (
		<div className={styles.exchangeFormWrapper}>
			<ExchangeInput
				cryptoType='sourceCrypto'
				skeletonLoading={exchangeStore.isLoading}
				inputLoading={exchangeStore?.sourceCrypto?.isLoading}
				inputValue={exchangeStore?.sourceCrypto?.value}
				selectedCoin={exchangeStore?.sourceCrypto?.selectedCrypto}
				selectOptions={exchangeStore?.availableCryptos}
				onSelectCrypto={exchangeStore.onSelectCrypto}
				onInputValueChange={debauncedOnValueChange}
			/>

			<InfoPanel
				skeletonLoading={exchangeStore.isLoading}
				ratePerOneSourceCrypto={exchangeStore.ratePerOneSourceCrypto}
				sourceSymbol={exchangeStore?.sourceCrypto?.selectedCrypto?.symbol}
				targetSymbol={exchangeStore?.targetCrypto?.selectedCrypto?.symbol}
				onCryptoSwap={exchangeStore.onCryptoSwap}
			/>

			<ExchangeInput
				cryptoType='targetCrypto'
				skeletonLoading={exchangeStore.isLoading}
				inputLoading={exchangeStore?.targetCrypto?.isLoading}
				inputValue={exchangeStore?.targetCrypto?.value}
				selectedCoin={exchangeStore?.targetCrypto?.selectedCrypto}
				selectOptions={exchangeStore?.availableCryptos}
				onSelectCrypto={exchangeStore.onSelectCrypto}
				onInputValueChange={debauncedOnValueChange}
			/>
		</div>
	)
})
