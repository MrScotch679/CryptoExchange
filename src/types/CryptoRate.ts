import { CryptoId } from './Crypto'
import { Platform } from './Platform'

export interface CryptoRateResponse {
	[key: CryptoId]: CryptoRate
}

export interface CryptoRate {
	id: number
	name: string
	symbol: string
	slug: string
	is_active: number
	is_fiat: number
	circulating_supply: number
	total_supply: number
	max_supply: number
	date_added: string
	num_market_pairs: number
	cmc_rank: number
	last_updated: string
	tags: string[]
	platform?: Platform
	self_reported_circulating_supply?: unknown
	self_reported_market_cap?: unknown
	quote: {
		USD: USD
	}
}

export interface USD {
	price: number
	volume_24h: number
	volume_change_24h: number
	percent_change_1h: number
	percent_change_24h: number
	percent_change_7d: number
	percent_change_30d: number
	market_cap: number
	market_cap_dominance: number
	fully_diluted_market_cap: number
	last_updated: string
}
