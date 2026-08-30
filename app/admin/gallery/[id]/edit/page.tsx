import { getGalleryById } from '@/lib/queries/gallery';
import GalleryForm from '@/components/admin/GalleryForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditGalleryPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();

  const item = await getGalleryById(id);
  if (!item) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Edit Gallery Item</h1>
        <p className="text-gray-400 mt-1">{item.title || 'Untitled image'}</p>
      </div>
      <GalleryForm
        mode="edit"
        initialData={{
          id: item.id,
          image_url: item.image_url,
          title: item.title ?? '',
          description: item.description ?? '',
        }}
      />
    </div>
  );
}
