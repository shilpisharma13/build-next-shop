'use client'

import { useQuery } from '@tanstack/react-query'
import ProductCard from './ProductCard'
import { Product, ProductSlice } from '@/lib/createProductSlice'
import { getProducts } from '@/utils/shopify'

interface Props {
  products: []
}

const Products = ({ products }: Props) => {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await getProducts()
      return response.products.edges
    },
    initialData: products,
  })
  return (
    <div className='grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {data.map((product: ProductSlice) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </div>
  )
}
export default Products
