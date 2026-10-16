import type { SVGProps } from 'react';

/**
 * The page's custom backdrop: warm saffron washes, a whisper of paper grain and
 * original hand-drawn-style line art echoing the spices, pots and utensils in
 * the CHICHA'S logo. Everything sits at the outer edges and at very low
 * contrast so the content column always stays the focal point.
 */

type ArtProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

function Chilli(props: ArtProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      <g {...stroke}>
        <path d="M44 22c-1-6 3-11 9-12M53 10c4 1 7 4 8 8" />
        <path d="M52 19c7 7 9 17 6 27-4 14-16 25-31 29-4 1-7 1-9-1 7-6 11-13 14-22 3-10 5-20 9-27 2-4 6-7 11-6Z" />
        <path d="M44 31c3 8 2 18-3 27" />
      </g>
    </svg>
  );
}

function Sprig(props: ArtProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      <g {...stroke}>
        <path d="M14 86C30 72 48 52 62 28" />
        <path d="M38 56c-5-8-4-16 2-22 6 5 7 14 2 22Z" />
        <path d="M46 46c8-3 15 0 18 7-7 5-15 4-20-2Z" />
        <path d="M27 70c-6-6-7-14-2-20 6 4 9 12 5 19Z" />
        <path d="M56 28c8-4 16-2 20 5-7 5-16 4-21-2Z" />
        <path d="M62 28c3-8 10-12 18-10-1 8-8 14-16 13Z" />
      </g>
    </svg>
  );
}

function StarAnise(props: ArtProps) {
  const petals = Array.from({ length: 8 }, (_, index) => index * 45);
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      <g {...stroke}>
        {petals.map((angle) => (
          <path
            key={angle}
            d="M50 50c5-4 9-12 7-20-4-4-10-4-14 0-2 8 2 16 7 20Z"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
        <circle cx="50" cy="50" r="7" />
      </g>
    </svg>
  );
}

function Handi(props: ArtProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      <g {...stroke}>
        <path d="M22 40h56M26 40c-3 18 2 34 12 42h24c10-8 15-24 12-42" />
        <path d="M22 40c-5-2-8-5-8-9 0-5 6-9 14-10M78 40c5-2 8-5 8-9 0-5-6-9-14-10" />
        <path d="M34 22c0-6 7-10 16-10s16 4 16 10" />
        <path d="M38 54c8 4 16 4 24 0M36 66c9 4 19 4 28 0" />
      </g>
    </svg>
  );
}

function Skimmer(props: ArtProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      <g {...stroke}>
        <circle cx="38" cy="62" r="24" />
        <path d="M56 46 84 18M84 18c3-3 7-3 9 0 3 3 3 7 0 9" />
        <circle cx="31" cy="56" r="3" />
        <circle cx="45" cy="56" r="3" />
        <circle cx="38" cy="66" r="3" />
        <circle cx="26" cy="68" r="3" />
        <circle cx="50" cy="68" r="3" />
      </g>
    </svg>
  );
}

function Mortar(props: ArtProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      <g {...stroke}>
        <path d="M24 52h52c-2 18-10 30-26 30S26 70 24 52Z" />
        <path d="M18 46h64" />
        <path d="M58 44 70 20c2-4 7-5 10-3 4 2 5 6 3 10L70 48" />
      </g>
    </svg>
  );
}

function Arch(props: ArtProps) {
  // A cusped doorway arch, the kind framing the Charminar in the logo.
  return (
    <svg viewBox="0 0 100 130" aria-hidden="true" {...props}>
      <g {...stroke}>
        <path d="M18 126V60c0-11 5-21 14-27 7-5 11-11 13-19 2 8 6 14 13 19 9 6 14 16 14 27v66" />
        <path d="M30 126V62c0-8 4-15 10-19 4-3 8-8 10-13 2 5 5 10 10 13 6 4 10 11 10 19v64" />
        <path d="M45 14c0-4 2-7 5-10 3 3 5 6 5 10" />
        <path d="M38 126h24M34 92h32" />
      </g>
    </svg>
  );
}

function Dots({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" aria-hidden="true" className={className}>
      <g fill="currentColor">
        {Array.from({ length: 4 }, (_, row) =>
          Array.from({ length: 4 }, (_, column) => (
            <circle key={`${row}-${column}`} cx={8 + column * 15} cy={8 + row * 15} r="1.8" />
          )),
        )}
      </g>
    </svg>
  );
}

/** Slow-rising spice motes, kept to the margins and well under the content. */
const MOTES = [
  { left: '4%', top: '24%', size: 5, duration: 19, delay: 0 },
  { left: '9%', top: '58%', size: 3, duration: 24, delay: 4 },
  { left: '14%', top: '82%', size: 4, duration: 21, delay: 9 },
  { left: '2%', top: '44%', size: 3, duration: 26, delay: 13 },
  { left: '88%', top: '30%', size: 4, duration: 22, delay: 2 },
  { left: '94%', top: '66%', size: 5, duration: 18, delay: 7 },
  { left: '82%', top: '88%', size: 3, duration: 25, delay: 11 },
  { left: '97%', top: '48%', size: 3, duration: 20, delay: 15 },
  { left: '34%', top: '94%', size: 3, duration: 27, delay: 5 },
  { left: '66%', top: '12%', size: 4, duration: 23, delay: 10 },
];

function Motes() {
  return (
    <div className="absolute inset-0" style={{ opacity: 'var(--mote-opacity)' }}>
      {MOTES.map((mote) => (
        <span
          key={`${mote.left}-${mote.top}`}
          className="animate-mote absolute rounded-full bg-[rgb(var(--accent))]"
          style={{
            left: mote.left,
            top: mote.top,
            width: mote.size,
            height: mote.size,
            animationDuration: `${mote.duration}s`,
            animationDelay: `-${mote.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function BackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    >
      {/* Warm saffron light, strongest at the top where the logo sits. */}
      <div
        className="animate-breathe absolute -inset-[10%]"
        style={{
          background:
            'radial-gradient(70rem 42rem at 50% -14%, rgb(var(--wash-a) / var(--wash-opacity)), transparent 62%), radial-gradient(48rem 38rem at 108% 18%, rgb(var(--wash-b) / calc(var(--wash-opacity) * 0.8)), transparent 60%), radial-gradient(46rem 40rem at -10% 88%, rgb(var(--wash-a) / calc(var(--wash-opacity) * 0.6)), transparent 62%)',
          transition: 'background 0.35s ease',
        }}
      />

      {/* Paper grain: one tiny generated tile, cheap to paint. */}
      <div
        className="absolute inset-0 mix-blend-multiply dark:mix-blend-screen"
        style={{
          opacity: 'var(--grain-opacity)',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.26'/%3E%3C/svg%3E\")",
          backgroundSize: '140px 140px',
        }}
      />

      <Motes />

      {/* Line art. Kept to the margins; the widest pieces only appear once there
          is gutter space beside the content column. */}
      <div
        className="absolute inset-0 text-[rgb(var(--decor))]"
        style={{ opacity: 'var(--decor-opacity)' }}
      >
        <Sprig className="animate-sway-slow absolute -left-6 top-10 h-36 w-36 sm:left-2 sm:h-44 sm:w-44 lg:left-[6%] lg:top-20 lg:h-56 lg:w-56" />
        <Skimmer className="animate-pendulum absolute -right-6 top-6 h-32 w-32 sm:right-2 sm:h-40 sm:w-40 lg:right-[7%] lg:top-16 lg:h-52 lg:w-52" />
        <Chilli className="animate-sway absolute -right-8 top-[42%] h-28 w-28 sm:right-0 lg:right-[9%] lg:h-40 lg:w-40" />
        <Handi className="absolute -left-8 bottom-16 h-32 w-32 sm:left-0 sm:h-40 sm:w-40 lg:left-[8%] lg:bottom-24 lg:h-52 lg:w-52" />
        <StarAnise className="animate-turn absolute left-[3%] top-[52%] hidden h-24 w-24 sm:block lg:left-[14%] lg:h-32 lg:w-32" />
        <Mortar className="absolute -right-6 bottom-10 hidden h-32 w-32 sm:block lg:right-[11%] lg:bottom-[14%] lg:h-48 lg:w-48" />
        {/* Arches live in the outer gutters only — never behind the content. */}
        <Arch className="absolute -left-10 top-[20%] hidden h-72 w-56 xl:block" />
        <Dots className="absolute left-[3%] top-[72%] hidden h-14 w-14 lg:block" />
        <Dots className="absolute right-[3%] bottom-[46%] hidden h-14 w-14 lg:block" />
      </div>
    </div>
  );
}
