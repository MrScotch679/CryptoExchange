export interface ApiResponse<T> {
	data: T
	status: ApiStatus
}

export interface ApiStatus {
	timestamp: string
	error_code: number
	error_message: string
	elapsed: number
	credit_count: number
	notice: string
}
