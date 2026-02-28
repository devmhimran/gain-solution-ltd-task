'use client';

import { useStore } from '@/store';
import { ICourse, ICourseWithFaculty, IFaculty } from '@/types';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export function useCourses() {
  const queryClient = useQueryClient();
  const addCourseToStore = useStore((state) => state.addCourse);
  const updateCourseToStore = useStore((state) => state.updateCourse);
  const deleteCourseFromStore = useStore((state) => state.deleteCourse);
  const courses = useStore((state) => state.courses);

  const createCourses = useMutation({
    mutationFn: async (newCourse: Omit<ICourse, 'id'>) => {
      const mockId = `c${courses.length + 1}`;
      return { ...newCourse, id: mockId };
    },
    onSuccess: (data) => {
      addCourseToStore(data);
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  const updateCourse = useMutation({
    mutationFn: async (updatedCourse: ICourse) => {
      return updatedCourse;
    },
    onSuccess: (data) => {
      updateCourseToStore(data);
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  const deleteCourse = useMutation({
    mutationFn: async (courseId: string) => {
      return courseId;
    },
    onSuccess: (courseId) => {
      deleteCourseFromStore(courseId);
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  return {
    createCourses: createCourses.mutateAsync,
    isCreating: createCourses.isPending,

    updateCourse: updateCourse.mutateAsync,
    isUpdating: updateCourse.isPending,

    deleteCourse: deleteCourse.mutateAsync,
    isDeleting: deleteCourse.isPending,
  };
}

export function useGetCourses(params?: string) {
  const courses = useStore((state) => state.courses);
  const grades = useStore((state) => state.grades);
  const faculties = useStore((state) => state.faculties);

  return useQuery({
    queryKey: ['courses', params, courses],
    queryFn: async () => {
      const searchParams = new URLSearchParams(params);
      const search = searchParams.get('search')?.toLowerCase();
      const page = Number(searchParams.get('page') ?? 1);
      const limit = Number(searchParams.get('limit') ?? 10);

      let result = courses.map((course: ICourse) => {
        const faculty = course.facultyIds
          .map((id: string) => faculties.find((f) => f.id === id))
          .filter((f): f is IFaculty => Boolean(f));

        const gradesCount = grades
          .map((g) => g.courseId === course.id)
          .filter(Boolean).length;

        return { ...course, faculty, enrolledCount: gradesCount };
      });

      if (search) {
        result = result.filter(
          (course: ICourseWithFaculty) =>
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
  });
}
