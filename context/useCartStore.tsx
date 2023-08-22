import { VariantOptions } from '@/components/ProductForm'
import { Product } from '@/lib/createProductSlice'
import {
  addLineToCart,
  createCart,
  removeItemLines,
  updateCartItem,
} from '@/utils/shopify/cartQueries'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartStore {
  cartId: string
  cart: VariantOptions[]
  miniCart: VariantOptions[]
  showCart: boolean
  checkoutUrl: string
  addToCart: (product: VariantOptions) => void
  deleteCartItem: (cartId: string, itemId: string, variantId: string) => void
  updateItemQuantity: (
    cartId: string,
    variantId: string,
    cartLineId: string,
    quantity: number,
    action: 'decrease' | 'increase'
  ) => void
  toggleCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartId: '',
      cart: [],
      miniCart: [],
      showCart: false,
      checkoutUrl: '',
      addToCart: async (product) => {
        const cart = get().cart
        const miniCart = get().miniCart
        const id = get().cartId
        const newItem = { ...product }
        if (cart.length === 0) {
          const savedCart = await createCart(
            product.id,
            product.variantQuantity
          )
          console.log(savedCart)
          set({
            cart: savedCart.cartCreate.cart,
            miniCart: [newItem],
            showCart: true,
            cartId: savedCart.cartCreate.cart.id,
            checkoutUrl: savedCart.cartCreate.cart.checkoutUrl,
          })
        } else {
          let newCart: VariantOptions[] = []
          let added = false

          miniCart.map((item) => {
            if (item.id === newItem.id) {
              item.variantQuantity++
              newCart = [...miniCart]
              added = true
            }
          })

          if (!added) {
            newCart = [...miniCart, newItem]
          }

          const newSavedCart = await addLineToCart(id, newItem)

          console.log(newSavedCart.cartLinesAdd)
          set({
            cart: newSavedCart.cartLinesAdd.cart,
            miniCart: [...newCart],
            showCart: true,
          })
        }
      },
      deleteCartItem: async (cartId, itemId, variantId) => {
        const newCart = await removeItemLines(cartId, itemId)
        const miniCart = get().miniCart
        const newMiniCart = miniCart?.filter((item) => item.id !== variantId)

        set({ cart: newCart.cartLinesRemove.cart, miniCart: [...newMiniCart] })
      },
      updateItemQuantity: async (
        cartId,
        variantId,
        cartLineId,
        quantity,
        action
      ) => {
        let changedQuantity = quantity
        if (action === 'increase') {
          changedQuantity++
          const newCart = await updateCartItem(
            cartId,
            cartLineId,
            changedQuantity
          )
          set({ cart: newCart.cartLinesUpdate.cart })
        }
        if (action === 'decrease') {
          changedQuantity--
          const newCart = await updateCartItem(
            cartId,
            cartLineId,
            changedQuantity
          )
          set({ cart: newCart.cartLinesUpdate.cart })
        }

        // console.log(cartId, variantId, quantity)
        const miniCart = get().miniCart
        const findProduct = miniCart?.find((item) => item.id === variantId)
        if (findProduct) {
          if (action === 'decrease') {
            findProduct.variantQuantity =
              findProduct.variantQuantity > 1
                ? (findProduct.variantQuantity -= 1)
                : findProduct.variantQuantity
          } else {
            findProduct.variantQuantity! += 1
          }
        }

        set({ miniCart: miniCart })
         window.location.reload()
      },

      toggleCart: () => {
        set({ showCart: !get().showCart })
      },
    }),
    {
      name: 'cart_shopify',
      // getStorage: () => localStorage,
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
)
