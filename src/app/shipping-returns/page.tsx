export default function ShippingReturnsPage() {
  const sections = [
    {
      title: "Shipping",
      items: [
        { label: "Standard Delivery", detail: "5–7 business days — ₹149" },
        { label: "Express Delivery", detail: "2–3 business days — ₹299" },
        { label: "Free Shipping", detail: "On all orders above ₹3,999" },
        { label: "Cash on Delivery", detail: "Available — +₹49 COD charge" },
      ],
    },
    {
      title: "Returns",
      items: [
        { label: "Return Window", detail: "15 days from delivery" },
        { label: "Condition", detail: "Unworn, unwashed, with tags attached" },
        { label: "Process", detail: "Initiate via your account or contact us" },
        { label: "Pickup", detail: "Free reverse pickup in most pin codes" },
      ],
    },
    {
      title: "Exchanges",
      items: [
        { label: "Size Exchange", detail: "Free — subject to availability" },
        { label: "Colour Exchange", detail: "Free — subject to availability" },
        { label: "Timeline", detail: "Exchanged item shipped within 3 business days of pickup" },
      ],
    },
    {
      title: "Refunds",
      items: [
        { label: "Method", detail: "Refunded to original payment method" },
        { label: "Timeline", detail: "5–7 business days after return is received" },
        { label: "COD Orders", detail: "Refunded via bank transfer or store credit" },
      ],
    },
  ];

  return (
    <div className="max-w-[720px] mx-auto px-6 md:px-10 py-12 md:py-20">
      <h1 className="text-[28px] md:text-[36px] font-light tracking-tight mb-2">
        Shipping &amp; Returns
      </h1>
      <p className="text-[11px] font-mono tracking-[0.2em] text-muted mb-10 md:mb-14">
        INR
      </p>

      <div className="space-y-12">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-[14px] tracking-[0.1em] uppercase mb-6 pb-3 border-b border-foreground">
              {section.title}
            </h2>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-start gap-6">
                  <span className="text-[11px] font-mono tracking-[0.1em] text-muted uppercase w-36 flex-shrink-0 pt-0.5">
                    {item.label}
                  </span>
                  <span className="text-[13px] leading-relaxed">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
