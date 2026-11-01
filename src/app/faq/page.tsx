"use client";

import { useState } from "react";

const faqs = [
  {
    category: "Orders",
    items: [
      {
        q: "How long does shipping take?",
        a: "Standard delivery takes 5–7 business days. Express delivery takes 2–3 business days. Orders placed before 2PM IST ship the same day.",
      },
      {
        q: "Do you offer Cash on Delivery?",
        a: "Yes. COD is available across most pin codes with a ₹49 additional charge.",
      },
      {
        q: "How can I track my order?",
        a: "You'll receive a tracking link via email and WhatsApp once your order ships. You can also track it on our Order Tracking page.",
      },
      {
        q: "Do you ship internationally?",
        a: "We currently ship domestically only. International shipping is coming soon.",
      },
    ],
  },
  {
    category: "Products",
    items: [
      {
        q: "What GSM cotton do you use?",
        a: "Our graphic tees use 240 GSM premium combed cotton. Essentials use 220 GSM. Both are pre-shrunk and garment-dyed.",
      },
      {
        q: "How do your T-shirts fit?",
        a: "Most pieces have a relaxed oversized fit with drop shoulders. Check our size guide for specific measurements. When in doubt, go with your regular size.",
      },
      {
        q: "Will the print fade after washing?",
        a: "Our high-density screen prints are built to last. Wash inside out in cold water and they'll hold up wash after wash.",
      },
      {
        q: "Will the T-shirt shrink?",
        a: "All our fabrics are pre-shrunk before construction. You can expect minimal to no shrinkage.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 15 days of delivery. Items must be unworn, unwashed and with tags attached.",
      },
      {
        q: "Can I exchange for a different size?",
        a: "Yes. Size and colour exchanges are free, subject to availability. We arrange a free pickup.",
      },
      {
        q: "How do refunds work?",
        a: "Refunds are processed within 5–7 business days after we receive the returned item, back to your original payment method.",
      },
    ],
  },
  {
    category: "Drops & Availability",
    items: [
      {
        q: "What does 'Drop' mean?",
        a: "We release products in focused collections called Drops rather than traditional seasons. Each Drop has its own identity and limited stock.",
      },
      {
        q: "Will sold-out items restock?",
        a: "Some items may restock, but most Drop pieces are limited runs. Sign up for our newsletter to get notified.",
      },
      {
        q: "How do I get early access to Drops?",
        a: "Subscribe to our newsletter. Subscribers get early access notifications before public launch.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="max-w-[720px] mx-auto px-6 md:px-10 py-12 md:py-20">
      <h1 className="text-[28px] md:text-[36px] font-light tracking-tight mb-2">
        FAQ
      </h1>
      <p className="text-[13px] text-muted mb-10 md:mb-14">
        Frequently asked questions.
      </p>

      <div className="space-y-10">
        {faqs.map((category) => (
          <div key={category.category}>
            <h2 className="text-[12px] font-mono tracking-[0.15em] uppercase text-muted mb-4 pb-3 border-b border-foreground">
              {category.category}
            </h2>
            <div className="divide-y divide-border">
              {category.items.map((item) => {
                const key = `${category.category}-${item.q}`;
                const isOpen = openItem === key;
                return (
                  <div key={key}>
                    <button
                      onClick={() => setOpenItem(isOpen ? null : key)}
                      className="w-full flex items-center justify-between py-4 text-left group"
                    >
                      <span className="text-[14px] pr-4 group-hover:text-accent transition-colors">
                        {item.q}
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className={`text-muted flex-shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`}
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="pb-4">
                        <p className="text-[13px] text-muted leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
