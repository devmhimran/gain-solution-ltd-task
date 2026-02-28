'use client';

import { StudentForm } from '@/components/forms';
import { Button, Modal } from '@/components/shared';
import { useStudents } from '@/hooks';
import { IApiResponse, IStudentWithCourses } from '@/types';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Ellipsis, SquarePen, Trash } from 'lucide-react';
import { useState } from 'react';

interface StudentDataTableProps {
  data?: IApiResponse<IStudentWithCourses[]>;
}

export function StudentDataTable({ data }: StudentDataTableProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<IStudentWithCourses | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null,
  );
  const students = data?.data || [];

  const { deleteStudent, updateStudent } = useStudents();

  if (students.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-gray-500 text-lg'>No students found</p>
      </div>
    );
  }

  const handleUpdateStudent = (student: IStudentWithCourses) => {
    setUpdateOpen(true);
    setSelectedStudent(student);
  };

  const handleDeleteStudent = (studentId: string) => {
    setDeleteOpen(true);
    setSelectedStudentId(studentId);
  };

  return (
    <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Student ID
            </th>
            <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Name
            </th>
            <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              GPA
            </th>
            <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Year
            </th>
            <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Courses
            </th>
            <th className='px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Options
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {students.map((student) => (
            <tr
              key={student.id}
              className='hover:bg-gray-50 transition-colors duration-150'
            >
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                {student.id}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {student.name}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    student.gpa >= 3.7
                      ? 'bg-green-100 text-green-800'
                      : student.gpa >= 3.3
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {student?.gpa?.toFixed(1) === '0.0'
                    ? 'N/A'
                    : student?.gpa?.toFixed(1) || 'N/A'}
                </span>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {student.year}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {student.courses?.length > 0 ? (
                  <div className='flex flex-col gap-1'>
                    {student.courses.map((course) => (
                      <span
                        key={course.id}
                        className='inline-flex items-center px-2 py-1 rounded-md text-xs bg-indigo-50 text-indigo-700'
                      >
                        {course.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className='text-gray-400 italic'>No courses</span>
                )}
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
                        onClick={() => handleUpdateStudent(student)}
                      >
                        <SquarePen className='inline mr-2 w-4 h-4' />
                        Edit
                      </div>
                    </MenuItem>
                    <hr className='text-gray-200' />
                    <MenuItem>
                      <div
                        className='text-sm px-3 py-2 block data-focus:bg-blue-100 cursor-pointer'
                        onClick={() => handleDeleteStudent(student.id)}
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
      <Modal
        isOpen={deleteOpen}
        setIsOpen={setDeleteOpen}
        title='Confirm Deletion'
        description='  Are you sure you want to delete this student? This action cannot be undone.'
      >
        <div className='flex justify-end gap-4'>
          <Button variant='secondary' onClick={() => setDeleteOpen(false)}>
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={() => {
              deleteStudent(selectedStudentId || '');
              setDeleteOpen(false);
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={updateOpen}
        setIsOpen={setUpdateOpen}
        title='Update Student'
        description='  Update the student details.'
      >
        <StudentForm
          mode='update'
          defaultValues={
            selectedStudent
              ? {
                  name: selectedStudent.name,
                  year: selectedStudent.year,
                  grades: selectedStudent.grades.map((g) => ({
                    courseId: g.courseId,
                    grade: g.grade,
                    term: g.term,
                  })),
                }
              : null
          }
          onSubmit={(data) =>
            updateStudent({
              studentId: selectedStudent?.id || '',
              data,
            }).then(() => setUpdateOpen(false))
          }
        />
      </Modal>
    </div>
  );
}
