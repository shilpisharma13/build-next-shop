import { getCart } from '@/utils/shopify/cartQueries'
import TempCartPage from '@/components/TempCartPage'
import Image from 'next/image'
import Link from 'next/link'
import { TrashIcon } from '@heroicons/react/24/outline'
import { CartPage } from '@/components/CartPage'

const Cart = async ({ params: { id } }) => {
  const cartId = decodeURIComponent(id)

  const data = await getCart(cartId)
  const cart = data.cart.lines.edges

  // const handleRemoveItem = async (cartId, lineId) => {
  //   const variables = {
  //     cartId,
  //     lineIds: [lineId],
  //   }
  //   await graphQLClient.request(removeItemMutation, variables)
  // }
  return <CartPage cart={cart} cartId={cartId} />
}

export default Cart
/*
{
  cart: {
    id: 'gid://shopify/Cart/c1-8cc9e312982750fd674fc9eb73cf16ca',
    checkoutUrl: 'https://test-the-toys-store.myshopify.com/cart/c/c1-8cc9e312982750fd674fc9eb73cf16ca',
    lines: {
      edges: [
        {
          node: {
            id: 'gid://shopify/CartLine/d19807e9-1753-4a68-aa8b-45cc2fd1142b?cart=c1-8cc9e312982750fd674fc9eb73cf16ca',
            quantity: 1,
            merchandise: {
              id: 'gid://shopify/ProductVariant/45260621938962',
              title: '5 / red',
              priceV2: { amount: '99.95', currencyCode: 'AUD' },
              image: {
                url: 
                  'https://cdn.shopify.com/s/files/1/0765/4775/2210/products/d841f71ea6845bf6005453e15a18c632.jpg?v=1685506102',
                altText: null,
                width: 635,
                height: 560
              },
              selectedOptions: [ { name: 'Size', value: '5' }, { name: 'Color', value: 'red' } ],
              product: {
                id: 'gid://shopify/Product/8338582274322',
                title: 'VANS | AUTHENTIC | (MULTI EYELETS) | GRADIENT/CRIMSON',
                handle: 'vans-authentic-multi-eyelets-gradient-crimson'
              }
            }
          }
        }
      ]
    }
  }
}*/
