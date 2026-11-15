interface ShopifyStoreConfig {
  storeDomain: string;
  storefrontAccessToken: string;
}

function getStoreConfig(): ShopifyStoreConfig {
  return {
    storeDomain:
      process.env.NEXT_PUBLIC_NAUTICTALK_SHOPIFY_STORE_DOMAIN ??
      "aayzmr-8g.myshopify.com",
    storefrontAccessToken:
      process.env.NAUTICTALK_SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "",
  };
}

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const config = getStoreConfig();
  const url = `https://${config.storeDomain}/api/2024-10/graphql.json`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (config.storefrontAccessToken.startsWith("shpat_")) {
    headers["Shopify-Storefront-Private-Token"] = config.storefrontAccessToken;
  } else {
    headers["X-Shopify-Storefront-Access-Token"] = config.storefrontAccessToken;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Shopify API error: ${response.status} ${response.statusText} — ${text}`
    );
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(
      `Shopify GraphQL error: ${JSON.stringify(json.errors)}`
    );
  }

  return json.data as T;
}

// ---------- GraphQL queries ----------

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          vendor
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      vendor
      productType
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

// ---------- Helpers (safe to import from server or client components) ----------

/** Assign a category to each product based on title/handle.
 *  Order matters — more specific matches first.
 */
export function getCategory(product: {
  title: string;
  handle: string;
}): string {
  const t = product.title.toLowerCase();
  const h = product.handle.toLowerCase();

  if (h === "nautic-talk-trio" || h === "nautic-talk-duo") return "Intercomunicadores";
  if (t.includes("gorra") || h.startsWith("pet-")) return "Merchandising";
  if (t.startsWith("casco")) return "Cascos";
  if (
    t.startsWith("soporte") ||
    h.includes("houder") ||
    h.includes("klemhouder") ||
    h.includes("modulehouder")
  )
    return "Soportes";
  if (
    t.includes("auricular") ||
    t.includes("oorkappen") ||
    h.includes("oorkappen") ||
    h.includes("koptelefoon")
  )
    return "Auriculares";
  if (t.includes("protector") || t.includes("viento") || h.includes("windkussen"))
    return "Accesorios";

  return "Accesorios";
}

// ---------- Types ----------

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  vendor?: string;
  productType?: string;
  priceRange: {
    minVariantPrice: ShopifyPrice;
  };
  images: {
    edges: { node: ShopifyImage }[];
  };
  variants?: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: ShopifyPrice;
      };
    }[];
  };
}

interface ProductsResponse {
  products: {
    edges: { node: ShopifyProduct }[];
  };
}

interface ProductByHandleResponse {
  productByHandle: ShopifyProduct | null;
}

// ---------- Cart ----------

const CART_CREATE_MUTATION = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export interface CartCreateLine {
  merchandiseId: string;
  quantity: number;
}

interface CartCreateResponse {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: { field: string[]; message: string }[];
  };
}

export async function createShopifyCart(
  lines: CartCreateLine[]
): Promise<{ id: string; checkoutUrl: string }> {
  const data = await shopifyFetch<CartCreateResponse>(CART_CREATE_MUTATION, {
    input: { lines },
  });
  const errors = data.cartCreate.userErrors;
  if (errors.length) {
    throw new Error(
      `Shopify cart errors: ${errors.map((e) => e.message).join(", ")}`
    );
  }
  if (!data.cartCreate.cart) {
    throw new Error("Shopify returned no cart");
  }
  return data.cartCreate.cart;
}

// ---------- Public helpers ----------

export async function getProducts(
  first: number = 20
): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<ProductsResponse>(PRODUCTS_QUERY, {
    first,
  });
  return data.products.edges.map((edge) => edge.node);
}

const NEWEST_PRODUCTS_QUERY = `
  query GetNewestProducts($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          handle
          description
          vendor
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

export async function getNewestProducts(
  first: number = 8
): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<ProductsResponse>(NEWEST_PRODUCTS_QUERY, {
    first,
  });
  return data.products.edges.map((edge) => edge.node);
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<ProductByHandleResponse>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle }
  );
  return data.productByHandle;
}
