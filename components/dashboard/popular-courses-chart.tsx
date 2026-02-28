'use client';

import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface PopularCourse {
  id: string;
  name: string;
  enrollmentCount: number;
  facultyCount: number;
}

interface PopularCoursesChartProps {
  courses: PopularCourse[];
}

export function PopularCoursesChart({ courses }: PopularCoursesChartProps) {
  const topTen = courses.slice(0, 10);

  const series = [
    {
      name: 'Enrollment',
      data: topTen.map((c) => c.enrollmentCount),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '60%',
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toString();
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    xaxis: {
      categories: topTen.map((c) => c.name),
      labels: {
        style: {
          fontSize: '11px',
        },
      },
      title: {
        text: 'Courses',
      },
    },
    yaxis: {
      title: {
        text: 'Number of Students',
      },
    },
    colors: ['#10b981'],
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + ' students';
        },
      },
    },
    grid: {
      borderColor: '#f1f5f9',
    },
  };

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <h2 className='text-xl font-semibold text-slate-800 mb-4'>
        Top 10 Most Popular Courses
      </h2>
      {topTen.length > 0 ? (
        <Chart options={options} series={series} type='bar' height={400} />
      ) : (
        <div className='text-center text-gray-500 py-8'>
          No course data available
        </div>
      )}
    </div>
  );
}
