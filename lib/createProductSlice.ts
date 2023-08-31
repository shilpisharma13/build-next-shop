import { StateCreator } from 'zustand'

export interface Variant {
  node: {
    id: string
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
      value: string
    }[]
  }
}

export interface Product {
  id: number
  title: string
  handle: string
  description: string
  vendor: string
  tags: string[]
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
  options: {
    name: string
    values: string[]
  }[]
  variants: {
    edges: Variant[]
  }
}
export interface ProductSlice {
  node: Product
}
;[]
