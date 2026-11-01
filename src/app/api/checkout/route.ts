import { NextResponse } from "next/server";
import { shopifyEnabled, storefront } from "@/lib/shopify";

const CART_CREATE = `mutation($lines: [CartLineInput!]!) {
  cartCreate(input: { lines: $lines }) {
    cart { checkoutUrl }
    userErrors { message }
  }
}`;

export async function POST(request: Request) {
  if (!shopifyEnabled) {
    return NextResponse.json({ error: "Shopify is not configured" }, { status: 503 });
  }
  const { lines } = (await request.json()) as { lines?: { variantId: string; quantity: number }[] };
  if (!Array.isArray(lines) || lines.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }
  try {
    const data = await storefront<{
      cartCreate: { cart: { checkoutUrl: string } | null; userErrors: { message: string }[] };
    }>(CART_CREATE, {
      lines: lines.map((l) => ({ merchandiseId: l.variantId, quantity: l.quantity })),
    });
    const { cart, userErrors } = data.cartCreate;
    if (!cart) return NextResponse.json({ error: userErrors[0]?.message ?? "Checkout failed" }, { status: 400 });
    return NextResponse.json({ checkoutUrl: cart.checkoutUrl });
  } catch {
    return NextResponse.json({ error: "Checkout failed" }, { status: 502 });
  }
}
