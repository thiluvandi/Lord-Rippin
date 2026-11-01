"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/data/products";

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Chandigarh", "Puducherry",
];

export default function CheckoutPage() {
  const { cart, cartTotal } = useStore();
  const [step, setStep] = useState<"info" | "payment">("info");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const shipping = cartTotal >= 3999 ? 0 : 149;
  const total = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-[560px] mx-auto px-6 py-20 text-center">
        <h1 className="text-[24px] font-light tracking-tight mb-4">Your bag is empty</h1>
        <Link
          href="/shop"
          className="inline-block bg-foreground text-white px-8 py-3 text-[12px] tracking-[0.15em] uppercase hover:bg-accent transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 md:py-16">
      <h1 className="text-[28px] md:text-[36px] font-light tracking-tight mb-10 md:mb-14">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        {/* Form */}
        <div className="md:col-span-7">
          {/* Guest notice */}
          <p className="text-[12px] text-muted mb-8">
            Already have an account?{" "}
            <Link href="/account" className="text-foreground hover:text-accent transition-colors">
              Log in
            </Link>
          </p>

          {step === "info" && (
            <form onSubmit={(e) => { e.preventDefault(); setStep("payment"); }} className="space-y-8">
              {/* Contact */}
              <div>
                <h2 className="text-[13px] tracking-[0.15em] uppercase mb-5">Contact</h2>
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Email address"
                      required
                      className="w-full py-3 border-b border-border text-[14px] placeholder:text-muted/40 focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      required
                      className="w-full py-3 border-b border-border text-[14px] placeholder:text-muted/40 focus:border-accent transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div>
                <h2 className="text-[13px] tracking-[0.15em] uppercase mb-5">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First name"
                      required
                      className="w-full py-3 border-b border-border text-[14px] placeholder:text-muted/40 focus:border-accent transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      required
                      className="w-full py-3 border-b border-border text-[14px] placeholder:text-muted/40 focus:border-accent transition-colors"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Address line 1"
                    required
                    className="w-full py-3 border-b border-border text-[14px] placeholder:text-muted/40 focus:border-accent transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Address line 2 (optional)"
                    className="w-full py-3 border-b border-border text-[14px] placeholder:text-muted/40 focus:border-accent transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Pin code"
                      required
                      pattern="[0-9]{6}"
                      maxLength={6}
                      className="w-full py-3 border-b border-border text-[14px] placeholder:text-muted/40 focus:border-accent transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      required
                      className="w-full py-3 border-b border-border text-[14px] placeholder:text-muted/40 focus:border-accent transition-colors"
                    />
                  </div>
                  <select
                    required
                    className="w-full py-3 border-b border-border text-[14px] text-muted bg-transparent focus:border-accent transition-colors appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-foreground text-white py-3.5 text-[12px] tracking-[0.15em] uppercase hover:bg-accent transition-colors"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {step === "payment" && (
            <div className="space-y-8">
              <button
                onClick={() => setStep("info")}
                className="text-[11px] tracking-[0.1em] uppercase text-muted hover:text-accent transition-colors"
              >
                &larr; Back to information
              </button>

              <div>
                <h2 className="text-[13px] tracking-[0.15em] uppercase mb-5">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { id: "upi", label: "UPI", desc: "Google Pay, PhonePe, Paytm" },
                    { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay" },
                    { id: "netbanking", label: "Net Banking", desc: "All major banks" },
                    { id: "wallet", label: "Wallets", desc: "Paytm, Mobikwik" },
                    { id: "cod", label: "Cash on Delivery", desc: "+₹49 COD charge" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${
                        paymentMethod === method.id ? "border-foreground" : "border-border hover:border-muted"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                        paymentMethod === method.id ? "border-accent" : "border-border"
                      }`}>
                        {paymentMethod === method.id && (
                          <div className="w-2 h-2 bg-accent rounded-full" />
                        )}
                      </div>
                      <div>
                        <span className="text-[13px] tracking-wide">{method.label}</span>
                        <span className="text-[11px] text-muted ml-2">{method.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Coupon */}
              <div>
                <h2 className="text-[13px] tracking-[0.15em] uppercase mb-4">Coupon Code</h2>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="flex-1 py-3 border-b border-border text-[14px] placeholder:text-muted/40 focus:border-accent transition-colors"
                  />
                  <button className="text-[11px] tracking-[0.1em] uppercase text-foreground hover:text-accent transition-colors px-4">
                    Apply
                  </button>
                </div>
              </div>

              <button className="w-full bg-foreground text-white py-3.5 text-[12px] tracking-[0.15em] uppercase hover:bg-accent transition-colors">
                Pay {formatPrice(total)}
              </button>

              <p className="text-[11px] font-mono text-muted text-center tracking-wider">
                Secured by Razorpay
              </p>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="md:col-span-5">
          <div className="bg-panel p-6 md:p-8 md:sticky md:top-28">
            <h2 className="text-[13px] tracking-[0.15em] uppercase mb-6">Order Summary</h2>

            <div className="space-y-4 divide-y divide-border/50">
              {cart.map((item) => (
                <div key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-4 pt-4 first:pt-0">
                  <div className="relative w-16 h-20 bg-white flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-foreground text-white text-[10px] flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[12px] tracking-[0.05em] uppercase">{item.name}</h3>
                    <p className="text-[11px] text-muted mt-0.5">{item.color} / {item.size}</p>
                    <p className="text-[12px] font-mono mt-1">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border/50 space-y-2">
              <div className="flex justify-between text-[12px]">
                <span className="text-muted">Subtotal</span>
                <span className="font-mono">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-muted">Shipping</span>
                <span className="font-mono">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex justify-between">
              <span className="text-[13px] tracking-[0.1em] uppercase">Total</span>
              <span className="text-[16px] font-mono">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
