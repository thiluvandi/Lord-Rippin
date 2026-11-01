"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { formatPrice, type Product } from "@/data/products";
import { useStore } from "@/lib/store";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useStore();
  const variant = product.variants[0];
  const hasSecondImage = variant.images.length > 1;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const availableSize = variant.sizes.find((s) => s.inStock);
    if (availableSize) {
      addToCart({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        color: variant.color,
        size: availableSize.size,
        price: product.price,
        image: variant.images[0],
      });
    }
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5] mb-4 rounded-xl">
        <Image
          src={variant.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-all duration-500 ${
            isHovered && hasSecondImage ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
          priority={priority}
        />
        {hasSecondImage && (
          <Image
            src={variant.images[1]}
            alt={`${product.name} alternate`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-500 absolute inset-0 ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          />
        )}

        {product.isNew && (
          <span className="absolute top-3 left-3 text-[10px] font-mono tracking-[0.15em] uppercase text-accent">
            New
          </span>
        )}

        <button
          onClick={handleQuickAdd}
          className={`absolute bottom-3 right-3 text-[11px] tracking-[0.1em] uppercase text-muted hover:text-accent transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          Quick Add +
        </button>
      </div>

      <div className="space-y-1">
        <h3 className="text-[13px] tracking-[0.05em] uppercase text-foreground group-hover:text-accent transition-colors duration-200">
          {product.name}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-mono text-muted">
            {formatPrice(product.price)}
          </span>
          <span className="text-[11px] text-muted/60 tracking-wider">
            {variant.color}
          </span>
        </div>
      </div>
    </Link>
  );
}
