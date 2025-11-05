import clsx from "clsx";

type Props = {
  kicker?: string;
  title: string;
  align?: "start" | "center";
};

export function SectionHeading({ kicker, title, align = "start" }: Props) {
  return (
    <div className={clsx("mb-8", align === "center" && "text-center mx-auto")}>      
      {kicker && (
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3">{kicker}</p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-black">{title}</h2>
    </div>
  );
}
