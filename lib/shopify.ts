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

// ---------- Public helpers ----------

export async function getProducts(
  first: number = 20
): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<ProductsResponse>(PRODUCTS_QUERY, {
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
