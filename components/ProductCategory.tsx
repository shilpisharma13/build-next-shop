import { Disclosure } from '@headlessui/react'

const ProductCategory = ({ categoriesList }) => {
  return (
    <Disclosure.Panel className='pt-6'>
      <div className='space-y-6'>
        {categoriesList.map((category, index) => (
          <div key={index} className='flex items-center'>
            <input
              id={`filter-mobile-${category}-${index}`}
              name={category}
              // defaultValue={option.value}
              type='checkbox'
              // defaultChecked={option.checked}
              className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
            />
            <label
              htmlFor={`filter-mobile-${category}-${index}`}
              className='ml-3 min-w-0 flex-1 text-gray-500'
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </Disclosure.Panel>
  )
}
export default ProductCategory
