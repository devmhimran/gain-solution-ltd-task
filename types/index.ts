export interface IStudent {
  id: string;
  name: string;
  gpa: number;
  year: number;
  courses: ICourse[];
}

export interface ICourse {
  id: string;
  name: string;
  facultyIds: string[];
  faculty: IFaculty[];
  enrolledCount: number;
  metadata?: Record<string, string>;
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
