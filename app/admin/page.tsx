import { getAllProducts } from '@/lib/queries/products';
import { getAllGallery } from '@/lib/queries/gallery';
import { getAllTeamMembers } from '@/lib/queries/team';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [products, gallery, team] = await Promise.all([
    getAllProducts().catch(() => []),
    getAllGallery().catch(() => []),
    getAllTeamMembers().catch(() => []),
  ]);

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      icon: '🛍️',
      href: '/admin/products',
      color: 'from-[#FF66C4] to-[#ff3fa0]',
      shadow: 'shadow-pink-500/20',
    },
    {
      label: 'Gallery Items',
      value: gallery.length,
      icon: '🖼️',
      href: '/admin/gallery',
      color: 'from-violet-500 to-purple-600',
      shadow: 'shadow-violet-500/20',
    },
    {
      label: 'Team Members',
      value: team.length,
      icon: '👥',
      href: '/admin/team',
      color: 'from-amber-400 to-orange-500',
      shadow: 'shadow-amber-500/20',
    },
    {
      label: 'Categories',
      value: 5,
      icon: '🏷️',
      href: '/admin/products',
      color: 'from-emerald-400 to-teal-500',
      shadow: 'shadow-emerald-500/20',
    },
  ];

  const quickActions = [
    { label: 'Add Product', href: '/admin/products/new', icon: '➕', desc: 'Create a new product listing' },
    { label: 'Upload Gallery', href: '/admin/gallery/new', icon: '📸', desc: 'Add images to the gallery' },
    { label: 'Add Team Member', href: '/admin/team/new', icon: '👤', desc: 'Add a new team member' },
    { label: 'Seed Database', href: '/api/seed', icon: '🌱', desc: 'Populate DB from static data' },
  ];

  const recentProducts = products.slice(0, 5);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back, Admin. Here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-[#1a1a22] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group"
          >
            <div className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} items-center justify-center mb-4 shadow-lg ${s.shadow}`}>
              <span className="text-xl">{s.icon}</span>
            </div>
            <p className="text-3xl font-bold text-white group-hover:text-[#FF66C4] transition-colors">
              {s.value}
            </p>
            <p className="text-gray-400 text-sm mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <h2 className="text-white font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className="flex items-center gap-4 bg-[#1a1a22] border border-white/10 rounded-xl p-4 hover:border-[#FF66C4]/30 hover:bg-[#FF66C4]/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF66C4]/10 transition-colors">
                  <span className="text-lg">{a.icon}</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{a.label}</p>
                  <p className="text-gray-500 text-xs">{a.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Products */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">Recent Products</h2>
            <Link href="/admin/products" className="text-[#FF66C4] text-sm hover:underline">
              View all →
            </Link>
          </div>
          <div className="bg-[#1a1a22] border border-white/10 rounded-2xl overflow-hidden">
            {recentProducts.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No products yet.</p>
                <Link href="/admin/products/new" className="text-[#FF66C4] text-sm mt-2 inline-block">
                  Add your first product →
                </Link>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-6 py-3 text-gray-400 text-xs font-medium uppercase tracking-wider">Product</th>
                    <th className="text-left px-6 py-3 text-gray-400 text-xs font-medium uppercase tracking-wider">Category</th>
                    <th className="text-left px-6 py-3 text-gray-400 text-xs font-medium uppercase tracking-wider">Price</th>
                    <th className="text-left px-6 py-3 text-gray-400 text-xs font-medium uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-white/2 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-white text-sm font-medium truncate max-w-[160px]">{p.name}</p>
                        <p className="text-gray-500 text-xs">{p.sku}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 text-sm">{p.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white text-sm font-semibold">${Number(p.price).toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1 flex-wrap">
                          {p.is_new ? <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">New</span> : null}
                          {p.is_best_seller ? <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full">Best</span> : null}
                          {p.is_sale ? <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">Sale</span> : null}
                          {!p.is_new && !p.is_best_seller && !p.is_sale && (
                            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Active</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
