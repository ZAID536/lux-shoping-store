import TeamForm from '@/components/admin/TeamForm';

export default function NewTeamMemberPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Add Team Member</h1>
        <p className="text-gray-400 mt-1">Add a new member to your team</p>
      </div>
      <TeamForm mode="create" />
    </div>
  );
}
