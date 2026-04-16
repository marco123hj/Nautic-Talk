# Shipstore

A Next.js 14 storefront connecting two Shopify stores -- **Zepory** and **Nautic Talk** -- deployed on Vercel via GitHub.

## Prerequisites

- Node.js 18+
- A GitHub account
- A Vercel account
- Storefront API access for both Shopify stores

## 1. Get Shopify Storefront API Tokens

For **each** store (Zepory and Nautic Talk):

1. Log in to the Shopify admin at `https://<store>.myshopify.com/admin`.
2. Go to **Settings > Apps and sales channels > Develop apps**.
3. Click **Create an app**, give it a name (e.g. "Shipstore Storefront").
4. Under **Configuration**, enable the **Storefront API** scopes you need (at minimum `unauthenticated_read_product_listings`).
5. Click **Install app**, then copy the **Storefront API access token**.

You will need:
- The store domain (e.g. `zepory.myshopify.com`)
- The Storefront API access token

## 2. Local Development

```bash
# Clone the repo
git clone <your-github-repo-url>
cd Shipstore

# Install dependencies
npm install

# Create your local env file
cp .env.example .env.local

# Edit .env.local and fill in your real tokens
# Then start the dev server
npm run dev
```

Open http://localhost:3000 to see the app.

## 3. Connect to GitHub

If you haven't already pushed this repo:

```bash
git remote add origin https://github.com/<your-username>/Shipstore.git
git branch -M main
git push -u origin main
```

## 4. Deploy to Vercel

1. Go to https://vercel.com/new.
2. Click **Import** next to your Shipstore GitHub repository.
3. Vercel will auto-detect the Next.js framework.
4. Before deploying, add the following **Environment Variables** in the Vercel dashboard:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_ZEPORY_SHOPIFY_STORE_DOMAIN` | `zepory.myshopify.com` |
| `ZEPORY_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Your Zepory storefront token |
| `NEXT_PUBLIC_NAUTICTALK_SHOPIFY_STORE_DOMAIN` | `nautictalk.myshopify.com` |
| `NAUTICTALK_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Your Nautic Talk storefront token |

5. Click **Deploy**.

Every push to your GitHub repository will trigger an automatic redeployment on Vercel.

## Project Structure

```
app/
  layout.tsx              - Root layout with navigation
  page.tsx                - Home page with links to both stores
  [store]/
    page.tsx              - Product listing for a store
    products/
      [handle]/
        page.tsx          - Individual product page
lib/
  shopify.ts              - Shopify Storefront API client for both stores
```
