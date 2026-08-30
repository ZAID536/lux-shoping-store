# Lux Pick Florence

A premium luxury fashion eCommerce storefront built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

Palette: White `#FFFFFF` · Soft Pink `#FF66C4` · Black `#111111` · Light Gray `#F7F7F7`
Type: Playfair Display (display) + Jost (body)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm start
```

> **Note:** `next/font/google` fetches Playfair Display and Jost from Google Fonts at build time, so an internet connection is required when running `npm run build` / `npm run dev`. This works out of the box on Vercel.

## Project structure

```
app/                     Routes (App Router)
  page.tsx               Home page
  product/[slug]/        Product detail page (dynamic, statically generated)
  bags/ watches/ ...     Category listing pages
  cart/ checkout/        Cart page + multi-step checkout
  account/ wishlist/     Account and wishlist pages
  about/ contact/ faq/   Info & legal pages
  shipping-policy/ return-policy/ privacy-policy/ terms/
  layout.tsx             Root layout: fonts, providers, Header/Footer/CartDrawer
  globals.css            Tailwind base + a couple of global utilities

components/
  layout/                Header, AnnouncementBar, MobileMenu, Footer, CartDrawer
  home/                   Hero, FeaturedCollections, BestSellers, NewArrivalsCarousel,
                          WhyChooseUs, Testimonials, InstagramSection, Newsletter
  product/                ProductCard, ProductGallery (with zoom), ProductInfo,
                          RelatedProducts, CategoryGrid
  ui/                     Button, Badge, Rating, QuickViewModal, FaqAccordion,
                          ContactForm, StaticPage

context/
  CartContext.tsx        Cart state, persisted to localStorage, coupon logic
  WishlistContext.tsx    Wishlist state, persisted to localStorage

data/
  products.ts             23 sample luxury products across 5 categories, with
                          images, pricing, variants, specs and reviews

lib/utils.ts              cn(), formatPrice(), discountPercent(), slugify()
types/index.ts             Shared TypeScript types (Product, CartItem, Review…)
```

## Customizing

- **Brand colors & fonts** — edit `tailwind.config.ts` (`theme.extend.colors.brand`) and the font imports in `app/layout.tsx`.
- **Products** — edit `data/products.ts`. Each product needs a unique `slug`, at least one image, and (optionally) colors/sizes/specifications/reviews. Product images currently point to Unsplash/Pexels; swap in your own hosted images and add the domain to `next.config.js` → `images.remotePatterns`.
- **Navigation** — edit `components/layout/navLinks.ts`.
- **Coupon codes** — edit `VALID_COUPONS` in `context/CartContext.tsx`.
- **Copy** — Hero, Why Choose Us, Testimonials and Instagram handle text live directly in their respective `components/home/*.tsx` files.

## Connecting real functionality

This is a fully working front-end with realistic interactions (cart, wishlist, coupons, multi-step checkout, quick view, product filtering by category) — all persisted to `localStorage` so state survives a refresh. To take it live you'll want to wire up:

- **Payments** — Stripe, Braintree, or your preferred provider inside `app/checkout/page.tsx`.
- **Inventory / CMS** — replace `data/products.ts` with calls to Shopify, Sanity, Contentful, or your own database.
- **Auth** — `app/account/page.tsx` is a styled demo form; connect it to Auth.js, Clerk, or Supabase Auth.
- **Email capture** — the Newsletter section and Footer form currently just show a success state; connect to Klaviyo, Mailchimp, etc.
- **Contact form** — `components/ui/ContactForm.tsx` simulates a submission; wire it to an email service (Resend, SendGrid) or a form endpoint.

## SEO & performance

- Per-page `metadata` exports (title templates, descriptions, Open Graph, Twitter cards) — see `app/layout.tsx` and individual category/page files.
- Images use `next/image` throughout with responsive `sizes`, so they're lazy-loaded and served in modern formats (AVIF/WebP) automatically.
- All category and product pages are statically generated at build time for fast loads.

## Deploying to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Next.js** (auto-detected). No environment variables are required for the base demo.
4. Deploy — done.
