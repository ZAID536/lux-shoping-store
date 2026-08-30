import { getAllTeamMembers } from '@/lib/queries/team';
import Link from 'next/link';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminTeamPage() {
  const members = await getAllTeamMembers().catch(() => []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Team Members</h1>
          <p className="text-gray-400 mt-1">{members.length} member{members.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/team/new"
          className="bg-gradient-to-r from-[#FF66C4] to-[#ff3fa0] text-white font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 text-sm"
        >
          <span>👤</span> Add Member
        </Link>
      </div>

      {members.length === 0 ? (
        <div className="bg-[#1a1a22] border border-white/10 rounded-2xl p-16 text-center">
          <p className="text-4xl mb-4">👥</p>
          <p className="text-white text-lg font-medium mb-2">No team members yet</p>
          <p className="text-gray-500 text-sm mb-6">Introduce your team to your customers.</p>
          <Link
            href="/admin/team/new"
            className="bg-[#FF66C4] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#ff3fa0] transition-colors"
          >
            Add First Member
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {members.map((m) => (
            <div
              key={m.id}
              className="bg-[#1a1a22] border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-all"
            >
              <div className="relative h-48 bg-gradient-to-br from-[#FF66C4]/10 to-violet-500/10">
                {m.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.image_url} alt={m.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF66C4] to-violet-500 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">{m.name[0]}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-white font-semibold">{m.name}</p>
                <p className="text-[#FF66C4] text-sm">{m.role}</p>
                {m.bio && <p className="text-gray-500 text-xs mt-2 line-clamp-2">{m.bio}</p>}
                <div className="flex items-center gap-2 mt-4">
                  <Link
                    href={`/admin/team/${m.id}/edit`}
                    className="flex-1 bg-blue-500/10 text-blue-400 text-xs py-1.5 rounded-lg text-center hover:bg-blue-500/20 transition"
                  >
                    ✏️ Edit
                  </Link>
                  <DeleteButton id={m.id} name={m.name} endpoint="/api/team" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
