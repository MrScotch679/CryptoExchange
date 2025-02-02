import { makeAutoObservable } from 'mobx'

import { Crypto } from 'types/Crypto'

export class ExchangeInputStore {
	selectedCrypto: Crypto
	isLoading: boolean = false
	value: number = 0

	constructor(initialValue: Crypto) {
		makeAutoObservable(this, undefined, { autoBind: true })

		this.selectedCrypto = initialValue
	}
}
