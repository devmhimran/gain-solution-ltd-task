'use client';

import {
  StatsOverviewChart,
  TopStudentsChart,
  PopularCoursesChart,
} from '@/components/dashboard';
import { useDashboard } from '@/hooks';

export default function DashboardAnalytics() {
  const {
    totalStudents,
    totalCourses,
    totalFaculty,
    topStudents,
    popularCourses,
  } = useDashboard();

  return (
    <div className='space-y-8'>
      {/* Page Header */}
      <div>
        <h1 className='text-3xl font-bold text-slate-800'>Dashboard</h1>
        <p className='text-gray-500 mt-2'>
          Overview of students, courses, and performance metrics
        </p>
      </div>

      {/* Stats Overview Chart */}
      <StatsOverviewChart
        totalStudents={totalStudents}
        totalCourses={totalCourses}
        totalFaculty={totalFaculty}
      />

      {/* Charts Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Top Students Chart */}
        <TopStudentsChart students={topStudents} />

        {/* Popular Courses Chart */}
        <PopularCoursesChart courses={popularCourses} />
      </div>
    </div>
  );
}
