'use client';

import { exportToCSV } from '@/lib/export-utils';
import { Button } from '@/components/shared';
import { Download } from 'lucide-react';
import { useState } from 'react';

interface TopPerformersByCourseProps {
  data: {
    courseId: string;
    courseName: string;
    topPerformers: {
      studentId: string;
      studentName: string;
      grade: string;
      gradePoint: number;
      term: string;
    }[];
  }[];
}

export function TopPerformersByCourse({ data }: TopPerformersByCourseProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const selectedCourse = (() => {
    if (selectedCourseId && data.some((c) => c.courseId === selectedCourseId)) {
      return selectedCourseId;
    }
    return data[0]?.courseId || '';
  })();

  const currentCourse = data.find((c) => c.courseId === selectedCourse);

  const handleExport = () => {
    if (!currentCourse) return;

    const exportData = currentCourse.topPerformers.map((student, index) => ({
      Rank: index + 1,
      'Student ID': student.studentId,
      'Student Name': student.studentName,
      Grade: student.grade,
      'Grade Point': student.gradePoint.toFixed(2),
      Term: student.term,
    }));

    exportToCSV(
      exportData,
      `top-performers-${currentCourse.courseName.replace(/\s+/g, '-')}`,
    );
  };

  const handleExportAll = () => {
    const exportData = data.flatMap((course) =>
      course.topPerformers.map((student, index) => ({
        'Course ID': course.courseId,
        'Course Name': course.courseName,
        Rank: index + 1,
        'Student ID': student.studentId,
        'Student Name': student.studentName,
        Grade: student.grade,
        'Grade Point': student.gradePoint.toFixed(2),
        Term: student.term,
      })),
    );

    exportToCSV(exportData, 'all-top-performers-by-course');
  };

  return (
    <div className='bg-white rounded-lg border border-gray-200 shadow-sm p-6'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h2 className='text-xl font-semibold text-slate-800'>
            Top Performers by Course
          </h2>
          <p className='text-sm text-gray-500 mt-1'>
            Top 5 students in each course based on grades
          </p>
        </div>
        <div className='flex gap-2'>
          <Button
            onClick={handleExport}
            leftIcon={<Download className='w-4 h-4' />}
            variant='secondary'
            disabled={!currentCourse}
          >
            Export Current
          </Button>
          <Button
            onClick={handleExportAll}
            leftIcon={<Download className='w-4 h-4' />}
          >
            Export All
          </Button>
        </div>
      </div>

      {data.length === 0 ? (
        <div className='flex items-center justify-center py-12'>
          <p className='text-gray-500 text-lg'>No course data found</p>
        </div>
      ) : (
        <>
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Select Course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className='w-full md:w-1/2 border border-gray-300 rounded-md bg-white px-3 py-2.5 text-sm 
              ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 
              focus-visible:ring-offset-2 transition-all'
            >
              {data.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          {currentCourse && (
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Rank
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Student ID
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Student Name
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Grade
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Term
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {currentCourse.topPerformers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className='px-6 py-8 text-center text-gray-500'
                      >
                        No students enrolled in this course
                      </td>
                    </tr>
                  ) : (
                    currentCourse.topPerformers.map((student, index) => (
                      <tr
                        key={`${student.studentId}-${student.term}`}
                        className='hover:bg-gray-50 transition-colors'
                      >
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                              index === 0
                                ? 'bg-yellow-100 text-yellow-800'
                                : index === 1
                                  ? 'bg-gray-200 text-gray-800'
                                  : index === 2
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-gray-50 text-gray-600'
                            }`}
                          >
                            {index + 1}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {student.studentId}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {student.studentName}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              student.gradePoint >= 3.7
                                ? 'bg-green-100 text-green-800'
                                : student.gradePoint >= 3.3
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {student.grade}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {student.term}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
