import { IApiResponse, ICourse } from '@/types';
import { Ellipsis } from 'lucide-react';

interface CourseDataTableProps {
  data?: IApiResponse<ICourse[]>;
}

export function CourseDataTable({ data }: CourseDataTableProps) {
  const courses = data?.data || [];

  if (courses.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-gray-500 text-lg'>No courses found</p>
      </div>
    );
  }

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
