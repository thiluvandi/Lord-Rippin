"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";

export default function SearchPage() {
  const { setSearchOpen } = useStore();

  useEffect(() => {
    setSearchOpen(true);
  }, [setSearchOpen]);

  return (
    <div className="max-w-[560px] mx-auto px-6 py-20 text-center">
      <p className="text-[13px] text-muted">
        Use the search overlay to find products.
      </p>
    </div>
  );
}
