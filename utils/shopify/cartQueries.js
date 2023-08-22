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
          createdAt
          updatedAt
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
              }
            }
          }
          attributes {
            key
            value
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
            totalDutyAmount {
              amount
              currencyCode
            }
          }
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
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 30) {
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
                    width
                    height
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
    cartId: cartId,
  }

  try {
    const response = await graphQLClient.request(getCartQuery, variables)
    console.log(response)
    return response
  } catch (error) {
    console.log(`Unable to fetch cart ${error}`)
  }
}

export const addLineToCart = async (cartId, addedItem) => {
  const addCartLinesQuery = gql`
    mutation addCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
            totalDutyAmount {
              amount
              currencyCode
            }
          }
        }

        userErrors {
          field
          message
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

export const removeItemLines = async (cartId, id) => {
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
    lineIds: [id],
  }

  try {
    const response = await graphQLClient.request(removeItemMutation, variables)
    console.log(response)
    return response
  } catch (error) {
    throw new Error(`Unable to remove products from cart: ${error}`)
  }
}

export const updateCartItem = async (cartId, cartLine, quantity) => {
  const cartLineUpdate = gql`
    mutation updateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
            totalDutyAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `
  const variables = {
    cartId,
    lines: {
      id: cartLine,
      quantity: quantity,
    },
  }

  try {
    const response = await graphQLClient.request(cartLineUpdate, variables)
    console.log(response)
    return response
  } catch (error) {
    throw new Error(`Unable to update the quatity of the product : ${error}`)
  }
}
