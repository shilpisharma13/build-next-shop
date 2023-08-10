/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    SHOPIFY_STOREFRONT_ACCESSTOKEN: process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN,
  },
  images: {
    domains: ['cdn.shopify.com', 'tailwindui.com'],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/products',
  //     },
  //     {
  //       source: '/cart/*',
  //       destination: '/cart',
  //     },
  //   ]
  // },
}

module.exports = nextConfig
