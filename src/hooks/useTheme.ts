import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'chichas-theme';

/** Browser chrome colour per theme, mirrored into the theme-color meta tag. */
const THEME_COLOR: Record<Theme, string> = {
  dark: '#16100C',
  light: '#FFF6E6',
};

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  // index.html has already applied the saved choice, defaulting to dark,
  // before first paint — so we simply adopt whatever it set.
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLOR[theme]);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Private browsing / blocked storage: the theme still applies for this visit.
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}
