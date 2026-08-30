import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Add Product</h1>
        <p className="text-gray-400 mt-1">Create a new product listing in the database</p>
      </div>
      <ProductForm mode="create" />
    </div>
  );
}
