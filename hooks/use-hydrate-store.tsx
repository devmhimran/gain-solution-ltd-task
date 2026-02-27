import { apiKit } from '@/lib/api-kit';
import { useStore } from '@/store';

import { useQuery } from '@tanstack/react-query';

export function useHydrateStore() {
  const { students, courses, grades, faculties } = useStore();
  const setStudents = useStore((s) => s.setStudents);
  const setCourses = useStore((s) => s.setCourses);
  const setGrades = useStore((s) => s.setGrades);
  const setFaculties = useStore((s) => s.setFaculties);

  return useQuery({
    queryKey: ['hydrate-store'],
    queryFn: async () => {
      const [studentsRes, coursesRes, gradesRes, facultiesRes] =
        await Promise.all([
          apiKit.students.getStudents(),
          apiKit.courses.getCourses(),
          apiKit.grades.getGrades(),
          apiKit.faculties.getFaculties(),
        ]);

      if (
        students.length === 0 &&
        courses.length === 0 &&
        grades.length === 0 &&
        faculties.length === 0
      ) {
        setStudents(studentsRes.data);
        setCourses(coursesRes.data);
        setGrades(gradesRes.data);
        setFaculties(facultiesRes.data);
      }

      return true;
    },
    staleTime: Infinity,
  });
}
