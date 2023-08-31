'use client'

import ProductsPage from './ProductsPage'

import { useProductStore } from '@/context/useProductStore'

import useStore from '@/context/useStore'
import { useEffect } from 'react'

interface Props {
  products: []
}

const AllProducts = ({ products }: Props) => {
  const [filteredProducts, loadProducts, filters, filterProducts] =
    useProductStore((state) => [
      state.filteredProducts,
      state.loadProducts,
      state.filters,
      state.filterProducts,
    ])

  const filter = useStore(useProductStore, (state) => state.filter)

  useEffect(() => {
    loadProducts()
  }, [filter])

  useEffect(() => {
    filterProducts()
  }, [filters])
  return <ProductsPage products={filteredProducts} />
  // if (filter === false) return <ProductsPage products={products} />
  // if (filter === true) return <ProductsPage products={filteredProducts} />
}
export default AllProducts
