import { useEffect, useState } from 'react';
import { openingStatusAt, type OpeningStatus } from '../lib/openingHours';

export type { OpeningStatus };

/** Live open/closed state for CHICHA'S, recomputed every half minute. */
export function useOpeningStatus(): OpeningStatus | null {
  const [status, setStatus] = useState<OpeningStatus | null>(() => openingStatusAt(new Date()));

  useEffect(() => {
    setStatus(openingStatusAt(new Date()));
    const timer = window.setInterval(() => setStatus(openingStatusAt(new Date())), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return status;
}
