import { getTeamMemberById } from '@/lib/queries/team';
import TeamForm from '@/components/admin/TeamForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditTeamMemberPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();

  const member = await getTeamMemberById(id);
  if (!member) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Edit Team Member</h1>
        <p className="text-gray-400 mt-1">{member.name}</p>
      </div>
      <TeamForm
        mode="edit"
        initialData={{
          id: member.id,
          name: member.name,
          role: member.role,
          bio: member.bio ?? '',
          image_url: member.image_url ?? '',
          sort_order: member.sort_order,
        }}
      />
    </div>
  );
}
