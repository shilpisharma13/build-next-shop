import { getProducts } from '@/utils/shopify/productQueries.js'
import { getFilteredProducts } from '@/utils/shopify/filterQueries'
import { create } from 'zustand'

interface ProductStore {
  products: []
  gridView: boolean
  filterOption: string
  setFilter: (value: string) => void
  // getAllProducts: () => void
  // filterProducts: (value: string) => void
  setGridView: () => void
  setListView: () => void
}
export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filterOption: '',
  setFilter: (value) => {
    set({ filterOption: value })
    
  },
  // getAllProducts: async () => {
  //   const response = await getProducts()
  //   set({ products: response.products.edges })
  // },
  // filterProducts: async (value) => {
  //   const response = await getFilteredProducts(value)
  //   set({ products: response.collection.products.edges })
  // },
  gridView: true,
  setGridView: () => {
    set({ gridView: true })
  },
  setListView: () => {
    set({ gridView: false })
  },
}))
