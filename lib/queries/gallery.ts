import { query, queryOne, execute } from '@/lib/db';

export interface DBGalleryItem {
  id: number;
  title: string | null;
  description: string | null;
  image_url: string;
  created_at: string;
}

export interface CreateGalleryInput {
  title?: string;
  description?: string;
  image_url: string;
}

export async function getAllGallery(): Promise<DBGalleryItem[]> {
  return query<DBGalleryItem>('SELECT * FROM gallery ORDER BY created_at DESC');
}

export async function getGalleryById(id: number): Promise<DBGalleryItem | null> {
  return queryOne<DBGalleryItem>('SELECT * FROM gallery WHERE id = ?', [id]);
}

export async function createGalleryItem(input: CreateGalleryInput): Promise<number> {
  const result = await execute(
    'INSERT INTO gallery (title, description, image_url) VALUES (?, ?, ?)',
    [input.title ?? null, input.description ?? null, input.image_url]
  );
  return result.insertId;
}

export async function updateGalleryItem(id: number, input: Partial<CreateGalleryInput>): Promise<void> {
  await execute(
    `UPDATE gallery SET
       title = COALESCE(?, title),
       description = COALESCE(?, description),
       image_url = COALESCE(?, image_url)
     WHERE id = ?`,
    [input.title ?? null, input.description ?? null, input.image_url ?? null, id]
  );
}

export async function deleteGalleryItem(id: number): Promise<void> {
  await execute('DELETE FROM gallery WHERE id = ?', [id]);
}
