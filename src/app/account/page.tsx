"use client";

import { useState } from "react";
import Link from "next/link";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="max-w-[440px] mx-auto px-6 py-16 md:py-24">
      <h1 className="text-[28px] md:text-[36px] font-light tracking-tight text-center mb-2">
        {isLogin ? "Log In" : "Create Account"}
      </h1>
      <p className="text-[13px] text-muted text-center mb-10">
        {isLogin
          ? "Welcome back."
          : "Join Lord Rippin' for early access to drops and exclusive offers."}
      </p>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        {!isLogin && (
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
        )}

        <input
          type="email"
          placeholder="Email address"
          required
          className="w-full py-3 border-b border-border text-[14px] placeholder:text-muted/40 focus:border-accent transition-colors"
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full py-3 border-b border-border text-[14px] placeholder:text-muted/40 focus:border-accent transition-colors"
        />

        {!isLogin && (
          <input
            type="tel"
            placeholder="Phone number"
            className="w-full py-3 border-b border-border text-[14px] placeholder:text-muted/40 focus:border-accent transition-colors"
          />
        )}

        <button
          type="submit"
          className="w-full bg-foreground text-white py-3.5 text-[12px] tracking-[0.15em] uppercase hover:bg-accent transition-colors mt-4"
        >
          {isLogin ? "Log In" : "Create Account"}
        </button>
      </form>

      <div className="mt-8 text-center space-y-3">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-[12px] tracking-wider text-muted hover:text-accent transition-colors"
        >
          {isLogin ? "Create an account" : "Already have an account? Log in"}
        </button>

        {isLogin && (
          <p>
            <button className="text-[11px] tracking-wider text-muted/60 hover:text-accent transition-colors">
              Forgot password?
            </button>
          </p>
        )}
      </div>

      {/* Account dashboard placeholder */}
      <div className="mt-16 pt-10 border-t border-border">
        <h2 className="text-[14px] tracking-[0.1em] uppercase mb-6">Quick Links</h2>
        <div className="space-y-3">
          {[
            { href: "/order-tracking", label: "Track Order" },
            { href: "/wishlist", label: "Wishlist" },
            { href: "/size-guide", label: "Size Guide" },
            { href: "/shipping-returns", label: "Shipping & Returns" },
            { href: "/contact", label: "Contact Us" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-[13px] text-muted hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
