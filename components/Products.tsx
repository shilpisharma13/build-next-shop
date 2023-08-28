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
import { getFilteredProducts } from '@/utils/shopify/filterQueries'

interface Props {
  products: []
}

const Products = () => {
  const [gridView, filterOption] = useProductStore((state) => [
    state.gridView,
    state.filterOption,
  ])
  const { data } = useQuery({
    queryKey: !filterOption ? ['products'] : ['products', filterOption],
    queryFn: async ({ queryKey }) => {
      if (queryKey[1] === '') {
        const response = await getProducts()
        return response.products.edges
      } else {
        const response = await getFilteredProducts(queryKey[1])
        return response.collection.products.edges
      }
    },
  })

  if (gridView === true) {
    return <GridView products={data} />
  }
  return <ListView products={data} />
}
export default Products
