'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';
import Link from 'next/link';

const CATEGORIES = ['Bags', 'Watches', 'Jewelry', 'Shoes', 'Accessories'];

interface ProductFormData {
  name: string;
  slug: string;
  category: string;
  price: string;
  old_price: string;
  description: string;
  sku: string;
  is_new: boolean;
  is_best_seller: boolean;
  is_sale: boolean;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  specifications: { label: string; value: string }[];
}

interface Props {
  initialData?: Partial<ProductFormData> & { id?: number };
  mode: 'create' | 'edit';
}

const DEFAULT_DATA: ProductFormData = {
  name: '',
  slug: '',
  category: 'Bags',
  price: '',
  old_price: '',
  description: '',
  sku: '',
  is_new: false,
  is_best_seller: false,
  is_sale: false,
  images: [''],
  colors: [{ name: '', hex: '#111111' }],
  sizes: [''],
  specifications: [{ label: '', value: '' }],
};

export default function ProductForm({ initialData, mode }: Props) {
  const router = useRouter();
  const [data, setData] = useState<ProductFormData>({
    ...DEFAULT_DATA,
    ...initialData,
    images: (initialData?.images?.length ? initialData.images : ['']),
    colors: (initialData?.colors?.length ? initialData.colors : [{ name: '', hex: '#111111' }]),
    sizes: (initialData?.sizes?.length ? initialData.sizes : ['']),
    specifications: (initialData?.specifications?.length ? initialData.specifications : [{ label: '', value: '' }]),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = <K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    set('name', name);
    if (mode === 'create') {
      set('slug', name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ...data,
      price: parseFloat(data.price) || 0,
      old_price: data.old_price ? parseFloat(data.old_price) : null,
      images: data.images.filter(Boolean),
      colors: data.colors.filter((c) => c.name),
      sizes: data.sizes.filter(Boolean),
      specifications: data.specifications.filter((s) => s.label),
    };

    try {
      const url = mode === 'create' ? '/api/products' : `/api/products/${initialData?.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error ?? 'Failed to save');

      router.push('/admin/products');
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full bg-[#0f0f13] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF66C4] transition-colors text-sm';
  const labelClass = 'block text-gray-400 text-sm mb-2';
  const sectionClass = 'bg-[#1a1a22] border border-white/10 rounded-2xl p-6';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
          ⚠️ {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className={sectionClass}>
            <h2 className="text-white font-semibold mb-5">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Product Name *</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Florence Structured Tote"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Slug (URL) *</label>
                <input
                  type="text"
                  value={data.slug}
                  onChange={(e) => set('slug', e.target.value)}
                  placeholder="florence-structured-tote"
                  className={inputClass}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Category *</label>
                  <select
                    value={data.category}
                    onChange={(e) => set('category', e.target.value)}
                    className={inputClass}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>SKU</label>
                  <input
                    type="text"
                    value={data.sku}
                    onChange={(e) => set('sku', e.target.value)}
                    placeholder="LPF-BAG-001"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  value={data.description}
                  onChange={(e) => set('description', e.target.value)}
                  rows={4}
                  placeholder="Describe the product..."
                  className={inputClass + ' resize-none'}
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className={sectionClass}>
            <h2 className="text-white font-semibold mb-5">Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Price (USD) *</label>
                <input
                  type="number"
                  value={data.price}
                  onChange={(e) => set('price', e.target.value)}
                  placeholder="299"
                  min="0"
                  step="0.01"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Original Price (for sale)</label>
                <input
                  type="number"
                  value={data.old_price}
                  onChange={(e) => set('old_price', e.target.value)}
                  placeholder="399"
                  min="0"
                  step="0.01"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className={sectionClass}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-semibold">Product Images</h2>
              <button
                type="button"
                onClick={() => set('images', [...data.images, ''])}
                className="text-[#FF66C4] text-sm hover:underline"
              >
                + Add image
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.images.map((img, i) => (
                <div key={i} className="relative">
                  <ImageUpload
                    label={`Image ${i + 1}${i === 0 ? ' (Main)' : ''}`}
                    value={img}
                    onChange={(url) => {
                      const updated = [...data.images];
                      updated[i] = url;
                      set('images', updated);
                    }}
                  />
                  {data.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => set('images', data.images.filter((_, j) => j !== i))}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className={sectionClass}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-semibold">Specifications</h2>
              <button
                type="button"
                onClick={() => set('specifications', [...data.specifications, { label: '', value: '' }])}
                className="text-[#FF66C4] text-sm hover:underline"
              >
                + Add spec
              </button>
            </div>
            <div className="space-y-3">
              {data.specifications.map((spec, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <input
                    type="text"
                    value={spec.label}
                    onChange={(e) => {
                      const updated = [...data.specifications];
                      updated[i] = { ...updated[i], label: e.target.value };
                      set('specifications', updated);
                    }}
                    placeholder="Label (e.g. Material)"
                    className={inputClass + ' flex-1'}
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => {
                      const updated = [...data.specifications];
                      updated[i] = { ...updated[i], value: e.target.value };
                      set('specifications', updated);
                    }}
                    placeholder="Value (e.g. Italian Leather)"
                    className={inputClass + ' flex-1'}
                  />
                  {data.specifications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => set('specifications', data.specifications.filter((_, j) => j !== i))}
                      className="w-10 h-10 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/40 flex items-center justify-center flex-shrink-0"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Status */}
          <div className={sectionClass}>
            <h2 className="text-white font-semibold mb-5">Status & Labels</h2>
            <div className="space-y-3">
              {[
                { key: 'is_new' as const, label: 'New Arrival', color: 'blue' },
                { key: 'is_best_seller' as const, label: 'Best Seller', color: 'amber' },
                { key: 'is_sale' as const, label: 'On Sale', color: 'red' },
              ].map(({ key, label, color }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      data[key] ? 'bg-[#FF66C4]' : 'bg-white/10'
                    }`}
                    onClick={() => set(key, !data[key])}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                        data[key] ? 'left-6' : 'left-1'
                      }`}
                    />
                  </div>
                  <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className={sectionClass}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Colors</h2>
              <button
                type="button"
                onClick={() => set('colors', [...data.colors, { name: '', hex: '#FF66C4' }])}
                className="text-[#FF66C4] text-sm hover:underline"
              >
                + Add
              </button>
            </div>
            <div className="space-y-3">
              {data.colors.map((color, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={color.hex}
                    onChange={(e) => {
                      const updated = [...data.colors];
                      updated[i] = { ...updated[i], hex: e.target.value };
                      set('colors', updated);
                    }}
                    className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={color.name}
                    onChange={(e) => {
                      const updated = [...data.colors];
                      updated[i] = { ...updated[i], name: e.target.value };
                      set('colors', updated);
                    }}
                    placeholder="Color name"
                    className={inputClass + ' flex-1'}
                  />
                  {data.colors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => set('colors', data.colors.filter((_, j) => j !== i))}
                      className="text-red-400 hover:text-red-300 text-xl"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className={sectionClass}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Sizes</h2>
              <button
                type="button"
                onClick={() => set('sizes', [...data.sizes, ''])}
                className="text-[#FF66C4] text-sm hover:underline"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {data.sizes.map((size, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => {
                      const updated = [...data.sizes];
                      updated[i] = e.target.value;
                      set('sizes', updated);
                    }}
                    placeholder="e.g. S, M, L, 36, One Size"
                    className={inputClass + ' flex-1'}
                  />
                  {data.sizes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => set('sizes', data.sizes.filter((_, j) => j !== i))}
                      className="text-red-400 hover:text-red-300 text-xl"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-gradient-to-r from-[#FF66C4] to-[#ff3fa0] text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-2"
        >
          {saving ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
          ) : (
            mode === 'create' ? '✓ Create Product' : '✓ Save Changes'
          )}
        </button>
        <Link href="/admin/products" className="text-gray-400 hover:text-white transition-colors text-sm">
          Cancel
        </Link>
      </div>
    </form>
  );
}
