'use client';

import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface StatsOverviewChartProps {
  totalStudents: number;
  totalCourses: number;
  totalFaculty: number;
}

export function StatsOverviewChart({
  totalStudents,
  totalCourses,
  totalFaculty,
}: StatsOverviewChartProps) {
  const series = [totalStudents, totalCourses, totalFaculty];

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
    },
    labels: ['Students', 'Courses', 'Faculty'],
    colors: ['#3b82f6', '#10b981', '#8b5cf6'],
    legend: {
      position: 'bottom',
      fontSize: '14px',
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(1) + '%';
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              fontSize: '16px',
              fontWeight: 600,
              formatter: function () {
                return (totalStudents + totalCourses + totalFaculty).toString();
              },
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val.toString();
        },
      },
    },
  };

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <h2 className='text-xl font-semibold text-slate-800 mb-4'>
        Overview Statistics
      </h2>
      <Chart options={options} series={series} type='donut' height={350} />
    </div>
  );
}
