"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  variantId?: string;
}

export interface WishlistItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  color: string;
}

interface StoreState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  startCheckout: () => Promise<void>;
  isCheckingOut: boolean;
  checkoutError: string | null;
  cartCount: number;
  cartTotal: number;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  toggleSearch: () => void;
  setSearchOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.color === item.color && i.size === item.size
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId && i.color === item.color && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string, color: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.color === color && i.size === size)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, color: string, size: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId, color, size);
        return;
      }
      setCart((prev) =>
        prev.map((i) =>
          i.productId === productId && i.color === color && i.size === size
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => setCart([]), []);

  const startCheckout = useCallback(async () => {
    if (cart.length === 0 || cart.some((i) => !i.variantId)) {
      window.location.assign("/checkout");
      return;
    }
    setIsCheckingOut(true);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: cart.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.checkoutUrl) throw new Error(data.error ?? "Checkout failed");
      window.location.assign(data.checkoutUrl);
    } catch (e) {
      setCheckoutError(e instanceof Error ? e.message : "Checkout failed");
      setIsCheckingOut(false);
    }
  }, [cart]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);
  const setCartOpen = useCallback((open: boolean) => setIsCartOpen(open), []);
  const toggleSearch = useCallback(() => setIsSearchOpen((prev) => !prev), []);
  const setSearchOpen = useCallback((open: boolean) => setIsSearchOpen(open), []);
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((prev) => !prev), []);
  const setMobileMenuOpen = useCallback((open: boolean) => setIsMobileMenuOpen(open), []);

  const addToWishlist = useCallback((item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.find((i) => i.productId === item.productId)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.some((i) => i.productId === productId),
    [wishlist]
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        isSearchOpen,
        isMobileMenuOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        startCheckout,
        isCheckingOut,
        checkoutError,
        cartCount,
        cartTotal,
        toggleCart,
        setCartOpen,
        toggleSearch,
        setSearchOpen,
        toggleMobileMenu,
        setMobileMenuOpen,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
