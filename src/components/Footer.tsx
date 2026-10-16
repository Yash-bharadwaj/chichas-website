import { site } from '../data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 flex flex-col items-center gap-4 border-t border-line/70 pb-10 pt-8 text-center">
      <img
        src="/images/chichas-mark-96.png"
        alt=""
        width={44}
        height={44}
        loading="lazy"
        decoding="async"
        className="h-11 w-11 rounded-2xl shadow-card ring-1 ring-line"
      />

      <div>
        <p className="font-display text-[0.95rem] font-extrabold uppercase tracking-[0.2em] text-ink">
          Chicha&rsquo;s
        </p>
        <p className="mt-1 text-[0.8rem] text-ink-soft">{site.descriptor}</p>
      </div>

      <p className="text-[0.72rem] text-ink-faint/80">
        &copy; {year} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
