'use client';

import { Trophy } from 'lucide-react';

interface TopRankingStudentsProps {
  students: {
    id: string;
    name: string;
    gpa: number;
    year: number;
    coursesCount: number;
  }[];
}

export function TopRankingStudents({ students }: TopRankingStudentsProps) {
  const topStudents = students.slice(0, 10);

  return (
    <div className='bg-white rounded-lg border border-gray-200 shadow-sm p-6'>
      <div className='flex items-center gap-2 mb-6'>
        <Trophy className='w-5 h-5 text-yellow-600' />
        <h2 className='text-xl font-semibold text-slate-800'>
          Top Ranking Students
        </h2>
      </div>

      {topStudents.length === 0 ? (
        <div className='flex items-center justify-center py-12'>
          <p className='text-gray-500 text-lg'>No students found</p>
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
                  Student ID
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Name
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Year
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  GPA
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Courses
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {topStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td className='px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
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
                  <td className='px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {student.id}
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {student.name}
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {student.year}
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.gpa >= 3.7
                          ? 'bg-green-100 text-green-800'
                          : student.gpa >= 3.3
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {student.gpa === 0 ? 'N/A' : student.gpa.toFixed(2)}
                    </span>
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {student.coursesCount}
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
