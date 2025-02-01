import { ApiResponse } from 'types/ApiResponse'

import { apiClient } from './apiClient'

export class CryptoAPI {
	async getAvailableCryptos(): Promise<ApiResponse<Crypto>> {
		const response = await apiClient.get('/v1/cryptocurrency/map')

		return response.data.data
	}
}
