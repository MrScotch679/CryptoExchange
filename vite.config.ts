import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@api': path.resolve(__dirname, 'src/api'),
			'@styles': path.resolve(__dirname, 'src/styles'),
			'@types': path.resolve(__dirname, 'src/types'),
			'@store': path.resolve(__dirname, 'src/store'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@utils': path.resolve(__dirname, 'src/utils')
		}
	}
})
