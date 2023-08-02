'use client'
import Image from 'next/image'
import ProductForm from './ProductForm'
import { getVariantInventory } from '@/utils/shopify'
import useSWR from 'swr'
import { Product } from '@/lib/createProductSlice'
import { useQuery } from '@tanstack/react-query'

interface Props {
  product: Product
}
const SingleProduct = ({ product }: Props) => {
  const { data: productInventory } = useQuery({
    queryKey: ['products', 'product', product.id],
    queryFn: async ({ queryKey }) => await getVariantInventory(queryKey[2]),
  })

  const { title, images, description, priceRange } = product

  return (
    <div className='bg-white'>
      <div className='pt-6'>
        {/* Image gallery */}
        <div className='grid grid-cols-2'>
          <div>
            <Image
              src={images.edges[0].node.url || ''}
              alt={images.edges[0].node.altText || ''}
              width={500}
              height={200}
              sizes=''
            />
            <div className='grid grid-cols-5 gap-1'>
              {images.edges.map((image, index) => {
                return (
                  <Image
                    key={index}
                    src={image.node.url || ''}
                    alt={image.node.altText || ''}
                    width={50}
                    height={20}
                  />
                )
              })}
            </div>
          </div>
          {/* Product info */}
          <div className='mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6  lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16'>
            <div className='lg:col-span-2  lg:pr-8'>
              <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
                {title}
              </h1>
            </div>

            {/* Options */}
            <div className='mt-4 lg:row-span-3 lg:mt-0'>
              <h2 className='sr-only'>Product information</h2>
              <p className='text-3xl tracking-tight text-gray-900'>
                {`${priceRange.minVariantPrice.currencyCode} $${priceRange.minVariantPrice.amount}`}
              </p>
              <div className='mt-6'>
                <ProductForm
                  product={product}
                  productInventory={productInventory}
                />
              </div>
              <div className='py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6'>
                {/* Description and details */}
                <div>
                  <h3 className='sr-only'>Description</h3>
                  <div className='space-y-6'>
                    <p className='text-base text-gray-900'>{description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
