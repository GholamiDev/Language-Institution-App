export type MeResponse = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_teacher: boolean;
  profile_picture: string | null;
  has_tutor_profile: boolean;
  tutor_id: number | null;
  tutor_approved: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_teacher: boolean;
};

export type LanguageSpoken = {
  language: string;
  level: "basic" | "intermediate" | "advanced" | "native";
};

export type CreateTutorProfilePayload = {
  first_name: string;
  last_name: string;

  // tutor basics
  phone_number: string;
  country: string;

  // arrays/json
  subjects: string[];
  languages_spoken: LanguageSpoken[];

  // about
  bio: string;
  teaching_style: string;
  expectation: string;
  description: string;

  // video
  intro_video_url?: string;

  // files (if you use FormData, include these there)
  profile_picture?: File | null;
  intro_video_file?: File | null;

  // nested (optional)
  certificates: any[];
  educations: any[];
  experiences: any[];
  courses: any[];
};

export type ApiError = Error & {
  status?: number;
  data?: any;
};
