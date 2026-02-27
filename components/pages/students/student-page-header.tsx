import { Button, Input } from '@/components/shared';
import { getYearsFrom2020 } from '@/lib/utils';
import { Select } from '@headlessui/react';
import { Plus } from 'lucide-react';

interface StudentPageHeaderProps {
  searchQuery: string;
  searchQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setParams: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function StudentPageHeader({
  searchQuery,
  searchQueryChange,
  setParams,
}: StudentPageHeaderProps) {
  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='text-slate-800 font-semibold text-2xl'>Students</div>
        <div>
          <Button leftIcon={<Plus />}>Create Student</Button>
        </div>
      </div>

      <div className='bg-white p-4 rounded-lg border border-slate-200'>
        <h2 className='text-xl font-semibold text-slate-800 mb-6'>
          Search & Filters
        </h2>
        <div className=' flex gap-4 items-start'>
          <div className='w-full'>
            <Input
              type='email'
              placeholder='Search by student name or course'
              value={searchQuery}
              onChange={searchQueryChange}
            />
          </div>
          <Select
            name='status'
            aria-label='Project status'
            data-placeholder='Please select a product'
            data-focus
            data-hover
            className='w-3/6 md:w-1/6 border border-gray-300 rounded-md bg-white px-3 py-2.5 text-sm 
            ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium 
            placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 
            focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all'
            onChange={setParams}
          >
            <option value='' selected>
              Select year
            </option>
            {getYearsFrom2020().map((year) => (
              <option key={year} value={year} className='text-sm'>
                {year}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
}
