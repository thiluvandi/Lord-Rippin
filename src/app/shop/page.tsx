"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colorOptions = ["Black", "White", "Grey", "Bone", "Charcoal"];
const collectionOptions = ["Graphics", "Essentials", "After Dark", "Archive"];
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "bestselling", label: "Bestselling" },
  { value: "price-asc", label: "Price Low–High" },
  { value: "price-desc", label: "Price High–Low" },
];

export default function ShopPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "editorial">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedSize) {
      result = result.filter((p) =>
        p.variants.some((v) => v.sizes.some((s) => s.size === selectedSize && s.inStock))
      );
    }

    if (selectedCollection) {
      result = result.filter((p) => p.collection === selectedCollection);
    }

    switch (sortBy) {
      case "bestselling":
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [selectedSize, selectedCollection, sortBy]);

  const clearFilters = () => {
    setSelectedSize(null);
    setSelectedCollection(null);
  };

  const hasFilters = selectedSize || selectedCollection;

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-12 md:py-20">
      {/* Header */}
      <div className="mb-10 md:mb-16">
        <h1 className="text-[28px] md:text-[40px] font-light tracking-tight">
          All T-Shirts
        </h1>
        <p className="text-[11px] font-mono tracking-[0.2em] text-muted mt-2">
          {filtered.length} Pieces
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex items-center justify-between border-b border-border pb-4 mb-8 md:mb-12">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-[12px] tracking-[0.1em] uppercase text-muted hover:text-foreground transition-colors"
          >
            {showFilters ? "Hide Filters" : "Filters"}
            {hasFilters && <span className="text-accent ml-1">&bull;</span>}
          </button>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-[11px] tracking-[0.1em] uppercase text-muted hover:text-accent transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="flex items-center gap-6">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-[12px] tracking-[0.1em] uppercase text-muted bg-transparent cursor-pointer hover:text-foreground transition-colors appearance-none pr-4"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1 ${viewMode === "grid" ? "text-foreground" : "text-muted"}`}
              aria-label="Grid view"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="0" y="0" width="7" height="7" />
                <rect x="9" y="0" width="7" height="7" />
                <rect x="0" y="9" width="7" height="7" />
                <rect x="9" y="9" width="7" height="7" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("editorial")}
              className={`p-1 ${viewMode === "editorial" ? "text-foreground" : "text-muted"}`}
              aria-label="Editorial view"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="0" y="0" width="7" height="16" />
                <rect x="9" y="0" width="7" height="16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8 md:mb-12 space-y-6 overflow-hidden"
        >
          <div>
            <h3 className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted mb-3">
              Size
            </h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                  className={`px-3 py-1.5 text-[11px] tracking-wider border transition-colors ${
                    selectedSize === size
                      ? "border-accent text-accent"
                      : "border-border text-muted hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted mb-3">
              Collection
            </h3>
            <div className="flex flex-wrap gap-2">
              {collectionOptions.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedCollection(selectedCollection === col ? null : col)}
                  className={`px-3 py-1.5 text-[11px] tracking-wider border transition-colors ${
                    selectedCollection === col
                      ? "border-accent text-accent"
                      : "border-border text-muted hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Products */}
      <div
        className={`grid gap-x-5 gap-y-10 md:gap-y-14 ${
          viewMode === "editorial"
            ? "grid-cols-2 md:grid-cols-2 md:gap-x-8"
            : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6"
        }`}
      >
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          >
            <ProductCard product={product} priority={i < 4} />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[14px] text-muted">No products match your filters.</p>
          <button
            onClick={clearFilters}
            className="mt-4 text-[12px] tracking-[0.1em] uppercase text-accent hover:text-foreground transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
