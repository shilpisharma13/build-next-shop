import { getProducts } from '@/utils/shopify/productQueries.js'
import {
  getFilteredProducts,
  getProductsByMultipleOptions,
} from '@/utils/shopify/filterQueries'
import { create } from 'zustand'
import { Product } from '@/lib/createProductSlice'
import { persist } from 'zustand/middleware'

interface ProductStore {
  filteredProducts: Product[]
  gridView: boolean
  filter: boolean
  filters: {
    handle?: string
    category?: string
    brand?: string
    variant?: {
      type?: string
      value?: string
    }
  }
  filterProducts: (
    handle: string,
    category?: string,
    brand?: string,
    type?: string,
    value?: string
  ) => void
  clearFilters: () => void
  setGridView: () => void
  setListView: () => void
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      filteredProducts: [],
      filter: false,
      filters: {
        handle: '',
        category: '',
        brand: '',
        variant: {
          type: '',
          value: '',
        },
      },
      filterProducts: async (handle, category, brand, type, value) => {
        console.log(get().filters)
        // const response = await getFilteredProducts(value)
        const response = await getProductsByMultipleOptions(
          handle,
          category,
          brand,
          type,
          value
        )

        let tempFilters = get().filters
        set({
          filter: true,
          filteredProducts: response?.collection.products.edges,
          filters: {
            ...tempFilters,
            handle: handle,
            category: category,
            brand: brand,
            variant: { type: type, value: value },
          },
        })
        console.log(get().filters)
      },
      clearFilters: () => {
        set({
          filter: false,
          filters: {
            handle: '',
            category: '',
            brand: '',
            variant: {
              type: '',
              value: '',
            },
          },
        })
      },
      gridView: true,
      setGridView: () => {
        set({ gridView: true })
      },
      setListView: () => {
        set({ gridView: false })
      },
    }),
    {
      name: 'cart_shopify',
    }
  )
)
