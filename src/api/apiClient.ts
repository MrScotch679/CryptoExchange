import axios from 'axios'

const PROXY_URL = import.meta.env.VITE_PROXY_URL
const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const apiClient = axios.create({
	baseURL: `${PROXY_URL}/?${API_URL}`,
	headers: {
		'X-CMC_PRO_API_KEY': API_KEY,
		'Content-Type': 'application/json'
	},
	timeout: 10000
})
