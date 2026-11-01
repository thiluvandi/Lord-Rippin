import { products, collections } from "../src/data/products";

import { appendFileSync, readFileSync } from "node:fs";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const clientId = process.env.SHOPIFY_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
if (!domain || !clientId || !clientSecret) throw new Error("Set SHOPIFY_STORE_DOMAIN, SHOPIFY_CLIENT_ID and SHOPIFY_CLIENT_SECRET in .env.local");

let token = "";
const endpoint = `https://${domain}/admin/api/2025-01/graphql.json`;

async function getToken() {
  const res = await fetch(`https://${domain}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: clientId!, client_secret: clientSecret!, grant_type: "client_credentials" }),
  });
  const json = await res.json();
  if (!json.access_token) throw new Error(`Token exchange failed: ${JSON.stringify(json)}`);
  return json.access_token as string;
}

async function gql<T = any>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": token },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

const PRODUCT_SET = `mutation($input: ProductSetInput!) {
  productSet(input: $input, synchronous: true) {
    product { id handle }
    userErrors { field message }
  }
}`;

const COLLECTION_CREATE = `mutation($input: CollectionInput!) {
  collectionCreate(input: $input) {
    collection { id handle }
    userErrors { field message }
  }
}`;

async function main() {
  token = await getToken();
  const loc = await gql(`{ locations(first: 1) { nodes { id } } }`);
  const locationId: string = loc.locations.nodes[0].id;

  for (const p of products) {
    const colors = p.variants.map((v) => v.color);
    const sizes = [...new Set(p.variants.flatMap((v) => v.sizes.map((s) => s.size)))];
    const images = [...new Set(p.variants.flatMap((v) => v.images))];

    const input = {
      title: p.name,
      handle: p.slug,
      descriptionHtml: `<p>${p.description}</p><ul>${p.details.map((d) => `<li>${d}</li>`).join("")}</ul>`,
      vendor: "Lord Rippin'",
      productType: p.category,
      status: "ACTIVE",
      tags: [
        ...p.tags,
        `collection:${p.collection}`,
        `drop:${p.dropNumber}`,
        ...(p.isNew ? ["new"] : []),
        ...(p.isBestseller ? ["bestseller"] : []),
      ],
      productOptions: [
        { name: "Color", values: colors.map((name) => ({ name })) },
        { name: "Size", values: sizes.map((name) => ({ name })) },
      ],
      files: images.map((originalSource) => ({ originalSource, contentType: "IMAGE", alt: p.name })),
      variants: p.variants.flatMap((v) =>
        v.sizes.map((s) => ({
          optionValues: [
            { optionName: "Color", name: v.color },
            { optionName: "Size", name: s.size },
          ],
          price: p.price.toFixed(2),
          ...(p.comparePrice ? { compareAtPrice: p.comparePrice.toFixed(2) } : {}),
          sku: `${p.slug}-${v.color}-${s.size}`.toUpperCase().replace(/\s+/g, "-"),
          inventoryItem: { tracked: true },
          inventoryQuantities: [{ locationId, name: "available", quantity: s.inStock ? 25 : 0 }],
        }))
      ),
    };

    const r = await gql(PRODUCT_SET, { input });
    const errs = r.productSet.userErrors;
    console.log(errs.length ? `FAIL ${p.slug}: ${JSON.stringify(errs)}` : `ok   ${p.slug}`);
  }

  for (const c of collections) {
    const r = await gql(COLLECTION_CREATE, {
      input: {
        title: c.name,
        handle: c.slug,
        descriptionHtml: `<p>${c.description}</p>`,
        ruleSet: { appliedDisjunctively: false, rules: [{ column: "TAG", relation: "EQUALS", condition: `collection:${c.name}` }] },
      },
    });
    const errs = r.collectionCreate.userErrors;
    console.log(errs.length ? `FAIL collection ${c.slug}: ${JSON.stringify(errs)}` : `ok   collection ${c.slug}`);
  }

  const pubs = await gql(`{ publications(first: 20) { nodes { id name } } }`);
  const pubInputs = pubs.publications.nodes.map((n: { id: string }) => ({ publicationId: n.id }));
  const all = await gql(`{ products(first: 50) { nodes { id } } collections(first: 50) { nodes { id } } }`);
  for (const n of [...all.products.nodes, ...all.collections.nodes]) {
    const r = await gql(
      `mutation($id: ID!, $input: [PublicationInput!]!) { publishablePublish(id: $id, input: $input) { userErrors { message } } }`,
      { id: n.id, input: pubInputs }
    );
    const errs = r.publishablePublish.userErrors;
    if (errs.length) console.log(`publish ${n.id}: ${JSON.stringify(errs)}`);
  }
  console.log(`published to ${pubInputs.length} channel(s)`);

  const env = readFileSync(".env.local", "utf8");
  if (!/^SHOPIFY_STOREFRONT_TOKEN=.+/m.test(env)) {
    const t = await gql(`mutation { storefrontAccessTokenCreate(input: { title: "Lord Rippin site" }) { storefrontAccessToken { accessToken } userErrors { message } } }`);
    const tok = t.storefrontAccessTokenCreate.storefrontAccessToken?.accessToken;
    if (!tok) throw new Error(JSON.stringify(t.storefrontAccessTokenCreate.userErrors));
    appendFileSync(".env.local", `\nSHOPIFY_STOREFRONT_TOKEN=${tok}\n`);
    console.log("storefront token saved to .env.local");
  }
}

main();
