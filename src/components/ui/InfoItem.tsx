interface InfoItemProps {
  eyebrow?: string;
  title: string;
  description: string;
}

export default function InfoItem({ eyebrow, title, description }: InfoItemProps) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)]">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{eyebrow}</p> : null}
      <h3 className="mt-3 font-serif text-2xl text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </article>
  );
}
