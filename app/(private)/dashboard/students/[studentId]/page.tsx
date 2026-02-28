'use client';

import { useGetStudentById } from '@/hooks/use-students';
import { ICourseWithFaculty, IGrades, IMetadata } from '@/types';
import { useParams } from 'next/navigation';

export default function StudentDetails() {
  const { studentId } = useParams();
  const { data, isLoading } = useGetStudentById(studentId as string);

  if (isLoading)
    return (
      <div className='p-8 animate-pulse text-slate-500'>
        Loading student profile...
      </div>
    );
  if (!data) return <div className='p-8 text-red-500'>Student not found.</div>;

  return (
    <div className='min-h-screen bg-slate-50 p-4 md:p-8'>
      <div className='max-w-5xl mx-auto space-y-6'>
        {/* Header Section */}
        <header className='bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-slate-900'>{data.name}</h1>
            <p className='text-slate-500 font-medium'>
              Class of {data.year} • ID: {data.id}
            </p>
          </div>
          <div className='bg-indigo-50 border border-indigo-100 rounded-xl px-5 py-3 text-center'>
            <p className='text-xs font-semibold text-indigo-600 uppercase tracking-wider'>
              Cumulative GPA
            </p>
            <p className='text-3xl font-black text-indigo-700'>
              {data.gpa.toFixed(2)}
            </p>
          </div>
        </header>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Courses List */}
          <div className='lg:col-span-2 space-y-4'>
            <h2 className='text-xl font-semibold text-slate-800 px-1'>
              Enrolled Courses
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {data.courses.map((course: ICourseWithFaculty) => (
                <div
                  key={course.id}
                  className='bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow'
                >
                  <div className='flex justify-between items-start mb-3'>
                    <h3 className='font-bold text-slate-900 leading-tight'>
                      {course.name}
                    </h3>
                    <span className='text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-mono'>
                      {course.id}
                    </span>
                  </div>

                  <div className='space-y-3'>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs text-slate-400 font-medium uppercase'>
                        Instructors:
                      </span>
                      <div className='flex -space-x-2'>
                        {course?.faculty &&
                          course.faculty.map((f) => (
                            <div
                              key={f.id}
                              title={f.name}
                              className='w-7 h-7 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600'
                            >
                              {String(f.name || f.id)
                                .split(' ')
                                .map((p) => p[0])
                                .join('')
                                .toUpperCase()}
                            </div>
                          ))}
                      </div>
                    </div>

                    {course.metadata.map((meta: IMetadata) => (
                      <div
                        key={meta.key}
                        className='flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2 border border-slate-100'
                      >
                        <span className='text-xs text-slate-500 capitalize'>
                          {meta.key}
                        </span>
                        <span className='text-xs font-semibold text-slate-700'>
                          {meta.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-semibold text-slate-800 px-1'>
              Recent Grades
            </h2>
            <div className='bg-white rounded-2xl p-5 shadow-xl shadow-slate-200 text-white border border-slate-200'>
              <div className='divide-y divide-slate-200'>
                {data.grades.map((grade: IGrades) => (
                  <div
                    key={grade.id}
                    className='py-3 flex justify-between items-center group'
                  >
                    <div>
                      <p className='text-xs text-slate-500 transition-colors'>
                        {grade.term}
                      </p>
                      <p className='text-sm font-medium text-slate-800'>
                        {grade.courseId}
                      </p>
                    </div>
                    <div className='text-xl font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-lg'>
                      {grade.grade}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
