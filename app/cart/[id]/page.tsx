import { getCart } from '@/utils/shopify/cartQueries'
import { CartPage } from '@/components/CartPage'

const Cart = async ({ params: { id } }) => {
  const cartId = decodeURIComponent(id)

  const data = await getCart(cartId)
  const cart = data.cart.lines.edges


  return <CartPage cart={cart} cartId={cartId} />
}

export default Cart
