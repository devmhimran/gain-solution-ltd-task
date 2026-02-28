import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  iconBgColor = 'bg-blue-100',
  iconColor = 'text-blue-600',
}: StatsCardProps) {
  return (
    <div className='bg-white rounded-lg border border-gray-200 shadow-sm p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex-1'>
          <p className='text-sm font-medium text-gray-500 uppercase tracking-wider'>
            {title}
          </p>
          <p className='mt-2 text-3xl font-bold text-gray-900'>{value}</p>
        </div>
        <div className={`${iconBgColor} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
