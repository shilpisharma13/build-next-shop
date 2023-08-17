'use client'

import { Fragment, useContext, useEffect, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline'
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useShopContext } from '../context/shopContext'
import MiniCart from '../components/MiniCart'
import { Product, Variant } from '@/lib/createProductSlice'
import { useCartStore } from '@/context/useCartStore'
import useStore from '@/context/useStore'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const miniCart = useStore(useCartStore, (state) => state.miniCart)
  
  const [toggleCart] = useCartStore((state) => [state.toggleCart])

  let totalQuantity = 0
  miniCart?.map((item) => {
    totalQuantity += item.variantQuantity
  })

  return (
    <header className='bg-white'>
      <nav
        className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <a href='#' className='-m-1.5 p-1.5'></a>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <Popover.Group className='hidden lg:flex lg:gap-x-12'>
          <a
            href='/products'
            className='text-sm font-semibold leading-6 text-gray-900'
          >
            Products
          </a>
          <a href='#' className='text-sm font-semibold leading-6 text-gray-900'>
            Features
          </a>
          <a href='#' className='text-sm font-semibold leading-6 text-gray-900'>
            Marketplace
          </a>
          <a href='#' className='text-sm font-semibold leading-6 text-gray-900'>
            Company
          </a>
        </Popover.Group>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          <div className='relative '>
            <span className='absolute -top-4 -right-0 bg-blue-500 rounded-full p-1 text-xs h-6 w-4'>
              {totalQuantity}
            </span>

            <ShoppingCartIcon
              onClick={() => toggleCart()}
              className='h-6 w-6 mr-2'
            />
            <MiniCart />
          </div>
          <a
            href='/login'
            className='text-sm font-semibold leading-6 text-gray-900'
          >
            Log in <span aria-hidden='true'>&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-10' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <a href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your Company</span>
            </a>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                <a
                  href='/products'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Products
                </a>
                <a
                  href='#'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Features
                </a>
                <a
                  href='#'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Marketplace
                </a>
                <a
                  href='#'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Company
                </a>
              </div>
              <div className='py-6'>
                <a
                  href='#'
                  className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

export default Header
