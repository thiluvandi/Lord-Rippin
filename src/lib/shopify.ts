const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

export const shopifyEnabled = Boolean(domain && token);

export async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
  { cache = false }: { cache?: boolean } = {}
): Promise<T> {
  const res = await fetch(`https://${domain}/api/2025-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token!,
    },
    body: JSON.stringify({ query, variables }),
    ...(cache ? { next: { revalidate: 60 } } : { cache: "no-store" as const }),
  });
  if (!res.ok) throw new Error(`Shopify ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data as T;
}
