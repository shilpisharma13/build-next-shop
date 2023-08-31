import axios from 'axios'
import { GraphQLClient } from 'graphql-request'

const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

const endpoint = `https://${domain}/api/2023-04/graphql.json`


export const graphQLClient = new GraphQLClient(endpoint, {
  method: 'POST',
  headers: {
    'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    Accept: 'application/json',
    'content-Type': 'application/json',
  },
})

export const formatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  minimumFractionDigits: 2,
})
