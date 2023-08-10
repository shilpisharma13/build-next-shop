'use client'
import { formatter } from '../utils/helpers'
import { useShopContext } from '@/context/shopContext'
import Image from 'next/image'
import { TrashIcon, UsersIcon } from '@heroicons/react/24/outline'
import { getCart } from '@/utils/shopify'
import Link from 'next/link'
import { useCartStore } from '@/context/useCartStore'
import useStore from '@/context/useStore'

export const CartPage = () => {
  const cart = useStore(useCartStore, (state) => state.cart)

  const [deleteCartItem, updateItemQuantity] = useCartStore((state) => [
    state.deleteCartItem,
    state.updateItemQuantity,
  ])

  let cartTotal = 0
  let totalQuantity = 0
  cart?.map(
    (item) =>
      (cartTotal += parseInt(item?.variantPrice) * item?.variantQuantity)
  )
  cart?.map((item) => (totalQuantity += item.variantQuantity))

  return (
    <div className='bg-white flex px-4 flex-grow justify-between mt-10'>
      <div className='mx-2 px-5 py-5 basis-3/4'>
        <div className='flex justify-between border-b pb-2'>
          <h1 className='font-semibold text-2xl'>Your Cart</h1>
          <h2 className='text-gray-600 text-m'>
            {totalQuantity} items in cart
          </h2>
        </div>
        {cart?.length > 0
          ? cart?.map((product) => {
              return (
                <div
                  key={product.id}
                  className='flex justify-between hover:bg-gray-100  px-3 py-5'
                >
                  <div className='flex basis-3/5'>
                    <div className='flex'>
                      <div className='relative flex-shrink-0 w-24 h-20 overflow-hidden border border-gray-200 rounded-md'>
                        <Image
                          src={product.image}
                          alt={product.title}
                          layout='fill'
                          objectFit='cover'
                        />
                      </div>
                      <div className='flex flex-col  ml-4'>
                        <Link
                          className='font-bold text-sm'
                          href={`/products/${product.handle}`}
                        >
                          {product.title}
                        </Link>
                        <span className='text-gray-500 text-m'>
                          {product.variantTitle}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-3'>
                    <div>
                      <button
                        className='px-2'
                        onClick={() =>
                          updateItemQuantity(product.id, 'decrease')
                        }
                        // disabled={cartLoading}
                      >
                        -
                      </button>
                    </div>
                    <div>
                      <span className='px-2 border border-gray-200'>
                        {product.variantQuantity}
                      </span>
                    </div>
                    <div>
                      <button
                        className='px-2'
                        onClick={() =>
                          updateItemQuantity(product.id, 'increase')
                        }
                        // disabled={cartLoading}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>{product.variantPrice}</div>
                  <div>
                    <button onClick={() => deleteCartItem(product.id)}>
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
