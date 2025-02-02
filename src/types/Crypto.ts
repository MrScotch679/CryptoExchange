import { Platform } from './Platform'

export interface Crypto {
	id: number
	rank: number
	name: string
	symbol: string
	slug: string
	is_active: number
	first_historical_data: string
	last_historical_data: string
	platform?: Platform
}

export type CryptoId = Crypto['id']

export type CryptoType = 'sourceCrypto' | 'targetCrypto'
