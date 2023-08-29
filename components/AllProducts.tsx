'use client'

import { getProducts } from '@/utils/shopify/productQueries.js'
import ProductsPage from './ProductsPage'
import { useQuery } from '@tanstack/react-query'
import { useProductStore } from '@/context/useProductStore'
import { useEffect } from 'react'
import useStore from '@/context/useStore'

interface Props {
  products: []
}

const AllProducts = ({ products }: Props) => {
  const filteredProducts = useProductStore((state) => state.filteredProducts)

  const filter = useStore(useProductStore, (state) => state.filter)

  if (filter === false) return <ProductsPage products={products} />
  if (filter === true) return <ProductsPage products={filteredProducts} />
}
export default AllProducts
