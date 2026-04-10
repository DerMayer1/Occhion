import { Link } from 'react-router-dom';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  actionLabel,
  actionTo,
  align = 'left',
}: SectionHeadingProps) {
  const alignmentClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex flex-col gap-6 ${alignmentClass}`}>
      {eyebrow ? (
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">{eyebrow}</span>
      ) : null}
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className={`max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
          <h2 className="font-serif text-4xl tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">{title}</h2>
          {description ? <p className="mt-6 text-lg leading-relaxed text-slate-500">{description}</p> : null}
        </div>
        {actionLabel && actionTo ? (
          <Link
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition-colors hover:text-emerald-600"
            to={actionTo}
          >
            {actionLabel}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
