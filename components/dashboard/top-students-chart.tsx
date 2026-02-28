'use client';

import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface TopStudent {
  id: string;
  name: string;
  year: number;
  gpa: number;
  coursesCount: number;
}

interface TopStudentsChartProps {
  students: TopStudent[];
}

export function TopStudentsChart({ students }: TopStudentsChartProps) {
  const topTen = students.slice(0, 10);

  const series = [
    {
      name: 'GPA',
      data: topTen.map((s) => s.gpa),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      fontFamily: 'inherit',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(2);
      },
      offsetX: 30,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    xaxis: {
      categories: topTen.map((s) => s.name),
      max: 4.0,
      title: {
        text: 'GPA',
      },
    },
    yaxis: {
      title: {
        text: 'Students',
      },
    },
    colors: ['#3b82f6'],
    tooltip: {
      y: {
        formatter: function (val: number) {
          return 'GPA: ' + val.toFixed(2);
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
        Top 10 Students by GPA
      </h2>
      {topTen.length > 0 ? (
        <Chart options={options} series={series} type='bar' height={400} />
      ) : (
        <div className='text-center text-gray-500 py-8'>
          No student data available
        </div>
      )}
    </div>
  );
}
