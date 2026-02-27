import { apiKit } from '@/lib/api-kit';
import { useStore } from '@/store';

import { useQuery } from '@tanstack/react-query';

export function useHydrateStore() {
  const { students, courses, grades } = useStore();
  const setStudents = useStore((s) => s.setStudents);
  const setCourses = useStore((s) => s.setCourses);
  const setGrades = useStore((s) => s.setGrades);

  return useQuery({
    queryKey: ['hydrate-store'],
    queryFn: async () => {
      const [studentsRes, coursesRes, gradesRes] = await Promise.all([
        apiKit.students.getStudents(),
        apiKit.courses.getCourses(),
        apiKit.grades.getGrades(),
      ]);

      if (
        students.length === 0 &&
        courses.length === 0 &&
        grades.length === 0
      ) {
        setStudents(studentsRes.data);
        setCourses(coursesRes.data);
        setGrades(gradesRes.data);
      }

      return true;
    },
    staleTime: Infinity,
  });
}
