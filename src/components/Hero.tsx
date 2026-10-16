import { HeadlineFlourish } from './HeadlineFlourish';
import { site } from '../data/site';

export function Hero() {
  return (
    <section className="pt-7 text-center sm:pt-9">
      {/* The supplied logo, untouched: original artwork, original proportions. */}
      <div className="animate-bloom mx-auto w-[10.25rem] sm:w-[11.5rem] lg:w-[12.5rem]">
        <picture>
          <source type="image/webp" srcSet={site.logo.srcSetWebp} sizes="(min-width: 1024px) 200px, (min-width: 640px) 184px, 164px" />
          <img
            src={site.logo.src}
            srcSet={site.logo.srcSetJpg}
            sizes="(min-width: 1024px) 200px, (min-width: 640px) 184px, 164px"
            width={site.logo.width}
            height={site.logo.height}
            alt={site.logo.alt}
            fetchPriority="high"
            decoding="async"
            className="h-auto w-full rounded-[1.75rem] shadow-hero ring-1 ring-black/5 dark:ring-white/10"
          />
        </picture>
      </div>

      <p
        className="animate-rise mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-accent-deep sm:text-xs"
        style={{ animationDelay: '80ms' }}
      >
        Indian Street Food &amp; Boba
      </p>

      {/* Kept on a single line at every width: the size scales with the
          viewport instead of wrapping. */}
      <h1
        className="animate-rise mt-3 whitespace-nowrap font-display font-extrabold leading-[1.12] tracking-tight text-ink"
        style={{ animationDelay: '140ms', fontSize: 'clamp(1.3rem, 6.6vw, 2.3rem)' }}
      >
        Big Flavours. Good Vibes.
      </h1>

      <div className="animate-sweep mt-2 flex justify-center" style={{ animationDelay: '220ms' }}>
        <HeadlineFlourish className="h-[1.6rem] w-[min(76vw,16.5rem)]" />
      </div>
    </section>
  );
}
