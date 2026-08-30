import { query, queryOne, execute } from '@/lib/db';

export interface DBTeamMember {
  id: number;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface CreateTeamMemberInput {
  name: string;
  role: string;
  bio?: string;
  image_url?: string;
  sort_order?: number;
}

export async function getAllTeamMembers(): Promise<DBTeamMember[]> {
  return query<DBTeamMember>('SELECT * FROM team_members ORDER BY sort_order ASC, created_at ASC');
}

export async function getTeamMemberById(id: number): Promise<DBTeamMember | null> {
  return queryOne<DBTeamMember>('SELECT * FROM team_members WHERE id = ?', [id]);
}

export async function createTeamMember(input: CreateTeamMemberInput): Promise<number> {
  const result = await execute(
    'INSERT INTO team_members (name, role, bio, image_url, sort_order) VALUES (?, ?, ?, ?, ?)',
    [input.name, input.role, input.bio ?? null, input.image_url ?? null, input.sort_order ?? 0]
  );
  return result.insertId;
}

export async function updateTeamMember(id: number, input: Partial<CreateTeamMemberInput>): Promise<void> {
  await execute(
    `UPDATE team_members SET
       name = COALESCE(?, name),
       role = COALESCE(?, role),
       bio = COALESCE(?, bio),
       image_url = COALESCE(?, image_url),
       sort_order = COALESCE(?, sort_order)
     WHERE id = ?`,
    [
      input.name ?? null,
      input.role ?? null,
      input.bio ?? null,
      input.image_url ?? null,
      input.sort_order ?? null,
      id,
    ]
  );
}

export async function deleteTeamMember(id: number): Promise<void> {
  await execute('DELETE FROM team_members WHERE id = ?', [id]);
}
