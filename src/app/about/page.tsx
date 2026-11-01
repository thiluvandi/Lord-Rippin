"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden -mt-[72px] rounded-b-2xl">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=90"
          alt="About Lord Rippin'"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-[36px] md:text-[56px] lg:text-[72px] font-light text-white tracking-tight leading-[1.05]">
            Our Story
          </h1>
          <p className="text-[11px] font-mono tracking-[0.2em] text-white/50 mt-4">
            Est. 2026
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-32">
        <div className="max-w-[720px] mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="space-y-8">
            <p className="text-[18px] md:text-[22px] font-light leading-relaxed">
              Lord Rippin&apos; started with a simple idea: make the T-shirt
              you&apos;d reach for every single time. Not the cheapest one. Not
              the loudest one. The one that fits right, feels right, and looks
              like you meant it.
            </p>

            <p className="text-[15px] text-muted leading-relaxed">
              We&apos;re an independent clothing label. Every piece
              we make uses 220&ndash;240 GSM premium
              combed cotton, pre-shrunk and built to hold its shape wash
              after wash. Our graphics are high-density screen printed
              &mdash; no shortcuts, no transfers, no compromise.
            </p>

            <p className="text-[15px] text-muted leading-relaxed">
              We release in drops, not seasons. Each drop is a focused
              collection with its own identity, palette and story. Once
              it&apos;s gone, it&apos;s gone.
            </p>

            <p className="text-[15px] text-muted leading-relaxed">
              We don&apos;t chase trends. We don&apos;t flood the market.
              We don&apos;t sell with fake markdowns. We make pieces worth
              paying for and price them honestly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-panel">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <motion.h2
            {...fadeUp}
            className="text-[24px] md:text-[32px] font-light tracking-tight text-center mb-16"
          >
            What We Stand For
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                number: "01",
                title: "Quality Over Quantity",
                text: "240 GSM premium cotton. Pre-shrunk. High-density prints. We make fewer pieces and make them better.",
              },
              {
                number: "02",
                title: "Honest Pricing",
                text: "No inflated MRPs. No permanent sales. The price you see reflects the actual value of what you're getting.",
              },
              {
                number: "03",
                title: "Independently Made",
                text: "Every design, every decision, every piece originates in our studio. We're proudly independent and locally rooted.",
              },
            ].map((value) => (
              <motion.div key={value.number} {...fadeUp}>
                <span className="text-[11px] font-mono tracking-[0.2em] text-accent">
                  {value.number}
                </span>
                <h3 className="text-[16px] tracking-wide mt-3 mb-3">
                  {value.title}
                </h3>
                <p className="text-[13px] text-muted leading-relaxed">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fabric */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div {...fadeUp} className="relative aspect-square bg-[#f5f5f5] overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1000&q=90"
                alt="Fabric closeup"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div {...fadeUp}>
              <h2 className="text-[24px] md:text-[32px] font-light tracking-tight mb-8">
                The Fabric
              </h2>
              <div className="space-y-6">
                {[
                  { label: "Weight", value: "220–240 GSM" },
                  { label: "Material", value: "100% Premium Combed Cotton" },
                  { label: "Treatment", value: "Pre-Shrunk, Garment-Dyed" },
                  { label: "Print", value: "High-Density Screen Print" },
                  { label: "Construction", value: "Drop Shoulder, Double-Needle Stitching" },
                  { label: "Fit", value: "Relaxed Oversized" },
                ].map((spec) => (
                  <div key={spec.label} className="flex items-start gap-6">
                    <span className="text-[11px] font-mono tracking-[0.15em] text-muted uppercase w-28 flex-shrink-0 pt-0.5">
                      {spec.label}
                    </span>
                    <span className="text-[14px]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="py-24 md:py-40">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-[28px] md:text-[44px] font-light tracking-tight leading-[1.2]">
              We don&apos;t make clothes for everyone.
              <br />
              <span className="text-muted">We make them for the ones who care.</span>
            </h2>
          </motion.div>
        </div>
      </section>
    </>
  );
}
