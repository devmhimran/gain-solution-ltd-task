import { Student } from '@/types';
import { create } from 'zustand';

interface StudentsStore {
  students: Student[];
  setStudents: (students: Student[]) => void;
  addStudent: (student: Student) => void;
}

export const useStudentsStore = create<StudentsStore>((set) => ({
  students: [],
  setStudents: (students) => set({ students }),
  addStudent: (student) =>
    set((state) => ({
      students: [...state.students, student],
    })),
}));
