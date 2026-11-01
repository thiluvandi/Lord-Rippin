"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { getProductsByDrop, drops } from "@/data/products";
import { useCatalog } from "@/lib/catalog-context";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export default function DropPage() {
  const currentDrop = drops[0];
  const catalog = useCatalog();
  const dropProducts = getProductsByDrop(currentDrop.number, catalog);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[80vh] overflow-hidden -mt-[72px] rounded-b-2xl">
        <Image
          src={currentDrop.image}
          alt={`Drop ${currentDrop.number}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[11px] font-mono tracking-[0.25em] text-accent mb-4">
            Drop {currentDrop.number} / {currentDrop.year}
          </p>
          <h1 className="text-[40px] md:text-[64px] lg:text-[80px] font-light text-white tracking-tight leading-[1.05] uppercase">
            {currentDrop.name}
          </h1>
          <p className="text-[13px] text-white/60 mt-6 max-w-[400px] leading-relaxed">
            {currentDrop.description}
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="mb-12 md:mb-16">
            <h2 className="text-[28px] md:text-[36px] font-light tracking-tight">
              The Collection
            </h2>
            <p className="text-[11px] font-mono tracking-[0.2em] text-muted mt-2">
              {dropProducts.length} Pieces
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-6 md:gap-y-14">
            {dropProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <ProductCard product={product} priority={i < 4} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other drops */}
      {drops.length > 1 && (
        <section className="py-16 md:py-24 border-t border-border">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <h2 className="text-[22px] md:text-[28px] font-light tracking-tight mb-10">
              Past Drops
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {drops.slice(1).map((drop) => (
                <div key={drop.id} className="relative aspect-[16/9] bg-[#f5f5f5] overflow-hidden group rounded-xl">
                  <Image
                    src={drop.image}
                    alt={`Drop ${drop.number}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute bottom-6 left-6">
                    <span className="text-[11px] font-mono tracking-[0.2em] text-accent block mb-1">
                      Drop {drop.number}
                    </span>
                    <h3 className="text-[22px] font-light text-white uppercase tracking-wide">
                      {drop.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
