import { Weekday } from "@/lib/schedule";

export type Blog = {
  id: number;
  title: string;
  description: string;
  picture: string;
  difficulty_level: string;
  created_at: string;
};

export type StudentCourse = {
  id: number;
  title: string;
  level?: string;
  image?: string;
  schedule_day?: string;
  schedule_start?: string;
  tutor_id?: number;
  tutor_name?: string;
  status?: string;
};

export type Stats = {
  courses_count: number;
  approved_courses: number;
  pending_courses: number;
  messages_received: number;
  homework_sent: number;
};

export type LanguageLevel = "basic" | "intermediate" | "advanced" | "native";

export type LanguageSpoken = {
  language: string;
  level: LanguageLevel;
};

export type CreateTutorProfilePayload = {
  first_name: string;
  last_name: string;
  phone_number: string;
  country: string;
  bio: string;

  subjects: string[];
  languages_spoken: LanguageSpoken[];

  teaching_style?: string;
  expectation?: string;

  profile_picture?: File | null;
  intro_video_url?: string;
  intro_video_file?: File | null;
};

export type MeResponse = {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_teacher?: boolean;
  has_tutor_profile?: boolean;
  tutor_id?: number | null;
  tutor_approved?: boolean;
};

export interface TutorInfo {
  id?: number;
  total_active_students?: number;
  monthly_income?: number;
}

export interface Course {
  id: number;
  courseId: string;
  title: string;
  description: string;
  detail: string;
  requirements: string;
  materials: string;
  price_per_hour: number | string;
  price_per_dollar: number | string;
  price_per_toman: number | string;
  language: string;
  level: string;
  schedule_day: Weekday;
  schedule_start: string;
  schedule_end: string;
  capacity: number;
  active_students: number;
  length: number;
  course_duration: number;
  image: string | null;
  language_flag: string | null;
  lessons: any[];
  tutor: {
    id: number;
    user: number;
    profile_picture: string | null;
    languages_spoken: string[];
    subjects: string[];
  };
}

export type CourseProps = {
  id: number;
  title: string;
  description: string;
  image?: string | null;
  price_per_toman?: number | string;
  price_per_dollar?: number | string;
  price_per_hour?: number | string;
  level: string;
  language?: string;
  tutor_name?: string;
  created_at?: string;
};

export interface CourseData {
  id?: number | string;
  title: string;
  description: string;
  detail?: string | null;
  requirements?: string | null;
  materials?: string | null;
  price_per_toman: number;
  price_per_dollar?: number | null;
  price_per_hour?: number | null;
  image?: string | null;
  language?: string | null;
  level?: string | null;
  schedule_day?: Weekday;
  schedule_start?: string;
  schedule_end?: string;
  capacity?: number | null;
  course_duration?: number | null;
}
