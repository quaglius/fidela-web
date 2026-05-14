'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getCheckoutUrl } from './tiendanube'

export interface CartItem {
  variantId: number
  productId: number
  productName: string
  variantName: string
  price: string
  quantity: number
  image: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (variantId: number) => void
  updateQuantity: (variantId: number, quantity: number) => void
  clear: () => void
  open: () => void
  close: () => void
  total: () => number
  checkoutUrl: () => string
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.variantId === item.variantId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
              isOpen: true,
            }
          }
          return { items: [...state.items, item], isOpen: true }
        })
      },

      removeItem: (variantId) =>
        set((state) => ({ items: state.items.filter((i) => i.variantId !== variantId) })),

      updateQuantity: (variantId, quantity) => {
        if (quantity < 1) {
          get().removeItem(variantId)
          return
        }
        set((state) => ({
          items: state.items.map((i) => (i.variantId === variantId ? { ...i, quantity } : i)),
        }))
      },

      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),

      total: () => get().items.reduce((sum, i) => sum + parseFloat(i.price) * i.quantity, 0),

      checkoutUrl: () =>
        getCheckoutUrl(get().items.map((i) => ({ variantId: i.variantId, quantity: i.quantity }))),
    }),
    { name: 'fidela-cart' }
  )
)
