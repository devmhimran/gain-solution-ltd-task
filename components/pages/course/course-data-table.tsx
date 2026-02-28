'use client';

import { CourseForm } from '@/components/forms';
import { Button, Modal } from '@/components/shared';
import { useCourses } from '@/hooks';
import { IApiResponse, ICourseWithFaculty } from '@/types';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Ellipsis, SquarePen, Trash } from 'lucide-react';
import { useState } from 'react';

interface CourseDataTableProps {
  data?: IApiResponse<ICourseWithFaculty[]>;
}

export function CourseDataTable({ data }: CourseDataTableProps) {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] =
    useState<ICourseWithFaculty | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const courses = data?.data || [];

  const { updateCourse, deleteCourse } = useCourses();

  if (courses.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-gray-500 text-lg'>No courses found</p>
      </div>
    );
  }

  const handleUpdateCourse = (course: ICourseWithFaculty) => {
    setOpen(true);
    setSelectedCourse(course);
  };

  const handleDeleteCourse = (courseId: string) => {
    setDeleteOpen(true);
    setSelectedCourseId(courseId);
  };

  return (
    <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Course ID
            </th>
            <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Course Name
            </th>
            <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Faculty Members
            </th>
            <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Enrollment
            </th>
            <th className='px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Options
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {courses.map((course) => (
            <tr
              key={course.id}
              className='hover:bg-gray-50 transition-colors duration-150'
            >
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                {course.id}
              </td>
              <td className='px-6 py-4 text-sm text-gray-900'>{course.name}</td>
              <td className='px-6 py-4 text-sm text-gray-900'>
                {course.faculty?.length > 0 ? (
                  <div className='flex flex-wrap gap-2'>
                    {course.faculty.map((faculty) => (
                      <span
                        key={faculty.id}
                        className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800'
                      >
                        {faculty.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className='text-gray-400 italic'>
                    No faculty assigned
                  </span>
                )}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    course.enrolledCount >= 45
                      ? 'bg-green-100 text-green-800'
                      : course.enrolledCount >= 30
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-orange-100 text-orange-800'
                  }`}
                >
                  {course.enrolledCount} students
                </span>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex justify-center'>
                <Menu>
                  <MenuButton className='p-2 rounded-full hover:bg-gray-100 transition-colors'>
                    <Ellipsis className='w-5 h-5 text-slate-600 mx-auto' />
                  </MenuButton>
                  <MenuItems
                    anchor='bottom'
                    className='bg-slate-100 rounded w-24'
                  >
                    <MenuItem>
                      <div
                        className='text-sm px-3 py-2 block data-focus:bg-blue-100 cursor-pointer'
                        onClick={() => handleUpdateCourse(course)}
                      >
                        <SquarePen className='inline mr-2 w-4 h-4' />
                        Edit
                      </div>
                    </MenuItem>
                    <hr className='text-gray-200' />
                    <MenuItem>
                      <div
                        className='text-sm px-3 py-2 block data-focus:bg-blue-100 cursor-pointer'
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        <Trash className='inline mr-2 w-4 h-4' />
                        Delete
                      </div>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={open} setIsOpen={setOpen} title='Course Form'>
        <CourseForm
          initialData={selectedCourse || undefined}
          onSubmit={(data) => {
            updateCourse({ ...data, id: selectedCourse?.id || '' });
            setOpen(false);
          }}
        />
      </Modal>
      <Modal
        isOpen={deleteOpen}
        setIsOpen={setDeleteOpen}
        title='Confirm Deletion'
        description='  Are you sure you want to delete this course? This action cannot be undone.'
      >
        <div className='flex justify-end gap-4'>
          <Button variant='secondary' onClick={() => setDeleteOpen(false)}>
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={() => {
              deleteCourse(selectedCourseId || '');
              setDeleteOpen(false);
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
