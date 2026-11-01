"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/data/products";

const FREE_SHIPPING_THRESHOLD = 3999;

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();
  const freeShippingReached = cartTotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <div className="max-w-[960px] mx-auto px-6 md:px-10 py-12 md:py-20">
      <h1 className="text-[28px] md:text-[36px] font-light tracking-tight mb-2">
        Your Bag
      </h1>
      <p className="text-[11px] font-mono tracking-[0.2em] text-muted mb-10 md:mb-14">
        {cart.length} {cart.length === 1 ? "Item" : "Items"}
      </p>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[14px] text-muted mb-6">Your bag is empty.</p>
          <Link
            href="/shop"
            className="inline-block bg-foreground text-white px-8 py-3.5 text-[12px] tracking-[0.15em] uppercase hover:bg-accent transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="divide-y divide-border">
            {cart.map((item) => (
              <div key={`${item.productId}-${item.color}-${item.size}`} className="py-6 flex gap-5">
                <Link href={`/product/${item.slug}`} className="relative w-24 h-32 md:w-28 md:h-36 bg-[#f5f5f5] flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="120px" />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-[13px] tracking-[0.05em] uppercase">{item.name}</h3>
                      <p className="text-[12px] text-muted mt-1">{item.color} / {item.size}</p>
                    </div>
                    <span className="text-[13px] font-mono">{formatPrice(item.price * item.quantity)}</span>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-4 border border-border">
                      <button
                        onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-muted hover:text-foreground transition-colors"
                      >
                        &minus;
                      </button>
                      <span className="text-[12px] font-mono w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-muted hover:text-foreground transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.color, item.size)}
                      className="text-[11px] tracking-[0.1em] uppercase text-muted hover:text-accent transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-border pt-6 space-y-4">
            {freeShippingReached && (
              <p className="text-[11px] font-mono text-accent tracking-wider text-center">
                You&apos;ve unlocked free shipping.
              </p>
            )}
            {!freeShippingReached && (
              <p className="text-[11px] font-mono text-muted tracking-wider text-center">
                {formatPrice(FREE_SHIPPING_THRESHOLD - cartTotal)} away from free shipping.
              </p>
            )}

            <div className="flex items-center justify-between">
              <span className="text-[13px] tracking-[0.1em] uppercase">Subtotal</span>
              <span className="text-[16px] font-mono">{formatPrice(cartTotal)}</span>
            </div>

            <p className="text-[11px] text-muted">Shipping calculated at checkout.</p>

            <Link
              href="/checkout"
              className="block w-full bg-foreground text-white text-center py-3.5 text-[12px] tracking-[0.15em] uppercase hover:bg-accent transition-colors"
            >
              Checkout
            </Link>

            <Link
              href="/shop"
              className="block text-center text-[11px] tracking-[0.1em] uppercase text-muted hover:text-accent transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
