import { ApiResponse } from 'types/ApiResponse'
import { Crypto, CryptoId } from 'types/Crypto'
import { CryptoRateResponse } from 'types/CryptoRate'

import { apiClient } from './apiClient'

export class CryptoAPI {
	async getAvailableCryptos(): Promise<ApiResponse<Crypto[]>> {
		const response = await apiClient.get(
			'/v1/cryptocurrency/map?start=1&limit=100'
		)

		return response.data
	}

	async getCryptoExchangeRate(
		sourceId: CryptoId,
		targetId: CryptoId
	): Promise<ApiResponse<CryptoRateResponse>> {
		const response = await apiClient.get(
			`/v2/cryptocurrency/quotes/latest?id=${sourceId},${targetId}`
		)

		return response.data
	}
}
