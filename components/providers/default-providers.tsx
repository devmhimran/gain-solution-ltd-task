'use client';

import { Toaster } from 'sonner';

export function DefaultProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster richColors position='bottom-left' />
    </>
  );
}
