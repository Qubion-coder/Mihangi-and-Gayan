import { useEffect, useState, type ReactNode } from 'react';

interface DeferredMountProps {
  active: boolean;
  delay?: number;
  children: ReactNode;
  /** Reserve space so layout does not jump while waiting to mount */
  minHeight?: string;
}

/**
 * Mount children after a short delay once `active` is true.
 * Spreads heavy section work across frames so iOS Safari can paint reliably.
 */
export function DeferredMount({
  active,
  delay = 0,
  children,
  minHeight = '1px',
}: DeferredMountProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!active) {
      setMounted(false);
      return;
    }

    if (delay <= 0) {
      const frame = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(frame);
    }

    const timer = window.setTimeout(() => setMounted(true), delay);
    return () => window.clearTimeout(timer);
  }, [active, delay]);

  if (!active || !mounted) {
    return <div aria-hidden="true" style={{ minHeight }} />;
  }

  return <>{children}</>;
}
