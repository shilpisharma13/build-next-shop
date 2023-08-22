'use client'

import Image from 'next/image'
import { TrashIcon } from '@heroicons/react/24/outline'
import { getCart } from '@/utils/shopify/cartQueries'
import Link from 'next/link'
import { useCartStore } from '@/context/useCartStore'
import useStore from '@/context/useStore'
import { useQuery } from '@tanstack/react-query'
import CartAmountButtons from './CartAmountButtons'

export const CartPage = ({ cartId }) => {
  const miniCart = useStore(useCartStore, (state) => state.miniCart)
  const deleteCartItem = useCartStore((state) => state.deleteCartItem)

  const { data } = useQuery({
    queryKey: ['cart', cartId, miniCart?.length],
    queryFn: async ({ queryKey }) => await getCart(queryKey[1]),
    refetchOnWindowFocus: true,
  })

   let cartTotal = 0
  let totalQuantity = 0
  data?.cart?.lines.edges.map((item) => {
    cartTotal +=
      parseInt(item?.node.merchandise.priceV2?.amount) * item?.node.quantity
    totalQuantity += item.node.quantity
  })

  return (
    <div className='bg-white flex px-4 flex-grow justify-between mt-10'>
      <div className='mx-2 px-5 py-5 basis-3/4'>
        <div className='flex justify-between border-b pb-2'>
          <h1 className='font-semibold text-2xl'>Your Cart</h1>
          <h2 className='text-gray-600 text-m'>
            {totalQuantity} items in cart
          </h2>
        </div>
        {data?.cart?.lines.edges.length > 0
          ? data?.cart.lines.edges.map((product) => {
              const { id, merchandise } = product.node
              let { quantity } = product.node

              return (
                <div
                  key={id}
                  className='flex justify-between hover:bg-gray-100  px-3 py-5'
                >
                  <div className='flex basis-3/5'>
                    <div className='flex'>
                      <div className='relative flex-shrink-0 w-24 h-20 overflow-hidden border border-gray-200 rounded-md'>
                        <Image
                          src={merchandise.image?.url}
                          alt={merchandise.product?.title}
                          height={merchandise.image?.height}
                          width={merchandise.image?.width}
                        />
                      </div>
                      <div className='flex flex-col  ml-4'>
                        <Link
                          className='font-bold text-sm'
                          href={`/products/${merchandise.product.handle}`}
                        >
                          {merchandise.product.title}
                        </Link>
                        <span className='text-gray-500 text-m'>
                          {merchandise.title}
                        </span>
                      </div>
                    </div>
                  </div>
                  <CartAmountButtons product={product} cartId={cartId} />
                  <div>{merchandise.priceV2.amount}</div>
                  <div>
                    <button
                      onClick={() => {
                        deleteCartItem(cartId, id, merchandise.id)
                    
                      }}
                    >
                      <TrashIcon className='ml-3 w-5' />
                    </button>
                  </div>
                </div>
              )
            })
          : 'cart is empty'}
      </div>

      <div
        id='summary'
        className='mx-3 px-8 py-8 border rounded-lg bg-gray-600'
      >
        <h1 className='font-semibold text-2xl text-white'>Order Summary</h1>
        <div className='flex justify-between mt-10 mb-2 text-white'>
          <span className='font-semibold text-sm uppercase'>Total</span>
          <span className='font-semibold text-sm'>${cartTotal}</span>
        </div>
        <div className='flex justify-between mt-5 mb-2 text-white'>
          <span className='font-semibold text-sm uppercase'>Shipping</span>
          <span className='font-semibold text-sm'>$0</span>
        </div>

        <div className='border-t mt-4'>
          <div className='flex font-semibold justify-between py-6 text-sm uppercase text-white'>
            <span>Total cost</span>
            <span>${cartTotal}</span>
          </div>
          <div className='grid grid-row2-2'>
            <button className=' items-center justify-center px-6 py-3 text-base font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-800 mb-2'>
              Checkout
            </button>
            <a
              className=' items-center justify-center px-6 py-3 text-base font-medium text-black bg-white border  rounded-md shadow-sm '
              href='/products'
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
