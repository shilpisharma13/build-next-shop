import { getProducts } from '@/utils/shopify/productQueries.js'
import {
  getFilteredProducts,
  getProductsByMultipleOptions,
} from '@/utils/shopify/filterQueries'
import { create } from 'zustand'
import { Product, ProductSlice } from '@/lib/createProductSlice'
import { persist } from 'zustand/middleware'
import { ChangeEvent, MouseEventHandler } from 'react'

interface ProductStore {
  allProducts: ProductSlice[]
  filteredProducts: ProductSlice[]
  gridView: boolean
  filter: boolean
  filters: {
    text: string
    type: string
    category: string[]
    brand: string[]
    size: string[]
    color: string[]
  }
  loadProducts: () => void
  updateFilters: (e: ChangeEvent) => void
  filterProducts: () => void
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
      filters: {
        text: '',
        type: '',
        category: [],
        brand: [],
        size: [],
        color: [],
      },
      loadProducts: async () => {
        const response = await getProducts()
        set({
          allProducts: response.products.edges,
          filteredProducts: response.products.edges,
        })
      },
      updateFilters: (e) => {
        const filters = get().filters
        let tempFilters = get().filters
        let name = e.target?.name
        let value = e.target?.value
        let checked = e.target.checked
        console.log(name, value, checked)
        if (name === 'type') {
          value = e.target.textContent
          set({
            filters: {
              ...tempFilters,
              [name]: value,
            },
          })
        } else {
          if (checked === true) {
            set({
              filters: {
                ...tempFilters,
                [name]: [...filters[name], value],
              },
            })
          }
          if (checked === false) {
            tempFilters[name] = tempFilters[name].filter((b) => b !== value)
            set({
              filters: {
                ...tempFilters,
              },
            })
          }
        }
      },
      filterProducts: () => {
        const allProducts = get().allProducts
        const filters = get().filters

        let tempProducts = [...allProducts]
        if (filters.text) {
          tempProducts = tempProducts.filter((p) =>
            p.node.title.toLowerCase().includes(filters.text)
          )
        }
        if (filters.type) {
          tempProducts = tempProducts.filter((p) => {
            const tag = p.node.tags.includes(filters.type.toLowerCase())
            return tag
          })
        }

        if (filters.brand[0]) {
          let arr
          arr = filters.brand.map((b) => {
            arr = tempProducts.filter((p) => p.node.vendor === b)
            return arr
          })
          tempProducts = arr.flat()
        }
        if (filters.category[0]) {
          let arr
          arr = filters.brand.map((b) => {
            arr = tempProducts.filter((p) => p.node.vendor === b)
            return arr
          })
          tempProducts = arr.flat()
        }
        // if (filters.size[0]) {
        //   let arr
        //   arr = filters.brand.map((b) => {
        //     arr = tempProducts.filter((p) => p.node.vendor === b)
        //     return arr
        //   })
        //   tempProducts = arr.flat()
        // }
        // if (filters.size[0]) {
        //   let arr
        //   arr = filters.brand.map((b) => {
        //     arr = tempProducts.filter((p) => p.node.vendor === b)
        //     return arr
        //   })
        //   tempProducts = arr.flat()
        // }
        console.log(tempProducts)
        set({
          filteredProducts: [...tempProducts],
        })
        console.log(get().filters)
      },
      clearFilters: () => {
        set({
          filter: false,
          filters: {
            text: '',
            type: '',
            category: [],
            brand: [],
            size: [],
            color: [],
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
