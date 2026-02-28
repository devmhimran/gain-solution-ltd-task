'use client';

import {
  CourseEnrollmentReport,
  TopPerformingStudents,
  TopPerformersByCourse,
} from '@/components/pages/reporting';
import { useReports } from '@/hooks';

export default function ReportingPage() {
  const {
    courseEnrollmentReport,
    topPerformingStudents,
    topPerformersByCourse,
  } = useReports();

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold text-slate-800'>
          Reporting & Exporting
        </h1>
        <p className='text-gray-500 mt-2'>
          View comprehensive reports and export data in CSV format
        </p>
      </div>
      <CourseEnrollmentReport data={courseEnrollmentReport} />
      <TopPerformingStudents data={topPerformingStudents} />
      <TopPerformersByCourse data={topPerformersByCourse} />
    </div>
  );
}
