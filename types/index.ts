export interface IStudent {
  id: string;
  name: string;
  gpa: number;
  year: number;
}

export interface IStudentWithCourses extends IStudent {
  courses: ICourse[];
  grades: IGrades[];
}

export interface ICourse {
  id: string;
  name: string;
  facultyIds: string[];
  enrolledCount: number;
  metadata: { key: string; value: string }[];
}

export interface ICourseWithFaculty extends ICourse {
  faculty: IFaculty[];
}

export interface IGrades {
  id: string;
  studentId: string;
  courseId: string;
  grade: string;
  term: string;
}

export interface IFaculty {
  id: string;
  name: string;
}

export interface IApiResponse<X> {
  data: X;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface StudentFormValues {
  name: string;
  year: number;
  grades: {
    courseId: string;
    grade: string;
    term: string;
  }[];
}
