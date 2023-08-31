import { gql } from 'graphql-request'
import { graphQLClient } from '../helpers'

export async function getProducts() {
  const getAllProductsQuery = gql`
    {
      products(first: 150) {
        edges {
          node {
            id
            title
            handle
            vendor
            tags
            productType
            options {
              name
              values
            }
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
  `

  try {
    return await graphQLClient.request(getAllProductsQuery)
  } catch (error) {
    throw new Error(`Unable to fetch all products ${error}`)
  }
}

export const getSingleProduct = async (handle) => {
  const getSingleProductQuery = gql`
    query getSingleProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        handle
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        options {
          name
          values
        }
        variants(first: 15) {
          edges {
            node {
              id
              title
              price {
                amount
              }
              image {
                url
                altText
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `

  const variables = { handle: handle }

  try {
    const data = await graphQLClient.request(getSingleProductQuery, variables)
    return data
  } catch (error) {
    throw new Error(`Unable to fetch product by handle ${error}`)
  }
}

export const getVariantInventory = async (id) => {
  const getVariantQuantity = gql`
    query GetProductVariantQuantity($id: ID!) {
      product(id: $id) {
        variants(first: 15) {
          edges {
            node {
              id
              availableForSale
            }
          }
        }
      }
    }
  `

  const variables = { id: id }

  try {
    const response = await graphQLClient.request(getVariantQuantity, variables)
    return response
  } catch (error) {
    throw new Error(`Unable to fetch quantity ${error}`)
  }
}

export const getCollectionsList = async () => {
  const getCollectionQuery = gql`
    query getCategories {
      collections(first: 20) {
        edges {
          node {
            title
          }
        }
      }
    }
  `
  try {
    const response = await graphQLClient.request(getCollectionQuery)
    return response
  } catch (error) {
    throw new Error(`Unable to fetch collections ${error}`)
  }
}

export const getCategoriesList = async () => {
  const getCategoriesQuery = gql`
    {
      products(first: 150) {
        nodes {
          productType
        }
      }
    }
  `
  try {
    const response = await graphQLClient.request(getCategoriesQuery)
    return response
  } catch (error) {
    throw new Error(`Unable to fetch categories ${error}`)
  }
}
