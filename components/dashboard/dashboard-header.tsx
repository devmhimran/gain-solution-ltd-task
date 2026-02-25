import { ChartNoAxesGantt } from 'lucide-react';

interface DashboardHeaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function DashboardHeader({ open, setOpen }: DashboardHeaderProps) {
  return (
    <div className='px-3 lg:px-10 py-3 border-b border-gray-200 flex justify-between items-center bg-white w-full'>
      <div className='flex gap-2 items-center'>
        <div
          className='lg:hidden block p-1 bg-brand-color-200 rounded-md text-brand-color-500'
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <ChartNoAxesGantt className='text-slate-800' size={30} />
          ) : (
            <ChartNoAxesGantt className='text-slate-800' size={30} />
          )}
        </div>
        <div className='lg:block hidden'>
          <div className='text-base lg:text-lg font-semibold leading-none -mb-1'>
            Dashboard
          </div>
          <small>Academic Management</small>
        </div>
      </div>
    </div>
  );
}
