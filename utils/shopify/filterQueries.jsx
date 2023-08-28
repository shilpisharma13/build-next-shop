import { gql } from 'graphql-request'
import { graphQLClient } from '../helpers'

export const getFilteredProducts = async (type) => {
  const filterByType = gql`
    query getProductsOfProductTypeInCollection($handle: String!) {
      collection(handle: $handle) {
        handle
        products(first: 25) {
          edges {
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              images(first: 5) {
                edges {
                  node {
                    originalSrc
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const variables = { handle: type }

  try {
    const data = await graphQLClient.request(filterByType, variables)
    console.log(data)
    return data
  } catch (error) {
    throw new Error(`Unable to filter product by handle ${error}`)
  }
}
