import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getRelatedProducts, getAllProducts } from '@/lib/queries/products';
import { dbProductToProduct, dbProductsToProducts } from '@/lib/adapters';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import RelatedProducts from '@/components/product/RelatedProducts';

interface ProductPageProps {
  params: { slug: string };
}

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const products = await getAllProducts().catch(() => []);
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const dbProduct = await getProductBySlug(params.slug).catch(() => null);
  if (!dbProduct) return { title: 'Product Not Found' };
  const product = dbProductToProduct(dbProduct);
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Lux Pick Florence`,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const dbProduct = await getProductBySlug(params.slug).catch(() => null);
  if (!dbProduct) notFound();

  const product = dbProductToProduct(dbProduct);
  const dbRelated = await getRelatedProducts(dbProduct.id, dbProduct.category).catch(() => []);
  const related = dbProductsToProducts(dbRelated);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav className="font-body text-xs text-brand-graySlate">
          <Link href="/" className="hover:text-brand-pink">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/${product.category.toLowerCase()}`} className="hover:text-brand-pink">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-black">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        <ProductGallery images={product.images} name={product.name} />
        <ProductInfo product={product} />
      </div>

      <RelatedProducts products={related} />
    </div>
  );
}

