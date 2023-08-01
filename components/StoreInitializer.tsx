'use client'

import { useStore } from '@/context/store'
import { useRef } from 'react'

const StoreInitializer = ({
  cart,
  cartOpen,
  addToCart,
  decrementCartItem,
  incrementCartItem,
  deleteCartItem,
}) => {
  const initialized = useRef(false)
  if (!initialized.current) {
    useStore.setState({
      cart,
      cartOpen,
      addToCart,
      decrementCartItem,
      incrementCartItem,
      deleteCartItem,
    })
    initialized.current = true
  }
  return null
}
export default StoreInitializer
