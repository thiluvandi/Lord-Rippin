import Link from "next/link";

const footerLinks = {
  shop: [
    { href: "/drop", label: "New Drop" },
    { href: "/shop", label: "All T-Shirts" },
    { href: "/shop?sort=bestselling", label: "Bestsellers" },
    { href: "/collections", label: "Collections" },
  ],
  info: [
    { href: "/about", label: "Our Story" },
    { href: "/size-guide", label: "Size Guide" },
    { href: "/shipping-returns", label: "Shipping & Returns" },
  ],
  support: [
    { href: "/contact", label: "Contact" },
    { href: "/order-tracking", label: "Track Order" },
    { href: "/faq", label: "FAQ" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-white mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="py-16 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <h2 className="text-[24px] md:text-[28px] font-medium tracking-[0.15em] uppercase mb-6">
                Lord Rippin&apos;
              </h2>
              <p className="text-[13px] text-white/50 leading-relaxed max-w-[240px]">
                Independent clothing label. Premium heavyweight streetwear.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h3 className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-5 font-mono">
                Shop
              </h3>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/60 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <h3 className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-5 font-mono">
                Info
              </h3>
              <ul className="space-y-3">
                {footerLinks.info.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/60 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-5 font-mono">
                Support
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/60 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-white/30 tracking-wider font-mono">
              &copy; 2026 Lord Rippin&apos;
            </span>
            <span className="text-[11px] text-white/30 tracking-wider font-mono">
              INR &#8377;
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[11px] text-white/30 hover:text-accent transition-colors tracking-wider uppercase">
              Instagram
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-[11px] text-white/30 hover:text-accent transition-colors tracking-wider uppercase">
              Pinterest
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[11px] text-white/30 hover:text-accent transition-colors tracking-wider uppercase">
              YouTube
            </a>
          </div>
        </div>

        {/* Large statement */}
        <div className="py-12 md:py-16 text-center">
          <p className="text-[32px] md:text-[48px] lg:text-[64px] font-light tracking-[0.15em] uppercase text-white/[0.06]">
            Made Different.
          </p>
        </div>
      </div>
    </footer>
  );
}
