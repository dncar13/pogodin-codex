import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServicesSection({ title, services }: { title: string; services: string[] }) {
  return (
    <section className="page-shell py-12">
      <SectionHeading title={title} />
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service}
            className="rounded-2xl border border-black/10 bg-white/80 p-5 text-base font-medium text-black/80 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
          >
            {service}
          </div>
        ))}
      </div>
    </section>
  );
}
