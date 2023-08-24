import { useCartStore } from '@/context/useCartStore'
import { useState } from 'react'

const CartAmountButtons = ({ product, cartId }) => {
  const { id, merchandise } = product.node
  const { quantity } = product.node

  const [newQuantity, setNewQuantity] = useState(quantity)
  const [doubleClick, setDoubleClick] = useState(false)
  const [deleteCartItem, updateItemQuantity] = useCartStore((state) => [
    state.deleteCartItem,
    state.updateItemQuantity,
  ])
  return (
    <div className='grid grid-cols-3'>
      <div>
        <button
          className='px-2'
          disabled={doubleClick}
          onClick={() => {
            if (newQuantity > 1) {
              setNewQuantity((oldQ) => {
                let tempQ = oldQ - 1
                return tempQ
              })
              setDoubleClick((o) => !o)
              updateItemQuantity(
                cartId,
                merchandise.id,
                id,
                newQuantity,
                'decrease'
              )
            }
          }}
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
          disabled={doubleClick}
          onClick={() => {
            setNewQuantity((oldQ) => {
              let tempQ = oldQ + 1
              return tempQ
            })
            setDoubleClick((o) => !o)
            updateItemQuantity(
              cartId,
              merchandise.id,
              id,
              newQuantity,
              'increase'
            )
          }}
        >
          +
        </button>
      </div>
    </div>
  )
}
export default CartAmountButtons
