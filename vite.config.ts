import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	resolve: {
		alias: {
			'@api': path.resolve(__dirname, 'src/api'),
			'@styles': path.resolve(__dirname, 'src/styles'),
			'@types': path.resolve(__dirname, 'src/types'),
			'@components': path.resolve(__dirname, 'src/components')
		}
	},
	plugins: [react()]
})
