'use client';

import { useStore } from '@/store';
import { ICourse, IFaculty } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function useGetCourses(params?: string) {
  const courses = useStore((state) => state.courses);
  const faculties = useStore((state) => state.faculties);

  return useQuery({
    queryKey: ['courses', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams(params);
      const search = searchParams.get('search')?.toLowerCase();
      const page = Number(searchParams.get('page') ?? 1);
      const limit = Number(searchParams.get('limit') ?? 10);

      let result = courses.map((course: ICourse) => {
        const faculty = course.facultyIds
          .map((id: string) => faculties.find((f) => f.id === id))
          .filter((f): f is IFaculty => Boolean(f));
        return { ...course, faculty };
      });

      if (search) {
        result = result.filter(
          (course: ICourse) =>
            course.name.toLowerCase().includes(search) ||
            course.faculty.some((f) => f.name.toLowerCase().includes(search)),
        );
      }

      const sorted = [...result].reverse();
      const total = sorted.length;
      const start = (page - 1) * limit;
      const data = sorted.slice(start, start + limit);

      return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    },
    placeholderData: keepPreviousData,
    enabled: courses.length > 0 || faculties.length > 0,
  });
}
