import { ArrowRight, Utensils } from 'lucide-react';
import { site } from '../data/site';

/**
 * The page's primary action. Deliberately the loudest element on screen:
 * full-width, saffron, and the first thing a thumb lands on.
 */
export function MenuCard({ delay = 0 }: { delay?: number }) {
  return (
    <a
      id="menu-link"
      href={site.links.menu}
      target="_blank"
      rel="noopener noreferrer"
      className="group animate-rise relative flex min-h-[5.25rem] items-center gap-4 overflow-hidden rounded-card px-5 py-4 text-[rgb(var(--on-accent))] shadow-hero transition-transform duration-300 active:scale-[0.988] sm:min-h-[5.75rem] sm:px-6"
      style={{
        animationDelay: `${delay}ms`,
        backgroundImage:
          'linear-gradient(135deg, rgb(var(--hero-to)) 0%, rgb(var(--hero-from)) 55%, rgb(var(--accent-deep)) 100%)',
      }}
    >
      {/* Soft corner sheen, always present. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/18 blur-2xl"
      />

      {/* Hover lightens the gold with a thin wash instead of deepening it. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[rgb(var(--on-accent))]/10 ring-1 ring-[rgb(var(--on-accent))]/15">
        <Utensils className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      </span>

      <span className="relative min-w-0 flex-1">
        <span className="block font-display text-[1.15rem] font-extrabold leading-tight tracking-tight sm:text-[1.25rem]">
          Explore Our Menu
        </span>
        <span className="mt-0.5 block text-[0.85rem] font-medium opacity-80">
          Find your next favourite.
        </span>
      </span>

      <ArrowRight
        className="relative h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        strokeWidth={2.2}
        aria-hidden="true"
      />
    </a>
  );
}
