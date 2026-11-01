"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { getProductBySlug, products, formatPrice } from "@/data/products";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useStore();

  const variant = product.variants[selectedVariant];
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      color: variant.color,
      size: selectedSize,
      price: product.price,
      image: variant.images[0],
    });
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: variant.images[0],
        color: variant.color,
      });
    }
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.collection === product.collection)
    .slice(0, 4);

  const accordions = [
    {
      id: "details",
      title: "Product Details",
      content: product.details.join("\n"),
    },
    {
      id: "fit",
      title: "Fit & Size",
      content: `${product.fit}\n\n${product.modelInfo}\n\nFor specific measurements, check our size guide.`,
    },
    {
      id: "fabric",
      title: "Fabric & Care",
      content: `${product.fabric}\n${product.gsm} GSM\n\n${product.care.join("\n")}`,
    },
    {
      id: "shipping",
      title: "Shipping & Returns",
      content: "Free shipping on orders above ₹3,999.\nStandard delivery: 5–7 business days.\nExpress delivery: 2–3 business days.\n\n15-day easy returns.\nFree size exchanges.",
    },
  ];

  return (
    <>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Image gallery */}
          <div className="md:col-span-7 lg:col-span-8">
            <div className="space-y-3">
              {variant.images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative aspect-[3/4] bg-[#f5f5f5] overflow-hidden cursor-pointer rounded-xl"
                  onClick={() => setSelectedImage(i)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority={i === 0}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-28">
              <p className="text-[11px] font-mono tracking-[0.2em] text-muted mb-3">
                Drop {product.dropNumber} / {product.collection}
              </p>

              <h1 className="text-[24px] md:text-[28px] font-light tracking-tight">
                {product.name}
              </h1>

              <p className="text-[16px] font-mono mt-3">{formatPrice(product.price)}</p>
              <p className="text-[11px] text-muted mt-1">Inclusive of all taxes.</p>

              {/* Color */}
              <div className="mt-8">
                <p className="text-[11px] tracking-[0.15em] uppercase text-muted mb-3">
                  Colour &mdash; {variant.color}
                </p>
                <div className="flex gap-2">
                  {product.variants.map((v, i) => (
                    <button
                      key={v.color}
                      onClick={() => {
                        setSelectedVariant(i);
                        setSelectedImage(0);
                        setSelectedSize(null);
                      }}
                      className={`w-8 h-8 border transition-colors ${
                        selectedVariant === i ? "border-foreground" : "border-border hover:border-muted"
                      }`}
                      style={{ backgroundColor: v.colorHex }}
                      aria-label={v.color}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] tracking-[0.15em] uppercase text-muted">
                    Select Size
                  </p>
                  <Link
                    href="/size-guide"
                    className="text-[11px] font-mono tracking-wider text-muted hover:text-accent transition-colors"
                  >
                    Size Guide &nearr;
                  </Link>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {variant.sizes.map((s) => (
                    <button
                      key={s.size}
                      onClick={() => s.inStock && setSelectedSize(s.size)}
                      disabled={!s.inStock}
                      className={`py-2.5 text-[12px] tracking-wider border transition-colors ${
                        selectedSize === s.size
                          ? "border-foreground bg-foreground text-white"
                          : s.inStock
                          ? "border-border text-foreground hover:border-foreground"
                          : "border-border/50 text-muted/30 cursor-not-allowed line-through"
                      }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to bag */}
              <div className="mt-8 flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`flex-1 py-3.5 text-[12px] tracking-[0.15em] uppercase transition-colors duration-300 ${
                    selectedSize
                      ? "bg-foreground text-white hover:bg-accent"
                      : "bg-border text-muted cursor-not-allowed"
                  }`}
                >
                  {selectedSize
                    ? `Add to Bag — ${formatPrice(product.price)}`
                    : "Select a Size"}
                </button>
                <button
                  onClick={handleWishlist}
                  className={`w-12 border transition-colors ${
                    inWishlist ? "border-accent text-accent" : "border-border text-muted hover:border-foreground hover:text-foreground"
                  }`}
                  aria-label="Wishlist"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className="mx-auto">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {/* Product specs */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {[
                  `${product.gsm} GSM ${product.fabric.split(" ").pop()}`,
                  product.fit,
                  "Pre-Shrunk",
                  "Made Locally",
                ].map((spec) => (
                  <span key={spec} className="text-[11px] font-mono tracking-[0.1em] text-muted uppercase">
                    {spec}
                  </span>
                ))}
              </div>

              {/* Model info */}
              <p className="text-[11px] text-muted mt-6 font-mono tracking-wider">
                {product.modelInfo}
              </p>

              {/* Accordions */}
              <div className="mt-10 border-t border-border">
                {accordions.map((acc) => (
                  <div key={acc.id} className="border-b border-border">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                      className="w-full flex items-center justify-between py-4 text-left"
                    >
                      <span className="text-[12px] tracking-[0.1em] uppercase">
                        {acc.title}
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className={`text-muted transition-transform ${
                          openAccordion === acc.id ? "rotate-45" : ""
                        }`}
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                    {openAccordion === acc.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="pb-4 overflow-hidden"
                      >
                        <p className="text-[13px] text-muted leading-relaxed whitespace-pre-line">
                          {acc.content}
                        </p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-24 border-t border-border">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <h2 className="text-[22px] md:text-[28px] font-light tracking-tight mb-10 md:mb-14">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 md:hidden z-30">
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className={`w-full py-3.5 text-[12px] tracking-[0.15em] uppercase transition-colors ${
            selectedSize
              ? "bg-foreground text-white active:bg-accent"
              : "bg-border text-muted"
          }`}
        >
          {selectedSize
            ? `Add to Bag — ${formatPrice(product.price)}`
            : "Select a Size"}
        </button>
      </div>
    </>
  );
}
