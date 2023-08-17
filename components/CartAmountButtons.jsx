import { useCartStore } from '@/context/useCartStore'
import { useState } from 'react'

const CartAmountButtons = ({ product, cartId }) => {
  const { id, merchandise } = product.node
  const { quantity } = product.node

  const [newQuantity, setNewQuantity] = useState(quantity)
  const [deleteCartItem, updateItemQuantity] = useCartStore((state) => [
    state.deleteCartItem,
    state.updateItemQuantity,
  ])
  return (
    <div className='grid grid-cols-3'>
      <div>
        <button
          className='px-2'
          onClick={() => {
            if (quantity > 1) {
              console.log('clicked')
              setNewQuantity((oldQ) => {
                let tempQ = oldQ - 1
                return tempQ
              })
              updateItemQuantity(
                cartId,
                merchandise.id,
                id,
                newQuantity,
                'decrease'
              )
            }
          }}
          // disabled={cartLoading}
        >
          -
        </button>
      </div>
      <div>
        <span className='px-2 border border-gray-200'>{newQuantity}</span>
      </div>
      <div>
        <button
          className='px-2'
          onClick={() => {
            setNewQuantity((oldQ) => {
              let tempQ = oldQ + 1
              return tempQ
            })
            updateItemQuantity(
              cartId,
              merchandise.id,
              id,
              newQuantity,
              'increase'
            )
          }}
          // disabled={cartLoading}
        >
          +
        </button>
      </div>
    </div>
  )
}
export default CartAmountButtons
