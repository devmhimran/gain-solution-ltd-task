import { IApiResponse, IStudent } from '@/types';
import { Ellipsis } from 'lucide-react';

interface StudentDataTableProps {
  data?: IApiResponse<IStudent[]>;
}

export function StudentDataTable({ data }: StudentDataTableProps) {
  const students = data?.data || [];

  if (students.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-gray-500 text-lg'>No students found</p>
      </div>
    );
  }

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
                  {student.gpa.toFixed(1)}
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
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 '>
                <Ellipsis className='w-5 h-5 text-slate-600 mx-auto' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
