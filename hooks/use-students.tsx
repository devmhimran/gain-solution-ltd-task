'use client';

import { apiKit } from '@/lib/api-kit';
import { useStudentsStore } from '@/store';
import { ICourse, IGrades, IStudent } from '@/types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useStudents() {
  const queryClient = useQueryClient();
  const addStudentToStore = useStudentsStore((state) => state.addStudent);

  const createStudents = useMutation({
    mutationFn: async (newStudent: Omit<IStudent, 'id'>) => {
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
      const [studentsRes, coursesRes, gradesRes] = await Promise.all([
        apiKit.students.getStudents(),
        apiKit.courses.getCourses(),
        apiKit.grades.getGrades(),
      ]);

      const students = studentsRes.data;
      const courses = coursesRes.data;
      const grades = gradesRes.data;

      const searchParams = new URLSearchParams(params);

      const search = searchParams.get('search')?.toLowerCase();
      const course = searchParams.get('course')?.toLowerCase();
      const year = searchParams.get('year');

      const page = Number(searchParams.get('page') ?? 1);
      const limit = Number(searchParams.get('limit') ?? 10);

      let result = students.map((student: IStudent) => {
        const studentGrades = grades.filter(
          (grade: IGrades) => grade.studentId === student.id,
        );
        const enrolledCourses = courses.filter((course: ICourse) =>
          studentGrades.find((grade: IGrades) => grade.courseId === course.id),
        );

        return { ...student, courses: enrolledCourses };
      });

      if (search) {
        result = result.filter(
          (student: IStudent) =>
            student.name.toLowerCase().includes(search) ||
            student.courses.some((course: ICourse) =>
              course.name.toLowerCase().includes(search),
            ),
        );
      }

      if (year) {
        result = result.filter(
          (student: IStudent) => student.year === Number(year),
        );
      }

      if (course) {
        result = result.filter((student: IStudent) =>
          student.courses.some((c: ICourse) =>
            c.name.toLowerCase().includes(course),
          ),
        );
      }

      const sortedResult = [...result].reverse();
      setStudents(sortedResult);

      const total = result.length;
      const start = (page - 1) * limit;
      const paginatedData = sortedResult.slice(start, start + limit);

      return {
        data: paginatedData,
        total,
        page,
        limit,
      };
    },
  });
}
