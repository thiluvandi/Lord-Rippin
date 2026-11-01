"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/data/products";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useStore();

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-12 md:py-20">
      <h1 className="text-[28px] md:text-[36px] font-light tracking-tight mb-2">
        Wishlist
      </h1>
      <p className="text-[11px] font-mono tracking-[0.2em] text-muted mb-10 md:mb-14">
        {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
      </p>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[14px] text-muted mb-6">Your wishlist is empty.</p>
          <Link
            href="/shop"
            className="inline-block bg-foreground text-white px-8 py-3.5 text-[12px] tracking-[0.15em] uppercase hover:bg-accent transition-colors"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-6 md:gap-y-14">
          {wishlist.map((item) => (
            <div key={item.productId} className="group">
              <Link href={`/product/${item.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-[#f5f5f5] mb-4 rounded-xl">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </Link>
              <h3 className="text-[13px] tracking-[0.05em] uppercase group-hover:text-accent transition-colors">
                {item.name}
              </h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[13px] font-mono text-muted">{formatPrice(item.price)}</span>
                <button
                  onClick={() => removeFromWishlist(item.productId)}
                  className="text-[11px] tracking-[0.1em] uppercase text-muted hover:text-accent transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
