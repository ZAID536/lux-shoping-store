import { Metadata } from 'next';
import StaticPage from '@/components/ui/StaticPage';
import { getAllTeamMembers } from '@/lib/queries/team';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'The story behind Lux Pick Florence — elevated leather goods, watches and jewelry designed in Florence for the modern woman.',
};

export default async function AboutPage() {
  const team = await getAllTeamMembers().catch(() => []);

  return (
    <StaticPage
      eyebrow="Our Story"
      title="Designed in Florence, worn worldwide"
      intro="Lux Pick Florence was founded on a simple idea: luxury should feel personal, not distant. We work with Florentine ateliers and independent craftspeople to create bags, watches, jewelry, shoes and accessories that hold their shape, their shape, their shine and their meaning for years to come."
    >
      <section>
        <h2 className="font-display text-2xl text-brand-black">Where we began</h2>
        <p className="mt-3 font-body leading-relaxed text-brand-black/70">
          Our founder spent a decade sourcing leather and metalwork across Tuscany
          before deciding the pieces she loved most deserved a home of their own.
          Lux Pick Florence launched with a single tote and a promise: every
          product would be made to be kept, not replaced.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-brand-black">How we work</h2>
        <p className="mt-3 font-body leading-relaxed text-brand-black/70">
          Each collection is produced in small runs with family-run workshops in
          Florence and the surrounding region. We favour full-grain leathers,
          Swiss and Japanese movements, and recycled 925 silver and gold vermeil —
          materials chosen to age gracefully rather than chase trends.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-brand-black">Where we ship</h2>
        <p className="mt-3 font-body leading-relaxed text-brand-black/70">
          We proudly ship to Australia, the United States, the United Kingdom,
          Canada and across Europe, with duties and taxes calculated at checkout
          so there are never any surprises at the door.
        </p>
      </section>

      {team.length > 0 && (
        <section className="pt-8 border-t border-brand-grayMid">
          <h2 className="font-display text-2xl text-brand-black mb-6">Meet our team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {team.map((member) => (
              <div key={member.id} className="flex gap-4 items-start">
                {member.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0 border border-brand-gray"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-brand-pink/10 text-brand-pink flex items-center justify-center flex-shrink-0 font-display text-xl font-bold">
                    {member.name[0]}
                  </div>
                )}
                <div>
                  <h3 className="font-display text-base text-brand-black font-semibold">{member.name}</h3>
                  <p className="font-body text-xs text-brand-pink uppercase tracking-widest">{member.role}</p>
                  {member.bio && (
                    <p className="mt-2 font-body text-xs text-brand-black/60 leading-relaxed">{member.bio}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </StaticPage>
  );
}

