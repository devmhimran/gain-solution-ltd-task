'use client';

import { useStore } from '@/store';
import { calculateGpa } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

export function useDashboard() {
  const students = useStore((state) => state.students);
  const courses = useStore((state) => state.courses);
  const faculties = useStore((state) => state.faculties);
  const grades = useStore((state) => state.grades);

  const { data: dashboardData } = useQuery({
    queryKey: ['dashboard', students, courses, faculties, grades],
    queryFn: async () => {
      const topStudents = students
        .map((student) => {
          const studentGrades = grades.filter(
            (g) => g.studentId === student.id,
          );
          const studentCourses = courses.filter((course) =>
            studentGrades.find((g) => g.courseId === course.id),
          );

          const gpa = calculateGpa(
            studentGrades.map((g) => ({
              courseId: g.courseId,
              grade: g.grade,
              term: g.term,
            })),
          );

          return {
            id: student.id,
            name: student.name,
            year: student.year,
            gpa,
            coursesCount: studentCourses.length,
          };
        })
        .sort((a, b) => b.gpa - a.gpa);

      const popularCourses = courses
        .map((course) => {
          const enrolledStudents = grades.filter(
            (grade) => grade.courseId === course.id,
          );
          const uniqueStudentIds = [
            ...new Set(enrolledStudents.map((g) => g.studentId)),
          ];

          return {
            id: course.id,
            name: course.name,
            enrollmentCount: uniqueStudentIds.length,
            facultyCount: course.facultyIds.length,
          };
        })
        .sort((a, b) => b.enrollmentCount - a.enrollmentCount);

      return {
        totalStudents: students.length,
        totalCourses: courses.length,
        totalFaculty: faculties.length,
        topStudents,
        popularCourses,
      };
    },
    enabled:
      students.length > 0 ||
      courses.length > 0 ||
      faculties.length > 0 ||
      grades.length > 0,
    initialData: {
      totalStudents: 0,
      totalCourses: 0,
      totalFaculty: 0,
      topStudents: [],
      popularCourses: [],
    },
  });

  return dashboardData;
}
