"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { getNewProducts, getBestsellers, collections } from "@/data/products";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export default function HomePage() {
  const newProducts = getNewProducts().slice(0, 4);
  const bestsellers = getBestsellers();

  return (
    <>
      {/* HERO */}
      <section className="relative h-[100vh] -mt-[72px] overflow-hidden rounded-b-2xl">
        <Image
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=90"
          alt="Lord Rippin' Drop 001 Campaign"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        <div className="absolute bottom-12 md:bottom-20 left-6 md:left-10 max-w-xl">
          <p className="text-[11px] font-mono tracking-[0.2em] text-white/60 mb-4">
            Drop 001 / 2026
          </p>
          <h2 className="text-[36px] md:text-[56px] lg:text-[64px] font-light text-white leading-[1.05] tracking-tight">
            Made to be
            <br />
            worn differently.
          </h2>
          <p className="text-[13px] text-white/60 mt-5 leading-relaxed max-w-[340px]">
            Premium heavyweight cotton. Made to last.
          </p>
          <Link
            href="/drop"
            className="inline-flex items-center gap-2 mt-8 text-[12px] tracking-[0.12em] uppercase text-white hover:text-accent transition-colors group"
          >
            Explore the Drop
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform group-hover:translate-x-1"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-white/30"
          />
        </div>
      </section>

      {/* LATEST DROP */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <h2 className="text-[28px] md:text-[36px] font-light tracking-tight">
                Latest Drop
              </h2>
              <p className="text-[11px] font-mono tracking-[0.2em] text-muted mt-2">
                Drop 001 / 2026
              </p>
            </div>
            <Link
              href="/drop"
              className="hidden md:inline-flex items-center gap-1.5 text-[12px] tracking-[0.1em] uppercase text-muted hover:text-accent transition-colors group"
            >
              View the Drop
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-6 md:gap-y-14">
            {newProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <ProductCard product={product} priority={i < 2} />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              href="/drop"
              className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.1em] uppercase text-muted hover:text-accent transition-colors"
            >
              View the Drop &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CAMPAIGN EDITORIAL */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden rounded-2xl mx-6 md:mx-10">
        <Image
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=90"
          alt="Campaign"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <motion.div
          {...fadeUp}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <h2 className="text-[36px] md:text-[56px] lg:text-[72px] font-light text-white tracking-tight leading-[1.05]">
            Not made
            <br />
            for everyone.
          </h2>
          <p className="text-[11px] font-mono tracking-[0.2em] text-white/50 mt-6">
            Drop 001 / 2026
          </p>
        </motion.div>
      </section>

      {/* SHOP BY COLLECTION */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <motion.h2
            {...fadeUp}
            className="text-[28px] md:text-[36px] font-light tracking-tight mb-12 md:mb-16"
          >
            Collections
          </motion.h2>

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
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute bottom-6 left-6">
                    <span className="text-[11px] font-mono tracking-[0.2em] text-accent mb-2 block">
                      {collection.number}
                    </span>
                    <h3 className="text-[22px] md:text-[26px] font-light text-white tracking-wide uppercase">
                      {collection.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT QUALITY */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <motion.div {...fadeUp} className="md:col-span-7 relative aspect-[4/3] bg-[#f5f5f5] overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&q=90"
                alt="Fabric detail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </motion.div>

            <motion.div {...fadeUp} className="md:col-span-5 md:pl-4">
              <h2 className="text-[28px] md:text-[36px] font-light tracking-tight leading-tight">
                Heavyweight.
                <br />
                Without the weight.
              </h2>
              <div className="mt-8 space-y-4">
                {[
                  "240 GSM Premium Cotton",
                  "Pre-Shrunk",
                  "Relaxed Oversized Fit",
                  "High-Density Screen Print",
                  "Designed Locally",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />
                    <span className="text-[12px] font-mono tracking-[0.1em] uppercase text-muted">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 mt-10 text-[12px] tracking-[0.1em] uppercase text-foreground hover:text-accent transition-colors group"
              >
                Discover the Fabric
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="mb-12 md:mb-16">
            <h2 className="text-[28px] md:text-[36px] font-light tracking-tight">
              Most Worn
            </h2>
            <p className="text-[13px] text-muted mt-2">
              The ones that keep coming back.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-6 md:gap-y-14">
            {bestsellers.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="py-24 md:py-40">
        <div className="max-w-[960px] mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-[28px] md:text-[44px] lg:text-[56px] font-light tracking-tight leading-[1.15]">
              We don&apos;t make basics.
              <br />
              <span className="text-muted">
                We make the pieces
                <br />
                you build a look around.
              </span>
            </h2>
            <p className="text-[11px] font-mono tracking-[0.2em] text-muted/60 mt-10 uppercase">
              Independent Clothing Label.
            </p>
          </motion.div>
        </div>
      </section>

      {/* LOOKBOOK */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <motion.h2
            {...fadeUp}
            className="text-[28px] md:text-[36px] font-light tracking-tight mb-12 md:mb-16"
          >
            Seen Outside.
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[
              { src: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=85", aspect: "aspect-[3/4]" },
              { src: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=85", aspect: "aspect-square" },
              { src: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=600&q=85", aspect: "aspect-[3/4]" },
              { src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=85", aspect: "aspect-square" },
              { src: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=85", aspect: "aspect-[3/4]" },
              { src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=85", aspect: "aspect-square" },
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`relative overflow-hidden bg-[#f5f5f5] rounded-xl ${img.aspect}`}
              >
                <Image
                  src={img.src}
                  alt="Lookbook"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </div>

          <p className="text-[11px] font-mono tracking-[0.2em] text-muted/40 mt-6 text-center">
            @lordrippin
          </p>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-24 md:py-40">
        <div className="max-w-[560px] mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-[28px] md:text-[36px] font-light tracking-tight">
              Get access
              <br />
              before everyone else.
            </h2>
            <p className="text-[13px] text-muted mt-4 leading-relaxed">
              Drops. Restocks. Nothing unnecessary.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-10 flex items-center gap-0 border-b border-foreground"
            >
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 py-3 text-[14px] tracking-wide bg-transparent placeholder:text-muted/40 focus:placeholder:text-muted/20"
                required
              />
              <button
                type="submit"
                className="text-muted hover:text-accent transition-colors px-2 py-3"
                aria-label="Join"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
