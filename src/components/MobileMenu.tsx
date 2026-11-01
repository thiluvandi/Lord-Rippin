"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { href: "/drop", label: "New Drop" },
  { href: "/shop", label: "All T-Shirts" },
  { href: "/shop?category=graphic-tees", label: "Graphic Tees" },
  { href: "/shop?category=essentials", label: "Essentials" },
  { href: "/shop?sort=bestselling", label: "Bestsellers" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
];

const secondaryItems = [
  { href: "/account", label: "Account" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/search", label: "Search" },
  { href: "/size-guide", label: "Size Guide" },
  { href: "/contact", label: "Contact" },
];

export default function MobileMenu() {
  const { isMobileMenuOpen, setMobileMenuOpen } = useStore();

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-white"
        >
          <div className="flex flex-col justify-between h-full pt-20 pb-10 px-8">
            <nav className="flex flex-col gap-1">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 text-[28px] font-light tracking-wide text-foreground hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {secondaryItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[13px] tracking-[0.1em] uppercase text-muted hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="flex gap-6">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors text-[12px] tracking-widest uppercase">
                  Instagram
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors text-[12px] tracking-widest uppercase">
                  Pinterest
                </a>
              </div>

              <p className="text-[11px] font-mono text-muted tracking-wider">
                Lord Rippin&apos;
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
