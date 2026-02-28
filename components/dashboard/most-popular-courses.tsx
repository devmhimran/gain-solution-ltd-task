'use client';

import { TrendingUp } from 'lucide-react';

interface MostPopularCoursesProps {
  courses: {
    id: string;
    name: string;
    enrollmentCount: number;
    facultyCount: number;
  }[];
}

export function MostPopularCourses({ courses }: MostPopularCoursesProps) {
  const popularCourses = courses.slice(0, 10);

  return (
    <div className='bg-white rounded-lg border border-gray-200 shadow-sm p-6'>
      <div className='flex items-center gap-2 mb-6'>
        <TrendingUp className='w-5 h-5 text-green-600' />
        <h2 className='text-xl font-semibold text-slate-800'>
          Most Popular Courses
        </h2>
      </div>

      {popularCourses.length === 0 ? (
        <div className='flex items-center justify-center py-12'>
          <p className='text-gray-500 text-lg'>No courses found</p>
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Rank
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Course ID
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Course Name
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Enrollments
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Faculty
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {popularCourses.map((course, index) => (
                <tr
                  key={course.id}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td className='px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        index === 0
                          ? 'bg-green-100 text-green-800'
                          : index === 1
                            ? 'bg-blue-100 text-blue-800'
                            : index === 2
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-50 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </span>
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {course.id}
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-900'>
                    {course.name}
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800'>
                      {course.enrollmentCount} students
                    </span>
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {course.facultyCount} faculty
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
