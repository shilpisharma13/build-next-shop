'use client'

import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { subCategories, Tfilters, filterHandles } from '../utils/filter'
import { useProductStore } from '@/context/useProductStore'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/utils/shopify/productQueries.js'
import useStore from '@/context/useStore'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
const SidebarFilter = () => {
  const clearFilters = useProductStore((state) => state.clearFilters)

  const filters = useProductStore((state) => state.filters)
  const updateFilters = useProductStore((state) => state.updateFilters)
  return (
    <form className='hidden lg:block' onSubmit={(e) => e.preventDefault()}>
      <input
        type='text'
        name='text'
        placeholder='search'
        value={filters.text}
        onChange={updateFilters}
      />

      <ul
        role='list'
        className='space-y-4 border-b border-gray-200 pb-6 text-sm font-medium'
      >
        {filterHandles.map((fHandle) => (
          <li key={fHandle.name}>
            <button
              type='button'
              name='type'
              onClick={updateFilters}
              className='text-gray-700 hover:text-gray-200 active:text-gray-900 active:text-lg'
            >
              {fHandle.name}
            </button>
          </li>
        ))}
      </ul>

      {Tfilters.map((section) => (
        <Disclosure
          as='div'
          key={section.id}
          className='border-b border-gray-200 py-6'
        >
          {({ open }) => (
            <>
              <h3 className='-my-3 flow-root'>
                <Disclosure.Button className='flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500'>
                  <span className='font-medium text-gray-900'>
                    {section.name}
                  </span>
                  <span className='ml-6 flex items-center'>
                    {open ? (
                      <MinusIcon className='h-5 w-5' aria-hidden='true' />
                    ) : (
                      <PlusIcon className='h-5 w-5' aria-hidden='true' />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className='pt-6'>
                <div className='space-y-4'>
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className='flex items-center'>
                      <input
                        id={section.id}
                        name={section.id}
                        // defaultValue={option.value}
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        value={option.value}
                        onChange={updateFilters}
                       
                      />
                      <label
                        htmlFor={section.id}
                        className='ml-3 text-sm text-gray-600'
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
      <p>
        <button
          className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          onClick={() => clearFilters()}
        >
          Clear all filters
        </button>
      </p>
    </form>
  )
}
export default SidebarFilter
