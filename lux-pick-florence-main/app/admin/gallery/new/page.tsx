import GalleryForm from '@/components/admin/GalleryForm';

export default function NewGalleryPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Upload to Gallery</h1>
        <p className="text-gray-400 mt-1">Add a new image to your gallery</p>
      </div>
      <GalleryForm mode="create" />
    </div>
  );
}
