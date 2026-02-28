'use client';

import { calculateGpa } from '@/lib/utils';
import { useStore } from '@/store';

import {
  ICourse,
  IGrades,
  IStudent,
  IStudentWithCourses,
  IStudentWithCourseFaculty,
  StudentFormValues,
} from '@/types';

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export function useStudents() {
  const queryClient = useQueryClient();
  const getStudentsFromStore = useStore((state) => state.students);
  const addStudentToStore = useStore((state) => state.addStudent);
  const updateStudentToStore = useStore((state) => state.updateStudent);
  const addGrade = useStore((state) => state.addGrade);
  const deleteGradesByStudentId = useStore(
    (state) => state.deleteGradesByStudentId,
  );
  const deleteStudentFromStore = useStore((state) => state.deleteStudent);

  const createStudent = useMutation({
    mutationFn: async (data: StudentFormValues) => {
      const studentId = `s${getStudentsFromStore.length + 1}`;

      return {
        studentId,
        data,
      };
    },
    onSuccess: ({ studentId, data }) => {
      addStudentToStore({
        id: studentId,
        name: data.name,
        year: data.year,
        gpa: calculateGpa(data.grades),
      });

      data.grades.forEach((g) =>
        addGrade({
          id: crypto.randomUUID(),
          studentId,
          courseId: g.courseId,
          grade: g.grade,
          term: g.term,
        }),
      );

      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  const updateStudent = useMutation({
    mutationFn: async ({
      studentId,
      data,
    }: {
      studentId: string;
      data: StudentFormValues;
    }) => {
      return {
        studentId,
        data,
      };
    },
    onSuccess: ({ studentId, data }) => {
      updateStudentToStore({
        id: studentId,
        name: data.name,
        year: data.year,
        gpa: calculateGpa(data.grades),
      });

      deleteGradesByStudentId(studentId);
      data.grades.forEach((g) =>
        addGrade({
          id: crypto.randomUUID(),
          studentId,
          courseId: g.courseId,
          grade: g.grade,
          term: g.term,
        }),
      );

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
    createStudents: createStudent.mutateAsync,
    isCreating: createStudent.isPending,

    updateStudent: updateStudent.mutateAsync,
    isUpdating: updateStudent.isPending,

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
          grades: studentGrades,
          gpa: calculateGpa(studentGrades),
        };
      });

      if (search) {
        result = result.filter(
          (student: IStudentWithCourses) =>
            student.name.toLowerCase().includes(search) ||
            student.courses.some((course: ICourse) =>
              course.name.toLowerCase().includes(search),
            ),
        );
      }

      if (course) {
        result = result.filter((student: IStudentWithCourses) =>
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

export function useGetStudentById(studentId: string) {
  const students = useStore((state) => state.students);
  const courses = useStore((state) => state.courses);
  const grades = useStore((state) => state.grades);
  const faculties = useStore((state) => state.faculties);

  return useQuery<IStudentWithCourseFaculty | null>({
    queryKey: ['student', studentId, students, courses, grades, faculties],
    queryFn: async () => {
      const student = students.find((s) => s.id === studentId);
      if (!student) return null;

      const studentGrades = grades.filter((g) => g.studentId === studentId);

      const enrolledCourses = courses.filter((course) =>
        studentGrades.find((g) => g.courseId === course.id),
      );

      const enrolledCoursesWithFaculty = enrolledCourses.map((course) => {
        const courseFacultyObjs = faculties.filter((f) =>
          course.facultyIds.includes(f.id),
        );
        return {
          ...course,
          faculty: courseFacultyObjs,
          enrolledCount: grades.filter((g) => g.courseId === course.id).length,
        };
      });

      return {
        ...student,
        courses: enrolledCoursesWithFaculty,
        grades: studentGrades,
        gpa: calculateGpa(studentGrades),
      } as IStudentWithCourseFaculty;
    },
  });
}
