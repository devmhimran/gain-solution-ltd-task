'use client';

import Link from 'next/link';

import { Sidebar } from '../shared/sidebar';
import { navList } from './dashboard-sidebar';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface DashboardPhoneSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function DashboardPhoneSidebar({
  isOpen,
  setIsOpen,
}: DashboardPhoneSidebarProps) {
  const pathname = usePathname();
  return (
    <Sidebar
      side='left'
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title='Dashboard'
      description='Academic Management'
    >
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          {navList.map((item) => (
            <Link
              className={cn(
                item.link === pathname ? 'bg-slate-100' : 'bg-white',
                'px-4 py-2 rounded-sm text-sm text-center flex items-center gap-2 text-slate-800 hover:bg-slate-100',
              )}
              key={item.link}
              href={item.link}
              onClick={() => setIsOpen(false)}
            >
              <span>{<item.icon className='w-4 h-4' />}</span>
              <span> {item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </Sidebar>
  );
}
