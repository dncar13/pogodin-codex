import { SectionHeading } from "@/components/ui/SectionHeading";

export function SkillsSection({ heading, skills, kicker }: { heading: string; skills: string[]; kicker: string }) {
  return (
    <section id="skills" className="page-shell py-16">
      <SectionHeading kicker={kicker} title={heading} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <div
            key={skill}
            className="rounded-2xl border border-black/10 bg-gradient-to-br from-white to-white/60 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                {skill.slice(0, 2).toUpperCase()}
              </span>
              <span className="text-lg font-medium text-black/80">{skill}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
