'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';
import Link from 'next/link';

interface Props {
  initialData?: {
    id: number;
    name: string;
    role: string;
    bio?: string;
    image_url?: string;
    sort_order?: number;
  };
  mode: 'create' | 'edit';
}

export default function TeamForm({ initialData, mode }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name ?? '');
  const [role, setRole] = useState(initialData?.role ?? '');
  const [bio, setBio] = useState(initialData?.bio ?? '');
  const [imageUrl, setImageUrl] = useState(initialData?.image_url ?? '');
  const [sortOrder, setSortOrder] = useState(String(initialData?.sort_order ?? 0));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const inputClass =
    'w-full bg-[#0f0f13] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF66C4] transition-colors text-sm';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const url = mode === 'create' ? '/api/team' : `/api/team/${initialData?.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          role,
          bio: bio || null,
          image_url: imageUrl || null,
          sort_order: parseInt(sortOrder) || 0,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error ?? 'Failed to save');

      router.push('/admin/team');
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sophia Marchetti"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Role / Title *</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Creative Director"
              className={inputClass}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="A brief description of this team member..."
            className={inputClass + ' resize-none'}
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Display Order</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            placeholder="0"
            min="0"
            className={inputClass}
          />
          <p className="text-gray-600 text-xs mt-1">Lower numbers appear first</p>
        </div>

        <ImageUpload label="Profile Photo" value={imageUrl} onChange={setImageUrl} />
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
            mode === 'create' ? '👤 Add Team Member' : '✓ Save Changes'
          )}
        </button>
        <Link href="/admin/team" className="text-gray-400 hover:text-white transition-colors text-sm">
          Cancel
        </Link>
      </div>
    </form>
  );
}
