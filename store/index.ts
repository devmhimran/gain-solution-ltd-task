import { ICourse, IFaculty, IGrades, IStudent } from '@/types';
import { create } from 'zustand';

interface IStore {
  students: IStudent[];
  setStudents: (students: IStudent[]) => void;
  addStudent: (student: IStudent) => void;
  updateStudent: (student: IStudent) => void;
  deleteStudent: (studentId: string) => void;

  courses: ICourse[];
  setCourses: (courses: ICourse[]) => void;
  addCourse: (course: ICourse) => void;
  updateCourse: (course: ICourse) => void;
  deleteCourse: (courseId: string) => void;

  faculties: IFaculty[];
  setFaculties: (faculty: IFaculty[]) => void;
  addFaculty: (faculty: IFaculty) => void;

  grades: IGrades[];
  setGrades: (grades: IGrades[]) => void;
  addGrade: (grade: IGrades) => void;
}

export const useStore = create<IStore>((set) => ({
  students: [],
  courses: [],
  faculties: [],
  grades: [],

  setStudents: (students) => set({ students }),
  addStudent: (student) =>
    set((state) => ({
      students: [...state.students, student],
    })),

  updateStudent: (student) =>
    set((state) => ({
      students: state.students.map((s) => (s.id === student.id ? student : s)),
    })),
  deleteStudent: (studentId) =>
    set((state) => ({
      students: state.students.filter((student) => student.id !== studentId),
    })),

  setCourses: (courses) => set({ courses }),
  addCourse: (course) =>
    set((state) => ({
      courses: [...state.courses, course],
    })),
  updateCourse: (updatedCourse) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course,
      ),
    })),
  deleteCourse: (courseId) =>
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== courseId),
    })),

  setFaculties: (faculties) => set({ faculties }),
  addFaculty: (faculty) =>
    set((state) => ({
      faculties: [...state.faculties, faculty],
    })),

  setGrades: (grades) => set({ grades }),
  addGrade: (grade) =>
    set((state) => ({
      grades: [...state.grades, grade],
    })),
}));
