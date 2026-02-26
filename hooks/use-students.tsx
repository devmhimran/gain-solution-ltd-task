'use client';

import { apiKit } from '@/lib/api-kit';
import { useStudentsStore } from '@/store';
import { Course, Enrollment, Student } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useStudents() {
  const queryClient = useQueryClient();
  const addStudentToStore = useStudentsStore((state) => state.addStudent);

  const createStudents = useMutation({
    mutationFn: async (newStudent: Omit<Student, 'id'>) => {
      const mockId = Math.random().toString(36).substr(2, 9);
      return { ...newStudent, id: mockId };
    },
    onSuccess: (data) => {
      addStudentToStore(data);
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  return {
    createStudents: createStudents.mutateAsync,
    isCreating: createStudents.isPending,
  };
}

export function useGetStudents(params?: string) {
  const setStudents = useStudentsStore((state) => state.setStudents);

  return useQuery({
    queryKey: ['students', params],
    queryFn: async () => {
      const [studentsRes, coursesRes, enrollmentsRes] = await Promise.all([
        apiKit.students.getStudents(),
        apiKit.courses.getCourses(),
        apiKit.enrollments.getEnrollments(),
      ]);

      const students = studentsRes.data;
      const courses = coursesRes.data;
      const enrollments = enrollmentsRes.data;

      const searchParams = new URLSearchParams(params);

      const search = searchParams.get('search')?.toLowerCase();
      const course = searchParams.get('course')?.toLowerCase();
      const year = searchParams.get('year');

      const page = Number(searchParams.get('page') ?? 1);
      const limit = Number(searchParams.get('limit') ?? 10);

      let result = students.map((student: Student) => {
        const studentEnrollments = enrollments.filter(
          (e: Enrollment) => e.studentId === student.id,
        );

        const studentCourses = studentEnrollments.map((en: Enrollment) => {
          const course = courses.find((c: Course) => c.id === en.courseId);
          return {
            id: course?.id,
            name: course?.name,
            grade: en.grade,
          };
        });

        return {
          ...student,
          courses: studentCourses,
        };
      });

      if (search) {
        result = result.filter(
          (s: Student) =>
            s.name.toLowerCase().includes(search) ||
            s.courses.some((c: Course) =>
              c.name?.toLowerCase().includes(search),
            ),
        );
      }

      if (course) {
        result = result.filter((s: Student) =>
          s.courses.some(
            (c: Course) =>
              c.name?.toLowerCase().includes(course) || c.id === course,
          ),
        );
      }

      if (year) {
        const parsedYear = Number(year);
        if (!Number.isNaN(parsedYear)) {
          result = result.filter((s: Student) => s.year === parsedYear);
        }
      }

      const total = result.length;
      const start = (page - 1) * limit;
      const end = start + limit;
      const sortedResult = [...result].reverse();

      setStudents(sortedResult);
      const paginatedResult = sortedResult.slice(start, end);

      return {
        data: paginatedResult,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    },
  });
}
