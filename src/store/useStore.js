import { create } from 'zustand'
import { showToast } from '../utils/toast'

const useStore = create((set, get) => ({
  cart: [],
  cartOpen: false,
  wishlist: [],
  openPage: null,
  isAuth: typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') === 'true' : false,
  loginOpen: false,
  checkoutOpen: false,
  wishlistOpen: false,
  checkoutItems: [],
  claimedVoucher: null,

  toggleCart: () => set(s => ({ cartOpen: !s.cartOpen, wishlistOpen: false })),
  closeCart: () => set({ cartOpen: false }),
  toggleWishlistDrawer: () => set(s => ({ wishlistOpen: !s.wishlistOpen, cartOpen: false })),
  closeWishlistDrawer: () => set({ wishlistOpen: false }),
  openCheckout: (items = []) => set({ 
    checkoutOpen: true, 
    cartOpen: false, 
    wishlistOpen: false,
    checkoutItems: items.length > 0 ? items : get().cart 
  }),
  closeCheckout: () => set({ checkoutOpen: false, checkoutItems: [] }),
  setClaimedVoucher: (code) => set({ claimedVoucher: code }),
  setCategory: (cat) => set({ openCategory: cat, openPage: null }),
  closeCategory: () => set({ openCategory: null }),
  setProduct: (product) => set({ openProduct: product }),
  closeProduct: () => set({ openProduct: null }),
  setPage: (page) => set({ openPage: page, openCategory: null }),
  closePage: () => set({ openPage: null }),

  setAuth: (status) => {
    if (typeof window !== 'undefined') {
      if (status) localStorage.setItem('isLoggedIn', 'true');
      else localStorage.removeItem('isLoggedIn');
    }
    set({ isAuth: status })
  },
  openLogin: () => set({ loginOpen: true }),
  closeLogin: () => set({ loginOpen: false }),

  addToCart: (product) => {
    const { cart } = get()
    const existing = cart.find(i => i.id === product.id)
    if (existing) {
      set({ cart: cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) })
    } else {
      set({ cart: [...cart, { ...product, qty: 1 }] })
    }
    showToast(`${product.name} added to cart`, 'cart')
  },

  removeFromCart: (id) => set(s => ({ cart: s.cart.filter(i => i.id !== id) })),

  updateQty: (id, qty) => {
    if (qty < 1) { get().removeFromCart(id); return }
    set(s => ({ cart: s.cart.map(i => i.id === id ? { ...i, qty } : i) }))
  },

  cartTotal: () => get().cart.reduce((sum, i) => sum + i.price * i.qty, 0),
  cartCount: () => get().cart.reduce((sum, i) => sum + i.qty, 0),

  toggleWishlist: (id, name) => {
    const { wishlist } = get()
    const isWished = wishlist.includes(id)
    set({ wishlist: isWished ? wishlist.filter(w => w !== id) : [...wishlist, id] })
    showToast(
      isWished ? 'Removed from wishlist' : `${name || 'Item'} added to wishlist`,
      'wishlist'
    )
  },
}))

export default useStore
