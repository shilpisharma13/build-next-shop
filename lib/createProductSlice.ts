import { StateCreator } from 'zustand'

export interface Variant {
  edges: {
    node: {
      id: number
      title: string
      price: {
        amount: string
      }
      image: {
        url: string
        altText: string
      }
      selectedOptions: {
        name: string
        values: string
      }[]
    }
  }[]
}

export interface Product {
  id: number
  title: string
  handle: string
  description: string
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode?: string
    }
  }
  images: {
    edges: {
      node: {
        originalSrc?: string | null
        url?: string
        altText?: string | null
      }
    }[]
  }
  options?: {
    name: string
    values: string[]
  }[]
  variants?: Variant
}

export interface ProductSlice {
  node: Product
}
;[]
