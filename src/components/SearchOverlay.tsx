"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { formatPrice, collections } from "@/data/products";
import { useCatalog } from "@/lib/catalog-context";
import { motion, AnimatePresence } from "framer-motion";

const popularSearches = ["Graphic Tees", "Oversized", "Black", "Essentials", "After Hours"];

export default function SearchOverlay() {
  const { isSearchOpen, setSearchOpen } = useStore();
  const products = useCatalog();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !isSearchOpen && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isSearchOpen, setSearchOpen]);

  const filteredProducts = query.length > 1
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.collection.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.includes(query.toLowerCase())) ||
          p.variants.some((v) => v.color.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const filteredCollections = query.length > 1
    ? collections.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-white"
        >
          <div className="max-w-[720px] mx-auto px-6 pt-20 md:pt-32">
            {/* Close */}
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-5 right-6 text-muted hover:text-foreground transition-colors"
              aria-label="Close search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </svg>
            </button>

            {/* Input */}
            <div className="border-b border-foreground pb-3">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full text-[24px] md:text-[32px] font-light tracking-wide bg-transparent placeholder:text-muted/40"
              />
            </div>

            <div className="mt-8">
              {query.length < 2 ? (
                <div>
                  <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted mb-4">
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="text-[13px] tracking-wider text-muted hover:text-accent transition-colors py-1"
                      >
                        {term}
                      </button>
                    ))}
                  </div>

                  <p className="mt-10 text-[11px] font-mono text-muted/40 tracking-wider hidden md:block">
                    Press / to search &middot; Esc to close
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredCollections.length > 0 && (
                    <div>
                      <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted mb-3">
                        Collections
                      </p>
                      {filteredCollections.map((c) => (
                        <Link
                          key={c.id}
                          href={`/collections/${c.slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="block py-2 text-[14px] tracking-wider text-foreground hover:text-accent transition-colors"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  {filteredProducts.length > 0 ? (
                    <div>
                      <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted mb-3">
                        Products
                        <span className="text-accent ml-2">{filteredProducts.length}</span>
                      </p>
                      <div className="space-y-3 max-h-[50vh] overflow-y-auto">
                        {filteredProducts.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center gap-4 py-2 group"
                          >
                            <div className="relative w-14 h-18 bg-[#f5f5f5] flex-shrink-0">
                              <Image
                                src={product.variants[0].images[0]}
                                alt={product.name}
                                width={56}
                                height={72}
                                className="object-cover w-14 h-[72px]"
                              />
                            </div>
                            <div>
                              <h3 className="text-[13px] tracking-[0.05em] uppercase group-hover:text-accent transition-colors">
                                {product.name}
                              </h3>
                              <p className="text-[12px] font-mono text-muted mt-0.5">
                                {formatPrice(product.price)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    query.length >= 2 && filteredCollections.length === 0 && (
                      <p className="text-[13px] text-muted">
                        No results for &ldquo;{query}&rdquo;
                      </p>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
