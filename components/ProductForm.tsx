'use client'

import { useEffect, useState } from 'react'
import ProductVariantOptions from './ProductVariantOptions'
import { useShopContext } from '@/context/shopContext'
import { useStore } from '@/context/store'

const ProductForm = ({ product, productInventory }) => {
  console.log(product)
  // const { addToCart } = useShopContext()
  const { addToCart } = useStore((state) => ({
    addToCart: state.addToCart,
  }))
  const allVariantOptions = product.variants.edges.map((variant) => {
    const allOptions = {}

    variant.node.selectedOptions.map((item) => {
      allOptions[item.name] = item.value
    })

    return {
      id: variant.node.id,
      image: variant.node.image.url,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.price.amount,
      variantQuantity: 1,
      handle: product.handle,
      title: product.title,
    }
  })

  const defaultValues = {}
  product.options.map((item) => {
    defaultValues[item.name] = item.values[0]
  })

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
  const [selectedOptions, setSelectedOptions] = useState(defaultValues)
  const [inStock, setInStock] = useState(true)

  const setOptions = (name, value) => {
    setSelectedOptions((prevState) => {
      return { ...prevState, [name]: value }
    })
    const selection = {
      ...selectedOptions,
      [name]: value,
    }
    allVariantOptions.map((item) => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item)
      }
    })
  }

  useEffect(() => {
    if (productInventory) {
      const selectedItem = productInventory?.product?.variants?.edges.filter(
        (item) => item.node.id === selectedVariant.id
      )

      const isAvailable = selectedItem[0].node?.availableForSale

      if (isAvailable) {
        setInStock(true)
      } else {
        setInStock(false)
      }
    }
  }, [productInventory, selectedVariant])

  return (
    <>
      <div>
        {product.options.map(({ name, values }) => (
          <ProductVariantOptions
            key={`key-${name}`}
            name={name}
            values={values}
            selectedOptions={selectedOptions}
            inStock={inStock}
            setOptions={setOptions}
          />
        ))}
      </div>
      {inStock ? (
        <button
          className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          onClick={() => addToCart(selectedVariant)}
        >
          Add to Cart
        </button>
      ) : (
        <button className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 cursor-not-allowed'>
          Sold Out!
        </button>
      )}
    </>
  )
}
export default ProductForm
