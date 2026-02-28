'use client';

import { exportToCSV } from '@/lib/export-utils';
import { Button } from '@/components/shared';
import { Download } from 'lucide-react';

interface CourseEnrollmentReportProps {
  data: {
    courseId: string;
    courseName: string;
    totalEnrollments: number;
    totalGrades: number;
  }[];
}

export function CourseEnrollmentReport({ data }: CourseEnrollmentReportProps) {
  const handleExport = () => {
    const exportData = data.map((item) => ({
      'Course ID': item.courseId,
      'Course Name': item.courseName,
      'Total Students': item.totalEnrollments,
      'Total Grades Recorded': item.totalGrades,
    }));
    exportToCSV(exportData, 'course-enrollment-report');
  };

  return (
    <div className='bg-white rounded-lg border border-gray-200 shadow-sm p-6'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h2 className='text-xl font-semibold text-slate-800'>
            Course Enrollment Report
          </h2>
          <p className='text-sm text-gray-500 mt-1'>
            Overview of student enrollments per course
          </p>
        </div>
        <Button
          onClick={handleExport}
          leftIcon={<Download className='w-4 h-4' />}
          variant='secondary'
        >
          Export CSV
        </Button>
      </div>

      {data.length === 0 ? (
        <div className='flex items-center justify-center py-12'>
          <p className='text-gray-500 text-lg'>No enrollment data found</p>
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Course ID
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Course Name
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Total Students
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Total Grades
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {data.map((course) => (
                <tr
                  key={course.courseId}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {course.courseId}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {course.courseName}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800'>
                      {course.totalEnrollments}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {course.totalGrades}
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
