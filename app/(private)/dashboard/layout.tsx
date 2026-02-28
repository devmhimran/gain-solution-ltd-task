'use client';

import { useEffect, useRef, useState } from 'react';

import {
  DashboardHeader,
  DashboardPhoneSidebar,
  DashboardSidebar,
} from '@/components/dashboard';
import { cn } from '@/lib/utils';
import { useHydrateStore } from '@/hooks/use-hydrate-store';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useHydrateStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <DashboardHeader setOpen={setIsOpen} open={isOpen} />
      <div className={cn('lg:flex block')}>
        <DashboardSidebar />
        <div className='py-5 px-3 lg:px-10 h-[calc(100vh-80px)] w-full flex flex-col overflow-y-auto bg-slate-100/50'>
          {children}
        </div>
      </div>
      <DashboardPhoneSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
