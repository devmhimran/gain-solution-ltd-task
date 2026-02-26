'use client';

import { getQueryClient } from '@/lib/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

const queryClient = getQueryClient();

export function DefaultProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors position='bottom-left' />
    </QueryClientProvider>
  );
}
