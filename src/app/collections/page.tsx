"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { collections } from "@/data/products";

export default function CollectionsPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-12 md:py-20">
      <div className="mb-12 md:mb-16">
        <h1 className="text-[28px] md:text-[40px] font-light tracking-tight">
          Collections
        </h1>
        <p className="text-[11px] font-mono tracking-[0.2em] text-muted mt-2">
          {collections.length} Collections
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {collections.map((collection, i) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link
              href={`/collections/${collection.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden bg-[#f5f5f5] rounded-xl"
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
              <div className="absolute bottom-8 left-8">
                <span className="text-[11px] font-mono tracking-[0.2em] text-accent block mb-2">
                  {collection.number}
                </span>
                <h2 className="text-[26px] md:text-[32px] font-light text-white tracking-wide uppercase">
                  {collection.name}
                </h2>
                <p className="text-[13px] text-white/60 mt-2 max-w-[300px]">
                  {collection.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
