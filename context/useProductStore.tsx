import { create } from 'zustand'

interface ProductStore {
  products: []
  gridView: boolean
  setGridView: () => void
  setListView: () => void
}
export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  gridView: true,
  setGridView: () => {
    set({ gridView: true })
  },
  setListView: () => {
    set({ gridView: false })
  },
}))
