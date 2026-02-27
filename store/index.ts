import { ICourse, IFaculty, IGrades, IStudent } from '@/types';
import { create } from 'zustand';

interface IStore {
  students: IStudent[];
  setStudents: (students: IStudent[]) => void;
  addStudent: (student: IStudent) => void;

  courses: ICourse[];
  setCourses: (courses: ICourse[]) => void;
  addCourse: (course: ICourse) => void;

  faculty: IFaculty[];
  setFaculty: (faculty: IFaculty[]) => void;
  addFaculty: (faculty: IFaculty) => void;

  grades: IGrades[];
  setGrades: (grades: IGrades[]) => void;
  addGrade: (grade: IGrades) => void;
}

export const useStore = create<IStore>((set) => ({
  students: [],
  courses: [],
  faculty: [],
  grades: [],

  setStudents: (students) => set({ students }),
  addStudent: (student) =>
    set((state) => ({
      students: [...state.students, student],
    })),

  setCourses: (courses) => set({ courses }),
  addCourse: (course) =>
    set((state) => ({
      courses: [...state.courses, course],
    })),

  setFaculty: (faculty) => set({ faculty }),
  addFaculty: (faculty) =>
    set((state) => ({
      faculty: [...state.faculty, faculty],
    })),

  setGrades: (grades) => set({ grades }),
  addGrade: (grade) =>
    set((state) => ({
      grades: [...state.grades, grade],
    })),
}));
