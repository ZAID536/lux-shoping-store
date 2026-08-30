'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Image' }: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Upload failed');
      onChange(data.url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }
    upload(file);
  };

  return (
    <div>
      <label className="block text-gray-400 text-sm mb-2">{label}</label>

      <div
        className={`relative border-2 border-dashed rounded-xl transition-all ${
          dragOver ? 'border-[#FF66C4] bg-[#FF66C4]/5' : 'border-white/20 hover:border-white/40'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
      >
        {value ? (
          <div className="relative h-48 rounded-xl overflow-hidden">
            {value.startsWith('/') || value.startsWith('http') ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            ) : null}
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="bg-white/20 backdrop-blur text-white px-3 py-1.5 rounded-lg text-sm hover:bg-white/30 transition"
              >
                Change
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="bg-red-500/40 backdrop-blur text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-500/60 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full py-10 flex flex-col items-center gap-3 text-gray-500 hover:text-gray-300 transition-colors"
          >
            {uploading ? (
              <div className="w-8 h-8 border-2 border-[#FF66C4] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span className="text-4xl">📷</span>
                <div className="text-center">
                  <p className="text-sm font-medium">Drop image here or click to upload</p>
                  <p className="text-xs text-gray-600 mt-1">JPEG, PNG, WebP — max 10MB</p>
                </div>
              </>
            )}
          </button>
        )}

        {uploading && value && (
          <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#FF66C4] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* URL input as alternative */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste an image URL..."
        className="mt-2 w-full bg-[#0f0f13] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#FF66C4] transition-colors"
      />

      {error && <p className="mt-1 text-red-400 text-xs">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
