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

// export const getProductsByMultipleOptions = async (handle, brand) => {
//   const getFilteredProductsByMultipleOptions = gql`
//     query ProductVendor($handle: String!, $brand: String!) {
//       collection(handle: $handle) {
//         handle
//         products(first: 25, filters: { productVendor: $brand }) {
//           edges {
//             node {
//               id
//               title
//               handle
//               priceRange {
//                 minVariantPrice {
//                   amount
//                 }
//               }
//               images(first: 5) {
//                 edges {
//                   node {
//                     originalSrc
//                     altText
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   `

//   const variables = {
//     handle: handle,
//     brand: 'ADIDAS',
//   }

//   try {
//     const data = await graphQLClient.request(
//       getFilteredProductsByMultipleOptions,
//       variables
//     )
//     console.log(data)
//     return data
//   } catch (error) {
//     throw new Error(`Unable to filter product by handle ${error}`)
//   }
// }
export const getProductsByMultipleOptions = async (handle) => {
  const getFilteredProductsByMultipleOptions = gql`
    query MultipleVariantOptionsWithInStock($handle: String!, $brand: String!) {
      collection(handle: $handle) {
        id
        title
        handle
        products(first: 10, filters: { productVendor: $brand }) {
          edges {
            node {
              id
              title
              handle
              vendor
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

  const variables = { handle: handle, brand: 'ADIDAS' }

  try {
    console.log('hello')
    const data = await graphQLClient.request(
      getFilteredProductsByMultipleOptions,
      variables
    )
    console.log(data)
    return data
  } catch (error) {
    throw new Error(`Unable to filter product by handle ${error}`)
  }
}
