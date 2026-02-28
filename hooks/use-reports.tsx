'use client';

import { useStore } from '@/store';
import { calculateGpa } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

export function useReports() {
  const students = useStore((state) => state.students);
  const courses = useStore((state) => state.courses);
  const grades = useStore((state) => state.grades);

  const courseEnrollmentReportData = useQuery({
    queryKey: ['reports', 'course-enrollment', courses, grades],
    queryFn: async () => {
      return courses.map((course) => {
        const enrolledStudents = grades.filter(
          (grade) => grade.courseId === course.id,
        );

        const uniqueStudentIds = [
          ...new Set(enrolledStudents.map((g) => g.studentId)),
        ];

        return {
          courseId: course.id,
          courseName: course.name,
          totalEnrollments: uniqueStudentIds.length,
          totalGrades: enrolledStudents.length,
        };
      });
    },
    enabled: courses.length > 0 || grades.length > 0,
  });

  const topPerformingStudentsData = useQuery({
    queryKey: ['reports', 'top-performing-students', students, grades, courses],
    queryFn: async () => {
      return students
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
            courses: studentCourses.map((c) => c.name).join(', '),
          };
        })
        .sort((a, b) => b.gpa - a.gpa);
    },
    enabled: students.length > 0 || grades.length > 0 || courses.length > 0,
  });

  const topPerformersByCourse = useQuery({
    queryKey: [
      'reports',
      'top-performers-by-course',
      courses,
      grades,
      students,
    ],
    queryFn: async () => {
      return courses.map((course) => {
        const courseGrades = grades.filter((g) => g.courseId === course.id);

        const studentPerformances = courseGrades.map((grade) => {
          const student = students.find((s) => s.id === grade.studentId);
          const gradeMap: Record<string, number> = {
            'A+': 4.0,
            A: 3.7,
            'A-': 3.5,
            'B+': 3.3,
            B: 3.0,
          };

          return {
            studentId: grade.studentId,
            studentName: student?.name || 'Unknown',
            grade: grade.grade,
            gradePoint: gradeMap[grade.grade] || 0,
            term: grade.term,
          };
        });

        const topPerformers = studentPerformances
          .sort((a, b) => b.gradePoint - a.gradePoint)
          .slice(0, 5);

        return {
          courseId: course.id,
          courseName: course.name,
          topPerformers,
        };
      });
    },
    enabled: courses.length > 0 || grades.length > 0 || students.length > 0,
  });

  return {
    courseEnrollmentReport: courseEnrollmentReportData.data || [],
    topPerformingStudents: topPerformingStudentsData.data || [],
    topPerformersByCourse: topPerformersByCourse.data || [],
  };
}
