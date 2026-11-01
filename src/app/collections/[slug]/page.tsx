"use client";

import { use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { collections, getProductsByCollection } from "@/data/products";
import { useCatalog } from "@/lib/catalog-context";

export default function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) notFound();

  const catalog = useCatalog();
  const collectionProducts = getProductsByCollection(collection.name, catalog);

  return (
    <>
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden -mt-[72px] rounded-b-2xl">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-[11px] font-mono tracking-[0.25em] text-accent mb-3">
            {collection.number}
          </span>
          <h1 className="text-[36px] md:text-[56px] font-light text-white tracking-tight uppercase">
            {collection.name}
          </h1>
          <p className="text-[13px] text-white/60 mt-4 max-w-[400px]">
            {collection.description}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <p className="text-[11px] font-mono tracking-[0.2em] text-muted mb-10 md:mb-14">
            {collectionProducts.length} Pieces
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-6 md:gap-y-14">
            {collectionProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <ProductCard product={product} priority={i < 4} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
