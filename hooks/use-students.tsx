'use client';

import { useStore } from '@/store';

import { ICourse, IGrades, IStudent } from '@/types';

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export function useStudents() {
  const queryClient = useQueryClient();
  const addStudentToStore = useStore((state) => state.addStudent);
  const deleteStudentFromStore = useStore((state) => state.deleteStudent);

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

  const deleteStudent = useMutation({
    mutationFn: async (studentId: string) => {
      return studentId;
    },
    onSuccess: (studentId) => {
      deleteStudentFromStore(studentId);
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  return {
    createStudents: createStudents.mutateAsync,
    isCreating: createStudents.isPending,

    deleteStudent: deleteStudent.mutateAsync,
    isDeleting: deleteStudent.isPending,
  };
}

export function useGetStudents(params?: string) {
  const students = useStore((state) => state.students);
  const courses = useStore((state) => state.courses);
  const grades = useStore((state) => state.grades);

  return useQuery({
    queryKey: ['students', params, students, courses, grades],
    queryFn: async () => {
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

        return {
          ...student,
          courses: enrolledCourses,
        };
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

      if (course) {
        result = result.filter((student: IStudent) =>
          student.courses.some((c: ICourse) =>
            c.name.toLowerCase().includes(course),
          ),
        );
      }

      if (year) {
        result = result.filter((s) => s.year === Number(year));
      }

      const sorted = [...result].reverse();
      const total = sorted.length;
      const start = (page - 1) * limit;
      const data = sorted.slice(start, start + limit);

      return {
        data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    },
    placeholderData: keepPreviousData,
    enabled: students.length > 0 || courses.length > 0 || grades.length > 0,
  });
}
