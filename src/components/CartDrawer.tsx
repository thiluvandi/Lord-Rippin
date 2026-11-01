"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

const FREE_SHIPPING_THRESHOLD = 3999;

export default function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, removeFromCart, updateQuantity, cartTotal, startCheckout, isCheckingOut, checkoutError } = useStore();

  const freeShippingReached = cartTotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/20"
            onClick={() => setCartOpen(false)}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[420px] bg-white flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="text-[13px] tracking-[0.15em] uppercase">
                Bag
                {cart.length > 0 && (
                  <span className="text-accent font-mono ml-2">({cart.length})</span>
                )}
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-muted hover:text-foreground transition-colors"
                aria-label="Close cart"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-[13px] text-muted tracking-wider mb-4">Your bag is empty.</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="text-[12px] tracking-[0.1em] uppercase text-foreground hover:text-accent transition-colors"
                  >
                    Continue Shopping &rarr;
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {cart.map((item) => (
                    <div key={`${item.productId}-${item.color}-${item.size}`} className="py-5 flex gap-4">
                      <Link href={`/product/${item.slug}`} onClick={() => setCartOpen(false)} className="relative w-20 h-24 bg-[#f5f5f5] flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-[12px] tracking-[0.05em] uppercase text-foreground">
                              {item.name}
                            </h3>
                            <p className="text-[11px] text-muted mt-0.5">
                              {item.color} / {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.productId, item.color, item.size)}
                            className="text-muted hover:text-foreground transition-colors ml-2"
                            aria-label="Remove item"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <line x1="6" y1="6" x2="18" y2="18" />
                              <line x1="6" y1="18" x2="18" y2="6" />
                            </svg>
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-muted hover:text-foreground transition-colors text-[14px]"
                            >
                              &minus;
                            </button>
                            <span className="text-[12px] font-mono w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-muted hover:text-foreground transition-colors text-[14px]"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[12px] font-mono">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-border px-6 py-5 space-y-4">
                {freeShippingReached && (
                  <p className="text-[11px] font-mono text-accent tracking-wider text-center">
                    You&apos;ve unlocked free shipping.
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-[12px] tracking-[0.1em] uppercase text-muted">
                    Subtotal
                  </span>
                  <span className="text-[14px] font-mono">{formatPrice(cartTotal)}</span>
                </div>

                <button
                  onClick={startCheckout}
                  disabled={isCheckingOut}
                  className="block w-full bg-foreground text-white text-center py-3.5 text-[12px] tracking-[0.15em] uppercase hover:bg-accent transition-colors duration-300 disabled:opacity-60"
                >
                  {isCheckingOut ? "Redirecting..." : "Checkout"}
                </button>
                {checkoutError && (
                  <p className="text-[11px] text-center text-accent">{checkoutError}</p>
                )}

                <Link
                  href="/cart"
                  onClick={() => setCartOpen(false)}
                  className="block text-center text-[11px] tracking-[0.1em] uppercase text-muted hover:text-accent transition-colors"
                >
                  View Bag
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
