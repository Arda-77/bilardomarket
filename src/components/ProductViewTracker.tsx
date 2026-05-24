"use client";

import { useEffect } from "react";
import type { Product } from "@/lib/products";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";

export default function ProductViewTracker({ product }: { product: Product }) {
  const { track } = useRecentlyViewed();
  useEffect(() => {
    track(product);
  }, [product, track]);
  return null;
}
