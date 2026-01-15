'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';

export default function RefreshHandler() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  useEffect(() => {
    const handleFocus = () => onRefresh();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <button 
      onClick={onRefresh}
      disabled={isPending}
      className={`p-2 rounded-full transition-all active:scale-90 ${isPending ? 'opacity-50 rotate-180' : 'opacity-100'}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gentle-gold">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.24L21 8" />
        <path d="M21 3v5h-5" />
      </svg>
    </button>
  );
}