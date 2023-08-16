import { gql, GraphQLClient } from 'graphql-request'
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

export const createCart = async (itemId, quantity) => {
  const createCartMutation = gql`
    mutation createCart($cartInput: CartInput) {
      cartCreate(input: $cartInput) {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `
  const variables = {
    cartInput: {
      lines: [
        {
          quantity: parseInt(quantity),
          merchandiseId: itemId,
        },
      ],
    },
  }

  try {
    const response = await graphQLClient.request(createCartMutation, variables)

    return response
  } catch (error) {
    throw new Error(`Unable to create cart: ${error}`)
  }
}

export const getCart = async (cartId) => {
  const getCartQuery = gql`
    query getCart($cartId: ID!) {
      cart(id: $cartID) {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                  selectedOptions {
                    name
                    value
                  }
                  product {
                    id
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const variables = {
    cartId,
  }
  try {
    const response = await graphQLClient.request(getCartQuery, variables)
    return response
  } catch (error) {
    console.log(`Unable to fetch cart ${error}`)
  }
}


export const addLineToCart = async (cartId, addedItem) => {
  const addCartLinesQuery = gql`
    mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `

  const variables = {
    cartId,
    lines: {
      quantity: parseInt(addedItem.variantQuantity),
      merchandiseId: addedItem.id,
    },
  }

  try {
    const response = await graphQLClient.request(addCartLinesQuery, variables)
    console.log(response)
    return response
  } catch (error) {
    throw new Error(`Unable to add products to cart: ${error}`)
  }
}

export const removeItemLines = async (cartId) => {
const removeItemMutation = gql`
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
      }
    }
  }
`

const variables = {
  cartId,
  lineIds: [cartId],
}

try {
  const response = await graphQLClient.request(removeItemMutation, variables)
  console.log(response)
  return response
} catch (error) {
  throw new Error(`Unable to remove products from cart: ${error}`)
}
 }
