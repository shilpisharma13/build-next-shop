'use client'

import { Fragment, useContext, useState, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useShopContext } from '../context/shopContext'
import Image from 'next/image'
import Link from 'next/link'
import { formatter } from '../utils/helpers'
import { useStore } from '@/context/store'

export default function MiniCart() {
  const cancelButtonRef = useRef()
  const { cartOpen, setCartOpen, cartLoading, checkoutUrl, cartId } =
    useShopContext()

  const { cart } = useStore((state) => ({ cart: state.cart }))
  console.log(cart)
  let cartTotal = 0
  cart.map((item) => (cartTotal += item?.variantPrice * item?.variantQuantity))

  return (
    <Transition.Root show={cartOpen} as={Fragment}>
      <Dialog
        initialFocus={cancelButtonRef}
        as='div'
        className='relative z-10'
        onClose={() => setCartOpen(!cartOpen)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                    <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-lg font-medium text-gray-900'>
                          Shopping cart
                        </Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            ref={cancelButtonRef}
                            type='button'
                            className='-m-2 p-2 text-gray-400 hover:text-gray-500'
                            onClick={() => setCartOpen(false)}
                          >
                            <span className='sr-only'>Close panel</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>

                      <div className='mt-8'>
                        <div className='flow-root'>
                          {cart.length > 0 ? (
                            <ul
                              role='list'
                              className='-my-6 divide-y divide-gray-200'
                            >
                              {cart.map((product) => (
                                <li
                                  key={product.id + Math.random()}
                                  className='relative flex py-6'
                                >
                                  <div
                                    className={`top-0 left-0 right-0 z-50 w-full h-full absolute ${
                                      cartLoading
                                        ? 'bg-white opacity-60'
                                        : 'hidden'
                                    }`}
                                  ></div>
                                  <div className='relative flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md'>
                                    <Image
                                      src={product.image}
                                      alt={product.title}
                                      layout='fill'
                                      objectFit='cover'
                                    />
                                  </div>

                                  <div className='flex flex-col flex-1 ml-4'>
                                    <div>
                                      <div className='flex justify-between text-base font-medium text-gray-900'>
                                        <h3>
                                          <Link
                                            href={`/products/${product.handle}`}
                                            passHref
                                          >
                                            <p
                                              onClick={() => setCartOpen(false)}
                                            >
                                              {product.title}
                                            </p>
                                          </Link>
                                        </h3>
                                        <p className='ml-4'>
                                          {formatter.format(
                                            product.variantPrice
                                          )}
                                        </p>
                                      </div>
                                      <p className='mt-1 text-sm text-gray-500'>
                                        {product.variantTitle}
                                      </p>
                                    </div>
                                    <div className='flex items-end justify-between flex-1 text-sm'>
                                      {/* <p className="text-gray-500">Qty {product.variantQuantity}</p> */}
                                      <div className={`border`}>
                                        <button
                                          className='px-2'
                                          onClick={() =>
                                            decrementCartItem(product)
                                          }
                                          disabled={cartLoading}
                                        >
                                          -
                                        </button>
                                        <span className='px-2 border-l border-r'>
                                          {product.variantQuantity}
                                        </span>
                                        <button
                                          className='px-2'
                                          onClick={() =>
                                            incrementCartItem(product)
                                          }
                                          disabled={cartLoading}
                                        >
                                          +
                                        </button>
                                      </div>
                                      <div className='flex'>
                                        <button
                                          onClick={() =>
                                            removeCartItem(product.id)
                                          }
                                          type='button'
                                          className='font-medium text-gray-500 hover:text-gray-800'
                                          disabled={cartLoading}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div>
                              <p>Nothing in your cart!</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {cart.length > 0 ? (
                      <div className='px-4 py-6 border-t border-gray-200 sm:px-6'>
                        <div className='flex justify-between text-base font-medium text-gray-900'>
                          <p>Subtotal</p>
                          <p>{formatter.format(cartTotal)}</p>
                        </div>
                        <p className='mt-0.5 text-sm text-gray-500'>
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div
                          className='mt-6'
                          onClick={() => setCartOpen(false)}
                        >
                          <Link
                            href={`/cart`}
                            className={`flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-800 ${
                              cartLoading
                                ? 'cursor-not-allowed'
                                : 'cursor-pointer'
                            }`}
                          >
                            View Cart
                          </Link>
                        </div>
                        <div className='flex justify-center mt-6 text-sm text-center text-gray-500'>
                          <p>
                            <button
                              onClick={() => clearCart()}
                              className='font-medium hover:text-gray-800'
                            >
                              Clear Cart
                            </button>{' '}
                            or{' '}
                            <button
                              type='button'
                              className='font-medium hover:text-gray-800'
                              onClick={() => setCartOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden='true'> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
