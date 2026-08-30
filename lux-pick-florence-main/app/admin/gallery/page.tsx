import { getAllGallery } from '@/lib/queries/gallery';
import Link from 'next/link';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminGalleryPage() {
  const items = await getAllGallery().catch(() => []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Gallery</h1>
          <p className="text-gray-400 mt-1">{items.length} image{items.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="bg-gradient-to-r from-[#FF66C4] to-[#ff3fa0] text-white font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 text-sm"
        >
          <span>📸</span> Upload Image
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-[#1a1a22] border border-white/10 rounded-2xl p-16 text-center">
          <p className="text-4xl mb-4">🖼️</p>
          <p className="text-white text-lg font-medium mb-2">No gallery images yet</p>
          <p className="text-gray-500 text-sm mb-6">Upload beautiful images to showcase your brand.</p>
          <Link
            href="/admin/gallery/new"
            className="bg-[#FF66C4] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#ff3fa0] transition-colors"
          >
            Upload First Image
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#1a1a22] border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image_url}
                alt={item.title ?? 'Gallery image'}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <p className="text-white text-sm font-medium truncate">{item.title || 'Untitled'}</p>
                {item.description && (
                  <p className="text-gray-300 text-xs mt-0.5 truncate">{item.description}</p>
                )}
                <div className="flex items-center gap-2 mt-3">
                  <Link
                    href={`/admin/gallery/${item.id}/edit`}
                    className="flex-1 bg-white/20 backdrop-blur text-white text-xs py-1.5 rounded-lg text-center hover:bg-white/30 transition"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={item.id} name={item.title ?? 'image'} endpoint="/api/gallery" />
                </div>
              </div>
              <div className="p-3">
                <p className="text-gray-300 text-sm truncate">{item.title || 'Untitled'}</p>
                <p className="text-gray-600 text-xs">{new Date(item.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
