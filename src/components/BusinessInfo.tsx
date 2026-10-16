import { ArrowUpRight, MapPin } from 'lucide-react';
import { site } from '../data/site';

/** Location card: address that is easy to read, select and copy on a phone. */
export function BusinessInfo({ delay = 0 }: { delay?: number }) {
  return (
    <section
      className="surface-card animate-rise p-5"
      style={{ animationDelay: `${delay}ms` }}
      aria-labelledby="location-heading"
    >
      <div className="flex items-start gap-4">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-deep"
          aria-hidden="true"
        >
          <MapPin className="h-5 w-5" strokeWidth={2} />
        </span>

        <div className="min-w-0 flex-1">
          <h2
            id="location-heading"
            className="font-display text-[1rem] font-bold tracking-tight text-ink"
          >
            {site.name}
          </h2>
          <address className="mt-1 text-[0.9rem] not-italic leading-relaxed text-ink-soft">
            {site.address.line1}
            <br />
            {site.address.line2}
          </address>
        </div>
      </div>

      <a
        href={site.links.directions}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-4 flex min-h-[3rem] items-center justify-center gap-2 rounded-2xl border border-accent/45 bg-accent-soft/60 px-4 text-[0.92rem] font-semibold text-accent-deep transition-colors duration-300 hover:border-accent hover:bg-accent-soft"
      >
        Get Directions
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={2.4}
          aria-hidden="true"
        />
      </a>
    </section>
  );
}
