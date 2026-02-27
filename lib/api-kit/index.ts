import { apiInstance } from '../http';

export const apiKit = {
  students: {
    getStudents: async () => {
      const url = `/students`;
      return apiInstance.get(url);
    },
  },
  courses: {
    getCourses: async () => {
      const url = `/courses`;
      return apiInstance.get(url);
    },
  },
  grades: {
    getGrades: async () => {
      const url = `/grades`;
      return apiInstance.get(url);
    },
  },
  faculties: {
    getFaculties: async () => {
      const url = `/faculty`;
      return apiInstance.get(url);
    },
  },
};
