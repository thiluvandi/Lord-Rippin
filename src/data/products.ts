export interface ProductVariant {
  color: string;
  colorHex: string;
  sizes: {
    size: string;
    inStock: boolean;
    variantId?: string;
  }[];
  images: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  comparePrice?: number;
  description: string;
  collection: string;
  drop: string;
  dropNumber: string;
  category: string;
  tags: string[];
  isNew: boolean;
  isBestseller: boolean;
  fabric: string;
  gsm: number;
  fit: string;
  care: string[];
  variants: ProductVariant[];
  modelInfo: string;
  details: string[];
}

export const products: Product[] = [
  {
    id: "1",
    slug: "after-hours-tee",
    name: "After Hours Tee",
    price: 2199,
    description: "A heavyweight statement piece for when the city quiets down. Bold graphic meets premium cotton.",
    collection: "Graphics",
    drop: "After Hours",
    dropNumber: "001",
    category: "Graphic Tees",
    tags: ["graphic", "oversized", "heavyweight"],
    isNew: true,
    isBestseller: true,
    fabric: "100% Premium Combed Cotton",
    gsm: 240,
    fit: "Relaxed Oversized",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Iron inside out"],
    variants: [
      {
        color: "Washed Black",
        colorHex: "#2a2a2a",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: false },
        ],
        images: [
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=90",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=90",
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=90",
          "https://images.unsplash.com/photo-1503341504253-dff4f94032fc?w=800&q=90",
        ],
      },
      {
        color: "Bone",
        colorHex: "#e8e0d8",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: true },
        ],
        images: [
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=90",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=90",
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=90",
        ],
      },
    ],
    modelInfo: "Model is 6'0\" / 183cm, wearing size L",
    details: [
      "High-density screen print",
      "Ribbed crew neck",
      "Drop shoulder construction",
      "Double-needle stitching",
      "Pre-shrunk fabric",
      "Designed Locally",
    ],
  },
  {
    id: "2",
    slug: "no-signal-tee",
    name: "No Signal Tee",
    price: 2299,
    description: "Disconnect to reconnect. Minimal graphic on premium heavyweight cotton.",
    collection: "Graphics",
    drop: "After Hours",
    dropNumber: "001",
    category: "Graphic Tees",
    tags: ["graphic", "oversized", "minimal"],
    isNew: true,
    isBestseller: false,
    fabric: "100% Premium Combed Cotton",
    gsm: 240,
    fit: "Relaxed Oversized",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Iron inside out"],
    variants: [
      {
        color: "Washed Black",
        colorHex: "#2a2a2a",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: true },
        ],
        images: [
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=90",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=90",
          "https://images.unsplash.com/photo-1503341504253-dff4f94032fc?w=800&q=90",
        ],
      },
      {
        color: "Ash Grey",
        colorHex: "#8a8a8a",
        sizes: [
          { size: "XS", inStock: false },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: true },
        ],
        images: [
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=90",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=90",
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=90",
        ],
      },
    ],
    modelInfo: "Model is 5'11\" / 180cm, wearing size M",
    details: [
      "High-density screen print",
      "Ribbed crew neck",
      "Drop shoulder construction",
      "Double-needle stitching",
      "Pre-shrunk fabric",
      "Designed Locally",
    ],
  },
  {
    id: "3",
    slug: "archive-001-tee",
    name: "Archive 001 Tee",
    price: 2099,
    description: "From the archives. Clean typography meets heavyweight construction.",
    collection: "Archive",
    drop: "After Hours",
    dropNumber: "001",
    category: "Graphic Tees",
    tags: ["archive", "typography", "oversized"],
    isNew: true,
    isBestseller: false,
    fabric: "100% Premium Combed Cotton",
    gsm: 240,
    fit: "Relaxed Oversized",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Iron inside out"],
    variants: [
      {
        color: "Bone",
        colorHex: "#e8e0d8",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: true },
        ],
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=90",
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=90",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
        ],
      },
      {
        color: "Black",
        colorHex: "#171717",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: false },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: true },
        ],
        images: [
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=90",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=90",
        ],
      },
    ],
    modelInfo: "Model is 6'0\" / 183cm, wearing size L",
    details: [
      "Embossed logo detail",
      "Ribbed crew neck",
      "Drop shoulder construction",
      "Double-needle stitching",
      "Pre-shrunk fabric",
      "Designed Locally",
    ],
  },
  {
    id: "4",
    slug: "out-of-frame-tee",
    name: "Out of Frame Tee",
    price: 2199,
    description: "Break the frame. Oversized fit with a deconstructed graphic print.",
    collection: "Graphics",
    drop: "After Hours",
    dropNumber: "001",
    category: "Graphic Tees",
    tags: ["graphic", "deconstructed", "oversized"],
    isNew: true,
    isBestseller: true,
    fabric: "100% Premium Combed Cotton",
    gsm: 240,
    fit: "Relaxed Oversized",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Iron inside out"],
    variants: [
      {
        color: "Charcoal",
        colorHex: "#4a4a4a",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: true },
        ],
        images: [
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=90",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=90",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=90",
        ],
      },
      {
        color: "Off White",
        colorHex: "#f5f0eb",
        sizes: [
          { size: "XS", inStock: false },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: false },
        ],
        images: [
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=90",
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=90",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=90",
        ],
      },
    ],
    modelInfo: "Model is 5'10\" / 178cm, wearing size M",
    details: [
      "High-density screen print",
      "Ribbed crew neck",
      "Drop shoulder construction",
      "Double-needle stitching",
      "Pre-shrunk fabric",
      "Designed Locally",
    ],
  },
  {
    id: "5",
    slug: "static-essential-tee",
    name: "Static Essential Tee",
    price: 1999,
    description: "The foundation piece. Clean, heavyweight, built for every day.",
    collection: "Essentials",
    drop: "Static",
    dropNumber: "002",
    category: "Essentials",
    tags: ["essential", "minimal", "everyday"],
    isNew: false,
    isBestseller: true,
    fabric: "100% Premium Combed Cotton",
    gsm: 220,
    fit: "Relaxed",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low"],
    variants: [
      {
        color: "Black",
        colorHex: "#171717",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: true },
        ],
        images: [
          "https://images.unsplash.com/photo-1503341504253-dff4f94032fc?w=800&q=90",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=90",
        ],
      },
      {
        color: "White",
        colorHex: "#ffffff",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: true },
        ],
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=90",
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=90",
          "https://images.unsplash.com/photo-1503341504253-dff4f94032fc?w=800&q=90",
        ],
      },
      {
        color: "Sage",
        colorHex: "#a2b5a0",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: false },
          { size: "XXL", inStock: false },
        ],
        images: [
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=90",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=90",
        ],
      },
    ],
    modelInfo: "Model is 6'0\" / 183cm, wearing size L",
    details: [
      "Garment-dyed finish",
      "Ribbed crew neck",
      "Regular shoulder",
      "Double-needle stitching",
      "Pre-shrunk fabric",
      "Designed Locally",
    ],
  },
  {
    id: "6",
    slug: "nightshift-tee",
    name: "Nightshift Tee",
    price: 2199,
    description: "For the late-night creatives. Reflective ink detail on premium cotton.",
    collection: "After Dark",
    drop: "After Hours",
    dropNumber: "001",
    category: "Graphic Tees",
    tags: ["graphic", "reflective", "nightwear"],
    isNew: true,
    isBestseller: false,
    fabric: "100% Premium Combed Cotton",
    gsm: 240,
    fit: "Relaxed Oversized",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Iron inside out"],
    variants: [
      {
        color: "Black",
        colorHex: "#171717",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: true },
        ],
        images: [
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=90",
          "https://images.unsplash.com/photo-1503341504253-dff4f94032fc?w=800&q=90",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
        ],
      },
    ],
    modelInfo: "Model is 5'11\" / 180cm, wearing size L",
    details: [
      "Reflective ink screen print",
      "Ribbed crew neck",
      "Drop shoulder construction",
      "Double-needle stitching",
      "Pre-shrunk fabric",
      "Designed Locally",
    ],
  },
  {
    id: "7",
    slug: "shadow-type-tee",
    name: "Shadow Type Tee",
    price: 2099,
    description: "Typography as texture. Layered type study on a clean silhouette.",
    collection: "Graphics",
    drop: "Static",
    dropNumber: "002",
    category: "Graphic Tees",
    tags: ["typography", "graphic", "oversized"],
    isNew: false,
    isBestseller: true,
    fabric: "100% Premium Combed Cotton",
    gsm: 240,
    fit: "Relaxed Oversized",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Iron inside out"],
    variants: [
      {
        color: "Charcoal",
        colorHex: "#4a4a4a",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: true },
        ],
        images: [
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=90",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=90",
        ],
      },
      {
        color: "Cream",
        colorHex: "#f0e8dc",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: false },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: true },
        ],
        images: [
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=90",
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=90",
        ],
      },
    ],
    modelInfo: "Model is 6'1\" / 185cm, wearing size L",
    details: [
      "High-density screen print",
      "Ribbed crew neck",
      "Drop shoulder construction",
      "Double-needle stitching",
      "Pre-shrunk fabric",
      "Designed Locally",
    ],
  },
  {
    id: "8",
    slug: "frequency-tee",
    name: "Frequency Tee",
    price: 2299,
    description: "Tune in. Waveform graphic with puff print detail.",
    collection: "After Dark",
    drop: "After Hours",
    dropNumber: "001",
    category: "Graphic Tees",
    tags: ["graphic", "puff-print", "oversized"],
    isNew: true,
    isBestseller: false,
    fabric: "100% Premium Combed Cotton",
    gsm: 240,
    fit: "Relaxed Oversized",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Iron inside out"],
    variants: [
      {
        color: "Washed Black",
        colorHex: "#2a2a2a",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: true },
        ],
        images: [
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=90",
          "https://images.unsplash.com/photo-1503341504253-dff4f94032fc?w=800&q=90",
        ],
      },
    ],
    modelInfo: "Model is 5'11\" / 180cm, wearing size M",
    details: [
      "Puff print detail",
      "High-density screen print",
      "Ribbed crew neck",
      "Drop shoulder construction",
      "Double-needle stitching",
      "Pre-shrunk fabric",
      "Designed Locally",
    ],
  },
  {
    id: "9",
    slug: "blank-canvas-tee",
    name: "Blank Canvas Tee",
    price: 1999,
    description: "The perfect blank. Premium weight, perfect fit, zero compromise.",
    collection: "Essentials",
    drop: "Static",
    dropNumber: "002",
    category: "Essentials",
    tags: ["essential", "blank", "heavyweight"],
    isNew: false,
    isBestseller: true,
    fabric: "100% Premium Combed Cotton",
    gsm: 220,
    fit: "Relaxed",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low"],
    variants: [
      {
        color: "Off White",
        colorHex: "#f5f0eb",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: true },
        ],
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=90",
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=90",
        ],
      },
      {
        color: "Black",
        colorHex: "#171717",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: true },
        ],
        images: [
          "https://images.unsplash.com/photo-1503341504253-dff4f94032fc?w=800&q=90",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
        ],
      },
      {
        color: "Navy",
        colorHex: "#1a1a3e",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: false },
        ],
        images: [
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=90",
          "https://images.unsplash.com/photo-1503341504253-dff4f94032fc?w=800&q=90",
        ],
      },
    ],
    modelInfo: "Model is 6'0\" / 183cm, wearing size L",
    details: [
      "Garment-dyed finish",
      "Ribbed crew neck",
      "Regular shoulder",
      "Double-needle stitching",
      "Pre-shrunk fabric",
      "Designed Locally",
    ],
  },
  {
    id: "10",
    slug: "ctrl-alt-tee",
    name: "Ctrl+Alt Tee",
    price: 2199,
    description: "Reset everything. Digital culture meets heavyweight cotton.",
    collection: "Graphics",
    drop: "Static",
    dropNumber: "002",
    category: "Graphic Tees",
    tags: ["graphic", "digital", "internet-culture"],
    isNew: false,
    isBestseller: false,
    fabric: "100% Premium Combed Cotton",
    gsm: 240,
    fit: "Relaxed Oversized",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Iron inside out"],
    variants: [
      {
        color: "Black",
        colorHex: "#171717",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: true },
        ],
        images: [
          "https://images.unsplash.com/photo-1503341504253-dff4f94032fc?w=800&q=90",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=90",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
        ],
      },
      {
        color: "Ash Grey",
        colorHex: "#8a8a8a",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: false },
          { size: "XXL", inStock: false },
        ],
        images: [
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=90",
          "https://images.unsplash.com/photo-1503341504253-dff4f94032fc?w=800&q=90",
        ],
      },
    ],
    modelInfo: "Model is 5'10\" / 178cm, wearing size M",
    details: [
      "High-density screen print",
      "Ribbed crew neck",
      "Drop shoulder construction",
      "Double-needle stitching",
      "Pre-shrunk fabric",
      "Designed Locally",
    ],
  },
  {
    id: "11",
    slug: "void-essential-tee",
    name: "Void Essential Tee",
    price: 1999,
    description: "Into the void. The darkest essential in the lineup.",
    collection: "Essentials",
    drop: "After Hours",
    dropNumber: "001",
    category: "Essentials",
    tags: ["essential", "dark", "heavyweight"],
    isNew: true,
    isBestseller: false,
    fabric: "100% Premium Combed Cotton",
    gsm: 220,
    fit: "Relaxed",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low"],
    variants: [
      {
        color: "Void Black",
        colorHex: "#0a0a0a",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: true },
        ],
        images: [
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
          "https://images.unsplash.com/photo-1503341504253-dff4f94032fc?w=800&q=90",
        ],
      },
    ],
    modelInfo: "Model is 6'0\" / 183cm, wearing size L",
    details: [
      "Double-dyed for depth",
      "Ribbed crew neck",
      "Regular shoulder",
      "Double-needle stitching",
      "Pre-shrunk fabric",
      "Designed Locally",
    ],
  },
  {
    id: "12",
    slug: "offline-tee",
    name: "Offline Tee",
    price: 2099,
    description: "Sometimes the best connection is no connection.",
    collection: "After Dark",
    drop: "Static",
    dropNumber: "002",
    category: "Graphic Tees",
    tags: ["graphic", "minimal", "digital"],
    isNew: false,
    isBestseller: true,
    fabric: "100% Premium Combed Cotton",
    gsm: 240,
    fit: "Relaxed Oversized",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Iron inside out"],
    variants: [
      {
        color: "Washed Black",
        colorHex: "#2a2a2a",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: true },
        ],
        images: [
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=90",
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=90",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
        ],
      },
      {
        color: "Stone",
        colorHex: "#c4b9a8",
        sizes: [
          { size: "XS", inStock: true },
          { size: "S", inStock: true },
          { size: "M", inStock: true },
          { size: "L", inStock: true },
          { size: "XL", inStock: true },
          { size: "XXL", inStock: false },
        ],
        images: [
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=90",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=90",
        ],
      },
    ],
    modelInfo: "Model is 6'1\" / 185cm, wearing size L",
    details: [
      "High-density screen print",
      "Ribbed crew neck",
      "Drop shoulder construction",
      "Double-needle stitching",
      "Pre-shrunk fabric",
      "Designed Locally",
    ],
  },
];

export const collections = [
  {
    id: "graphics",
    name: "Graphics",
    slug: "graphics",
    number: "01",
    description: "Bold statements. Premium prints on heavyweight cotton.",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
  },
  {
    id: "essentials",
    name: "Essentials",
    slug: "essentials",
    number: "02",
    description: "The foundation. Clean silhouettes built for every day.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=90",
  },
  {
    id: "after-dark",
    name: "After Dark",
    slug: "after-dark",
    number: "03",
    description: "When the city sleeps. Night-ready pieces with reflective details.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=90",
  },
  {
    id: "archive",
    name: "Archive",
    slug: "archive",
    number: "04",
    description: "From the vault. Limited re-releases and original designs.",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=90",
  },
];

export const drops = [
  {
    id: "001",
    name: "After Hours",
    number: "001",
    year: "2026",
    description: "The debut collection. Made for the hours between dusk and dawn.",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
    productIds: ["1", "2", "3", "4", "6", "8", "11"],
  },
  {
    id: "002",
    name: "Static",
    number: "002",
    year: "2026",
    description: "Noise reduction. Clean lines, heavyweight construction.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=90",
    productIds: ["5", "7", "9", "10", "12"],
  },
];

export function getProductBySlug(slug: string, list: Product[] = products): Product | undefined {
  return list.find((p) => p.slug === slug);
}

export function getProductsByCollection(collection: string, list: Product[] = products): Product[] {
  return list.filter(
    (p) => p.collection.toLowerCase() === collection.toLowerCase()
  );
}

export function getProductsByDrop(dropNumber: string, list: Product[] = products): Product[] {
  return list.filter((p) => p.dropNumber === dropNumber);
}

export function getBestsellers(list: Product[] = products): Product[] {
  return list.filter((p) => p.isBestseller);
}

export function getNewProducts(list: Product[] = products): Product[] {
  return list.filter((p) => p.isNew);
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}
