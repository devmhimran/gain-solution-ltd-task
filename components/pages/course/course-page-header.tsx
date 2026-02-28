'use client';

import { CourseForm } from '@/components/forms';
import { Button, Input, Modal } from '@/components/shared';
import { useCourses } from '@/hooks';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface CoursePageHeaderProps {
  searchQuery: string;
  searchQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CoursePageHeader({
  searchQuery,
  searchQueryChange,
}: CoursePageHeaderProps) {
  const [open, setOpen] = useState(false);
  const { createCourses } = useCourses();

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='text-slate-800 font-semibold text-2xl'>Courses</div>
        <div>
          <Button leftIcon={<Plus />} onClick={() => setOpen(true)}>
            Create Course
          </Button>
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
        </div>
      </div>
      <Modal isOpen={open} setIsOpen={setOpen} title='Course Form'>
        <CourseForm
          onSubmit={(data) => createCourses(data).then(() => setOpen(false))}
        />
      </Modal>
    </>
  );
}
