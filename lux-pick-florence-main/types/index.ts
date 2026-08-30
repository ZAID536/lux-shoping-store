export type Category =
  | 'Bags'
  | 'Watches'
  | 'Jewelry'
  | 'Shoes'
  | 'Accessories';

export interface ProductVariantColor {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ProductVariantColor[];
  sizes: string[];
  description: string;
  specifications: { label: string; value: string }[];
  reviews: Review[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
  sku: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
}
