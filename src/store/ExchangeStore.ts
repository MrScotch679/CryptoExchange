import { makeObservable } from 'mobx'

import { CryptoAPI } from 'api/CryptoAPI'

export class ExchangeStore {
	cryptoAPI: CryptoAPI

	constructor() {
		makeObservable(this, undefined, { autoBind: true })
		this.cryptoAPI = new CryptoAPI()
	}
}
