import { BookOpen, ChartColumnBig, ClipboardMinus, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export const navList = [
  {
    name: 'Dashboard',
    link: '/dashboard',
    icon: ChartColumnBig,
  },
  {
    name: 'Students',
    link: '/dashboard/students',
    icon: Users,
  },
  {
    name: 'Courses',
    link: '/dashboard/courses',
    icon: BookOpen,
  },
  {
    name: 'Reporting & Exporting',
    link: '/dashboard/reporting',
    icon: ClipboardMinus,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div
      className={'bg-white border-gray-200 border-r relative lg:block hidden'}
    >
      <div className='w-62.5 p-4 h-[calc(100vh-65px)] '>
        <div className='flex flex-col gap-2'>
          {navList.map((item) => (
            <Link
              className={cn(
                item.link === pathname ? 'bg-slate-100' : 'bg-white',
                'px-4 py-2 rounded-sm text-sm text-center flex items-center gap-2 text-slate-800 hover:bg-slate-100',
              )}
              key={item.link}
              href={item.link}
            >
              <span>{<item.icon className='w-4 h-4' />}</span>
              <span> {item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
