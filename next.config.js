const { withPlausibleProxy } = require('next-plausible')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withPlausibleProxy()(nextConfig)
