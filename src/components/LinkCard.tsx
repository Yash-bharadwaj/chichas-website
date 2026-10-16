import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

type Props = {
  href: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  /** Tailwind classes for the icon tile, so each brand keeps its own colour. */
  iconClassName: string;
  delay?: number;
};

export function LinkCard({ href, title, subtitle, icon, iconClassName, delay = 0 }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="surface-card group animate-rise flex min-h-[4.75rem] items-center gap-4 px-4 py-3.5 sm:px-5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${iconClassName}`}
        aria-hidden="true"
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-display text-[1rem] font-bold leading-snug tracking-tight text-ink">
          {title}
        </span>
        <span className="mt-0.5 block truncate text-[0.83rem] text-ink-faint">{subtitle}</span>
      </span>

      <ArrowUpRight
        className="h-[1.1rem] w-[1.1rem] shrink-0 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-deep"
        strokeWidth={2.2}
        aria-hidden="true"
      />
    </a>
  );
}
