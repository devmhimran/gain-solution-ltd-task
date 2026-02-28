import { StudentFormValues } from '@/types';
import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateQueryString(params: Record<string, string>) {
  const isEmpty = Object.values(params).every((value) => value === '');

  if (isEmpty) {
    return '';
  }

  const queryString = Object.entries(params)
    .filter(([, value]) => value !== '')
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(
          value as unknown as string,
        )}`,
    )
    .join('&');

  return `?${queryString}`;
}

export function getYearsFrom2020(): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];

  for (let year = 2020; year <= currentYear; year++) {
    years.push(year);
  }

  return years;
}

export function calculateGpa(grades: StudentFormValues['grades']) {
  const map: Record<string, number> = {
    'A+': 4.0,
    A: 3.7,
    'A-': 3.5,
    'B+': 3.3,
    B: 3,
  };

  const valid = grades.map((g) => map[g.grade]).filter(Boolean);

  if (!valid.length) return 0;

  return Number((valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(2));
}
