import { cn } from '@/lib/utils';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({
  className,
  label,
  type = 'text',
  id,
  ...props
}: InputProps) {
  return (
    <div className='w-full text-left flex flex-col gap-2.5'>
      {label && (
        <label
          htmlFor={id}
          className='text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={cn(
          'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all',

          className,
        )}
        {...props}
      />
    </div>
  );
}
