import { useQuery } from '@tanstack/react-query'
import ProductCard from './ProductCard'
import { Product, ProductSlice } from '@/lib/createProductSlice'
import { getProducts } from '@/utils/shopify/productQueries.js'
import { useEffect, useState } from 'react'
import { useCartStore } from '@/context/useCartStore'
import GridView from './GridView'
import ListView from './ListView'
import { useProductStore } from '@/context/useProductStore'
import { getFilteredProducts } from '@/utils/shopify/filterQueries'

const ProductsPage = ({ products }) => {
  const gridView = useProductStore((state) => state.gridView)

  if (gridView === true) {
    return <GridView products={products} />
  }
  return <ListView products={products} />
}
export default ProductsPage
