export interface Student {
  id: string;
  name: string;
  gpa: number;
  year: number;
  courses: Course[];
}

export interface Course {
  id: string;
  name: string;
  facultyId: string;
  enrolledCount: number;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  grade: string;
}

export interface Faculty {
  id: string;
  name: string;
}
