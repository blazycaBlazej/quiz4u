/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const nextConfig = {
	...withPWA({
		data: 'public',
		register: true,
		skipWaiting: true,
	}),
	experimental: {
		serverActions: true,
	},
}

module.exports = nextConfig
