import { gql } from 'graphql-request'
import { graphQLClient } from '@/utils/shopify'
import TempCartPage from '@/components/TempCartPage'

const getCartQuery = gql`
  query getCart($id: ID!) {
    cart(id: $id) {
      id
      lines(first: 50) {
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
      estimatedCost {
        totalAmount {
          amount
          currencyCode
        }
      }
      checkoutUrl
    }
  }
`
const removeItemMutation = gql`
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
      }
    }
  }
`
const Cart = async ({ params: { id } }) => {
  const variables = { id: decodeURIComponent(id) }
  const data = await graphQLClient.request(getCartQuery, variables)
  console.log(data)
  // const handleRemoveItem = async (cartId, lineId) => {
  //   const variables = {
  //     cartId,
  //     lineIds: [lineId],
  //   }
  //   await graphQLClient.request(removeItemMutation, variables)
  // }
  return (
    <>
      <h1 className='text-xl'>{data.cart.id}</h1>
      <TempCartPage data={data} />
    </>
  )
}

export default Cart
