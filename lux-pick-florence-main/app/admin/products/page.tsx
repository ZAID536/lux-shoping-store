import { getAllProducts } from '@/lib/queries/products';
import Link from 'next/link';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await getAllProducts().catch(() => []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="text-gray-400 mt-1">{products.length} product{products.length !== 1 ? 's' : ''} in database</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-gradient-to-r from-[#FF66C4] to-[#ff3fa0] text-white font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 text-sm"
        >
          <span>➕</span> Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-[#1a1a22] border border-white/10 rounded-2xl p-16 text-center">
          <p className="text-4xl mb-4">🛍️</p>
          <p className="text-white text-lg font-medium mb-2">No products yet</p>
          <p className="text-gray-500 text-sm mb-6">Get started by adding your first product or seeding the database.</p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/admin/products/new"
              className="bg-[#FF66C4] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#ff3fa0] transition-colors"
            >
              Add Product
            </Link>
            <Link
              href="/api/seed"
              target="_blank"
              className="bg-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors"
            >
              Seed Database
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-[#1a1a22] border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-gray-400 text-xs font-medium uppercase tracking-wider">Product</th>
                  <th className="text-left px-6 py-4 text-gray-400 text-xs font-medium uppercase tracking-wider">Category</th>
                  <th className="text-left px-6 py-4 text-gray-400 text-xs font-medium uppercase tracking-wider">Price</th>
                  <th className="text-left px-6 py-4 text-gray-400 text-xs font-medium uppercase tracking-wider">Rating</th>
                  <th className="text-left px-6 py-4 text-gray-400 text-xs font-medium uppercase tracking-wider">Labels</th>
                  <th className="text-right px-6 py-4 text-gray-400 text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-white/2 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {p.images?.[0] && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                          />
                        )}
                        <div>
                          <p className="text-white text-sm font-medium">{p.name}</p>
                          <p className="text-gray-500 text-xs">{p.sku || p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-white/5 text-gray-300 text-xs px-2.5 py-1 rounded-full">{p.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <span className="text-white text-sm font-semibold">${Number(p.price).toFixed(2)}</span>
                        {p.old_price && (
                          <span className="text-gray-500 text-xs line-through ml-2">${Number(p.old_price).toFixed(2)}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400 text-xs">★</span>
                        <span className="text-gray-300 text-sm">{Number(p.rating).toFixed(1)}</span>
                        <span className="text-gray-600 text-xs">({p.review_count})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {p.is_new ? <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">New</span> : null}
                        {p.is_best_seller ? <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full">Best Seller</span> : null}
                        {p.is_sale ? <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">Sale</span> : null}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/product/${p.slug}`}
                          target="_blank"
                          className="w-8 h-8 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all"
                          title="View"
                        >
                          👁️
                        </Link>
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="w-8 h-8 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 rounded-lg flex items-center justify-center transition-all"
                          title="Edit"
                        >
                          ✏️
                        </Link>
                        <DeleteButton
                          id={p.id}
                          name={p.name}
                          endpoint="/api/products"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
