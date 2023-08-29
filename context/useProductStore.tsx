import { getProducts } from '@/utils/shopify/productQueries.js'
import { getFilteredProducts } from '@/utils/shopify/filterQueries'
import { create } from 'zustand'
import { Product } from '@/lib/createProductSlice'
import { persist } from 'zustand/middleware'

interface ProductStore {
  allProducts: []
  filteredProducts: Product[]
  gridView: boolean
  filter: boolean
  // loadProducts: () => void
  filterProducts: (value: string) => void
  clearFilters: () => void
  setGridView: () => void
  setListView: () => void
}
export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      allProducts: [],
      filteredProducts: [],
      filter: false,
      // loadProducts: async () => {
      //   const response = await getProducts()
      //   set({
      //     filteredProducts: response?.products.edges,
      //     allProducts: response?.products.edges,
      //   })
      // },
      filterProducts: async (value) => {
        const response = await getFilteredProducts(value)
        set({
          filter: true,
          filteredProducts: response?.collection.products.edges,
        })
      },
      clearFilters: () => {
        // const prods = get().allProducts
        set({
          filter: false,
          // filteredProducts: prods,
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
