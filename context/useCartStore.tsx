import { VariantOptions } from '@/components/ProductForm'
import { Product } from '@/lib/createProductSlice'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CartStore {
  cart: VariantOptions[]
  showCart: Boolean
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
      addToCart: (product) => {
        const cart = get().cart
        const findProduct = cart.find((item) => item.id === product.id)
        if (findProduct) {
          findProduct.variantQuantity! += 1
        } else {
          cart.push({ ...product })
        }

        set({ cart, showCart: true })
      },
      deleteCartItem: (productId) => {
        const cart = get().cart.filter((item) => item.id !== productId)
        set({ cart })
      },
      updateItemQuantity: (productId, action) => {
        const cart = get().cart
        const findProduct = cart.find((item) => item.id === productId)
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

        let total = 0
        cart.map(
          (item) =>
            (total += parseInt(item?.variantPrice) * item?.variantQuantity)
        )
        set({ cart })
      },
      showCart: false,
      toggleCart: () => {
        set({ showCart: !get().showCart })
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart_id',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
