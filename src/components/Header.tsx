import { Moon, Sun } from 'lucide-react';
import type { Theme } from '../hooks/useTheme';

type Props = {
  theme: Theme;
  onToggleTheme: () => void;
};

export function Header({ theme, onToggleTheme }: Props) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <header className="flex items-center justify-between gap-4 pt-5 sm:pt-7">
      <a
        href="#top"
        className="group flex items-center gap-2.5 rounded-full py-1 pr-3 text-ink no-underline"
      >
        <img
          src="/images/chichas-mark-96.png"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 rounded-xl shadow-card ring-1 ring-line"
        />
        <span className="font-display text-[0.9rem] font-800 font-extrabold uppercase tracking-[0.18em]">
          Chicha&rsquo;s
        </span>
      </a>

      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={`Switch to ${nextTheme} theme`}
        title={`Switch to ${nextTheme} theme`}
        className="relative grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink-soft shadow-card transition-colors duration-300 hover:border-accent/60 hover:text-accent-deep"
      >
        <Sun
          className={`absolute h-[1.15rem] w-[1.15rem] transition-all duration-300 ${
            theme === 'dark' ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
          }`}
          strokeWidth={1.9}
          aria-hidden="true"
        />
        <Moon
          className={`absolute h-[1.15rem] w-[1.15rem] transition-all duration-300 ${
            theme === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0'
          }`}
          strokeWidth={1.9}
          aria-hidden="true"
        />
      </button>
    </header>
  );
}
