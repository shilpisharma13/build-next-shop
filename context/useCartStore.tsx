import { VariantOptions } from '@/components/ProductForm'
import { Product } from '@/lib/createProductSlice'
import { addLineToCart, createCart } from '@/utils/shopify'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartStore {
  cart: VariantOptions[]
  showCart: boolean
  cartId: string
  addToCart: (product: VariantOptions) => void
  deleteCartItem: (productId: string) => void
  updateItemQuantity: (
    productId: string,
    action: 'increase' | 'decrease'
  ) => void
  toggleCart: () => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      showCart: false,
      cartId: '',
      addToCart: async (product) => {
        const cart = get().cart
        const id = get().cartId
        const newItem = { ...product }
        if (cart.length === 0) {
          const savedCart = await createCart(
            product.id,
            product.variantQuantity
          )
          set({
            cart: [newItem],
            showCart: true,
            cartId: savedCart.cartCreate.cart.id,
          })
        } else {
          let newCart: VariantOptions[] = []
          let added = false

          cart.map((item) => {
            if (item.id === newItem.id) {
              item.variantQuantity++
              newCart = [...cart]
              added = true
            }
          })

          if (!added) {
            newCart = [...cart, newItem]
          }

          const newSavedCart = await addLineToCart(id, newItem)

          set({
            cart: [...newCart],
            showCart: true,
          })
        }
      },
      deleteCartItem: (productId) => {
        const cart = get().cart?.filter((item) => item.id !== productId)
        set({ cart })
      },
      updateItemQuantity: (productId, action) => {
        const cart = get().cart
        const findProduct = cart?.find((item) => item.id === productId)
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

        set({ cart })
      },

      toggleCart: () => {
        set({ showCart: !get().showCart })
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart_shopify',
      // getStorage: () => localStorage,
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
)
