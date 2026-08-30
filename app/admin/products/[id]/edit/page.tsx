import { getProductById } from '@/lib/queries/products';
import ProductForm from '@/components/admin/ProductForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();

  const product = await getProductById(id);
  if (!product) notFound();

  const initialData = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    category: product.category,
    price: String(product.price),
    old_price: product.old_price ? String(product.old_price) : '',
    description: product.description,
    sku: product.sku,
    is_new: Boolean(product.is_new),
    is_best_seller: Boolean(product.is_best_seller),
    is_sale: Boolean(product.is_sale),
    images: product.images ?? [],
    colors: product.colors ?? [],
    sizes: product.sizes ?? [],
    specifications: product.specifications ?? [],
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Edit Product</h1>
        <p className="text-gray-400 mt-1">Editing: <span className="text-white">{product.name}</span></p>
      </div>
      <ProductForm mode="edit" initialData={initialData} />
    </div>
  );
}
