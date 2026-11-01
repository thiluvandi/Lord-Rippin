"use client";

import { useState } from "react";

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-[560px] mx-auto px-6 py-16 md:py-24">
      <h1 className="text-[28px] md:text-[36px] font-light tracking-tight text-center mb-2">
        Track Order
      </h1>
      <p className="text-[13px] text-muted text-center mb-10">
        Enter your order ID to check the status.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="space-y-6"
      >
        <div>
          <input
            type="text"
            value={orderId}
            onChange={(e) => {
              setOrderId(e.target.value);
              setSubmitted(false);
            }}
            placeholder="Order ID (e.g., LR-2026-001234)"
            required
            className="w-full py-3 border-b border-border text-[14px] placeholder:text-muted/40 focus:border-accent transition-colors"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email address"
            required
            className="w-full py-3 border-b border-border text-[14px] placeholder:text-muted/40 focus:border-accent transition-colors"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-foreground text-white py-3.5 text-[12px] tracking-[0.15em] uppercase hover:bg-accent transition-colors"
        >
          Track Order
        </button>
      </form>

      {submitted && (
        <div className="mt-10 p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[11px] font-mono tracking-[0.15em] text-muted">Order</p>
              <p className="text-[14px] font-mono mt-1">{orderId || "LR-2026-001234"}</p>
            </div>
            <span className="text-[11px] font-mono tracking-wider text-accent uppercase">
              In Transit
            </span>
          </div>

          <div className="space-y-4">
            {[
              { status: "Order Placed", date: "Sep 14, 2026", done: true },
              { status: "Confirmed", date: "Sep 14, 2026", done: true },
              { status: "Shipped", date: "Sep 15, 2026", done: true },
              { status: "In Transit", date: "Sep 16, 2026", done: true },
              { status: "Delivered", date: "Expected Sep 19", done: false },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                  step.done ? "bg-accent" : "bg-border"
                }`} />
                <div>
                  <p className={`text-[13px] ${step.done ? "text-foreground" : "text-muted"}`}>
                    {step.status}
                  </p>
                  <p className="text-[11px] font-mono text-muted mt-0.5">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
