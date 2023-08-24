'use client'

import { useQuery } from '@tanstack/react-query'
import ProductCard from './ProductCard'
import { Product, ProductSlice } from '@/lib/createProductSlice'
import { getProducts } from '@/utils/shopify/productQueries.js'
import { useEffect } from 'react'
import { useCartStore } from '@/context/useCartStore'
import GridView from './GridView'
import ListView from './ListView'
import { useProductStore } from '@/context/useProductStore'

interface Props {
  products: []
}

const Products = ({ products }: Props) => {
  const gridView = useProductStore((state) => state.gridView)
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await getProducts()
      return response.products.edges
    },
    initialData: products,
  })

  if (gridView === true) {
    return <GridView products={products} />
  }
  return <ListView products={products} />
}
export default Products
