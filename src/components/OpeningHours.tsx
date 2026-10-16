import { Clock } from 'lucide-react';
import { hourGroups } from '../data/site';
import { useOpeningStatus } from '../hooks/useOpeningStatus';

export function OpeningHours({ delay = 0 }: { delay?: number }) {
  const status = useOpeningStatus();

  return (
    <section
      className="surface-card animate-rise p-5"
      style={{ animationDelay: `${delay}ms` }}
      aria-labelledby="hours-heading"
    >
      <div className="flex items-start gap-4">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-deep"
          aria-hidden="true"
        >
          <Clock className="h-5 w-5" strokeWidth={2} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h2
              id="hours-heading"
              className="font-display text-[1rem] font-bold tracking-tight text-ink"
            >
              Opening Hours
            </h2>

            {status && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] ${
                  status.isOpen
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                    : 'bg-ink-faint/10 text-ink-faint'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    status.isOpen ? 'bg-emerald-500' : 'bg-ink-faint'
                  }`}
                  aria-hidden="true"
                />
                {status.isOpen ? 'Open now' : 'Closed'}
              </span>
            )}
          </div>

          {/* One short line of context instead of a run-on footnote. */}
          <p className="mt-1 text-[0.84rem] text-ink-faint">
            {status ? `${status.detail} ET` : 'Times shown in ET.'}
          </p>

          <dl className="mt-3 space-y-2.5">
            {hourGroups.map((group) => {
              const isToday = status ? (group.days as readonly number[]).includes(status.today) : false;
              return (
                <div
                  key={group.label}
                  className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 rounded-xl px-2.5 py-2 transition-colors ${
                    isToday ? 'bg-accent-soft/70' : ''
                  }`}
                >
                  <dt
                    className={`text-[0.87rem] ${
                      isToday ? 'font-semibold text-ink' : 'text-ink-soft'
                    }`}
                  >
                    {group.label}
                    {isToday && (
                      <span className="ml-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-accent-deep">
                        Today
                      </span>
                    )}
                  </dt>
                  <dd
                    className={`text-[0.87rem] tabular-nums ${
                      isToday ? 'font-semibold text-ink' : 'text-ink-soft'
                    }`}
                  >
                    {group.hours}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
