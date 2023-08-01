import { create } from 'zustand'

export const useStore = create((set) => ({
  cart: [],
  cartOpen: false,
  addToCart: (product) => {
    console.log(product)
    set((state) => ({
      cart: [product, ...state.cart],
      cartOpen: true,
    }))
 
  },
  deleteCartItem: (product) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== product.id),
    }))
  },
  decrementCartItem: (product) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === product.id
          ? { ...item, variantQuantity: item.variantQuantity - 1 }
          : { ...item }
      ),
    }))
  },
  incrementCartItem: (product) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === product.id
          ? { ...item, variantQuantity: item.variantQuantity + 1 }
          : item
      ),
    }))
  },
}))
