/**
 * A hand-drawn swash that sits under the headline: one tapered brush stroke, a
 * lighter second pass beneath it, and small ink accents at either tip. It draws
 * itself in on load, the accents pop after the stroke lands, and a soft sheen
 * travels along the ink every few seconds.
 */
export function HeadlineFlourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 28"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="chichas-swash" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(var(--hero-to))" />
          <stop offset="48%" stopColor="rgb(var(--accent))" />
          <stop offset="100%" stopColor="rgb(var(--accent-deep))" />
        </linearGradient>

        <linearGradient id="chichas-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        {/* The sheen is clipped to the ink, so the light never spills. */}
        <clipPath id="chichas-swash-clip">
          <path d="M6 17.6C64 8.6 168 5 236 7.2c8 .4 14-.8 18-3 -4 4-10 6.2-18 6.4-68 1-172 4-230 9.8 0-.9 0-1.8 0-2.8Z" />
          <path d="M30 23.6C72 20.4 120 19.2 168 19.8c-46 2-94 3.4-138 3.8Z" />
        </clipPath>
      </defs>

      <g fill="url(#chichas-swash)">
        {/* Main stroke: thick through the middle, tapering to a point at each
            end, finishing with a small upward flick. */}
        <path d="M6 17.6C64 8.6 168 5 236 7.2c8 .4 14-.8 18-3 -4 4-10 6.2-18 6.4-68 1-172 4-230 9.8 0-.9 0-1.8 0-2.8Z" />
        {/* Lighter second pass, the way a marker doubles back. */}
        <path d="M30 23.6C72 20.4 120 19.2 168 19.8c-46 2-94 3.4-138 3.8Z" opacity="0.5" />
        {/* Ink accents at either tip. */}
        <circle className="animate-ink" cx="2" cy="20.6" r="1.9" opacity="0.8" style={{ animationDelay: '320ms' }} />
        <circle className="animate-ink" cx="257.5" cy="2.8" r="1.3" opacity="0.6" style={{ animationDelay: '440ms' }} />
      </g>

      <g clipPath="url(#chichas-swash-clip)">
        <rect
          className="animate-sheen"
          x="-90"
          y="0"
          width="70"
          height="28"
          fill="url(#chichas-sheen)"
          style={{ animationDelay: '1.4s' }}
        />
      </g>
    </svg>
  );
}
