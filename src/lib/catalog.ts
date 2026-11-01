import { products as localProducts, type Product, type ProductVariant } from "@/data/products";
import { shopifyEnabled, storefront } from "@/lib/shopify";

interface LiveVariant {
  id: string;
  availableForSale: boolean;
  price: { amount: string };
  compareAtPrice: { amount: string } | null;
  selectedOptions: { name: string; value: string }[];
}

interface LiveProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags: string[];
  images: { nodes: { url: string }[] };
  variants: { nodes: LiveVariant[] };
}

const QUERY = `{
  products(first: 100) {
    nodes {
      id handle title description tags
      images(first: 10) { nodes { url } }
      variants(first: 100) {
        nodes {
          id availableForSale
          price { amount }
          compareAtPrice { amount }
          selectedOptions { name value }
        }
      }
    }
  }
}`;

const opt = (v: LiveVariant, name: string) =>
  v.selectedOptions.find((o) => o.name === name)?.value ?? "";

const tagValue = (tags: string[], key: string) =>
  tags.find((t) => t.startsWith(`${key}:`))?.slice(key.length + 1);

function fromLiveOnly(lp: LiveProduct): Product {
  const first = lp.variants.nodes[0];
  const colors = [...new Set(lp.variants.nodes.map((v) => opt(v, "Color")))];
  const images = lp.images.nodes.map((i) => i.url);
  return {
    id: lp.id,
    slug: lp.handle,
    name: lp.title,
    price: Number(first.price.amount),
    comparePrice: first.compareAtPrice ? Number(first.compareAtPrice.amount) : undefined,
    description: lp.description,
    collection: tagValue(lp.tags, "collection") ?? "Essentials",
    drop: "",
    dropNumber: tagValue(lp.tags, "drop") ?? "",
    category: "T-Shirts",
    tags: lp.tags,
    isNew: lp.tags.includes("new"),
    isBestseller: lp.tags.includes("bestseller"),
    fabric: "100% Premium Combed Cotton",
    gsm: 240,
    fit: "Relaxed Oversized",
    care: [],
    modelInfo: "",
    details: [],
    variants: colors.map((color) => ({
      color,
      colorHex: "#2a2a2a",
      images,
      sizes: lp.variants.nodes
        .filter((v) => opt(v, "Color") === color)
        .map((v) => ({ size: opt(v, "Size"), inStock: v.availableForSale, variantId: v.id })),
    })),
  };
}

function overlay(local: Product, lp: LiveProduct): Product {
  const first = lp.variants.nodes[0];
  return {
    ...local,
    name: lp.title,
    price: Number(first.price.amount),
    comparePrice: first.compareAtPrice ? Number(first.compareAtPrice.amount) : local.comparePrice,
    variants: local.variants.map((v): ProductVariant => ({
      ...v,
      sizes: v.sizes.map((s) => {
        const live = lp.variants.nodes.find((x) => opt(x, "Color") === v.color && opt(x, "Size") === s.size);
        return live ? { ...s, inStock: live.availableForSale, variantId: live.id } : s;
      }),
    })),
  };
}

export async function getCatalog(): Promise<Product[]> {
  if (!shopifyEnabled) return localProducts;
  try {
    const data = await storefront<{ products: { nodes: LiveProduct[] } }>(QUERY, {}, { cache: true });
    const live = data.products.nodes.filter((p) => p.variants.nodes.length > 0);
    if (live.length === 0) return localProducts;
    const bySlug = new Map(localProducts.map((p) => [p.slug, p]));
    const merged = live.map((lp) => {
      const local = bySlug.get(lp.handle);
      return local ? overlay(local, lp) : fromLiveOnly(lp);
    });
    const order = new Map(localProducts.map((p, i) => [p.slug, i]));
    return merged.sort((a, b) => (order.get(a.slug) ?? 999) - (order.get(b.slug) ?? 999));
  } catch {
    return localProducts;
  }
}
