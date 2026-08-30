'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';
import Link from 'next/link';

interface Props {
  initialData?: { id: number; image_url: string; title?: string; description?: string };
  mode: 'create' | 'edit';
}

export default function GalleryForm({ initialData, mode }: Props) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(initialData?.image_url ?? '');
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const inputClass =
    'w-full bg-[#0f0f13] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF66C4] transition-colors text-sm';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) { setError('Please upload or provide an image URL'); return; }
    setSaving(true);
    setError('');

    try {
      const url = mode === 'create' ? '/api/gallery' : `/api/gallery/${initialData?.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: imageUrl, title, description }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error ?? 'Failed to save');
      router.push('/admin/gallery');
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
          ⚠️ {error}
        </div>
      )}

      <div className="bg-[#1a1a22] border border-white/10 rounded-2xl p-6 space-y-5">
        <ImageUpload label="Gallery Image *" value={imageUrl} onChange={setImageUrl} />

        <div>
          <label className="block text-gray-400 text-sm mb-2">Title (optional)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Summer Collection 2026"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Add a caption or description..."
            className={inputClass + ' resize-none'}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-gradient-to-r from-[#FF66C4] to-[#ff3fa0] text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-2"
        >
          {saving ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
          ) : (
            mode === 'create' ? '📸 Upload to Gallery' : '✓ Save Changes'
          )}
        </button>
        <Link href="/admin/gallery" className="text-gray-400 hover:text-white transition-colors text-sm">
          Cancel
        </Link>
      </div>
    </form>
  );
}
