import {
  ApiError,
  CreateTutorProfilePayload,
  LoginPayload,
  RegisterPayload,
} from "../types/auth";
type JsonValue = Record<string, any> | any[];

type ApiRequestOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: BodyInit | JsonValue | null;
  headers?: Record<string, string>;
};

export type CreateCoursePayload = {
  title: string;
  description: string;
  detail: string;
  requirements?: string;
  materials?: string;
  price_per_hour?: number | string;
  price_per_dollar?: number | string;
  price_per_toman?: number | string;
  language: string;
  level: string;
  schedule_day: string;
  schedule_start: string;
  schedule_end: string;
  capacity: number | string;
  active_students?: number | string;
  length?: number | string;
  course_duration?: number | string;
  image?: File | null;
  language_flag?: File | null;
};

const BASE_URL = "http://127.0.0.1:8000";

async function apiRequest<T = any>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const body = options.body ?? null;
  const isBodyInit =
    body instanceof FormData ||
    body instanceof Blob ||
    body instanceof URLSearchParams ||
    body instanceof ArrayBuffer;

  const headers: Record<string, string> = { ...(options.headers || {}) };

  let finalBody: BodyInit | null = null;

  if (body == null) {
    finalBody = null;
  } else if (isBodyInit) {
    finalBody = body as BodyInit;
  } else if (typeof body === "string") {
    finalBody = body;
  } else {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
    finalBody = JSON.stringify(body);
  }

  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers,
    body: finalBody,
  });

  const contentType = res.headers.get("content-type") || "";
  let data: any = null;

  try {
    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      data = text ? { detail: text } : null;
    }
  } catch {
    data = null;
  }

  if (!res.ok) {
    const err: ApiError = new Error(data?.detail || "API request failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data as T;
}

export function buildTutorProfileFormData(input: CreateTutorProfilePayload) {
  const fd = new FormData();

  const stringKeys: (keyof CreateTutorProfilePayload)[] = [
    "first_name",
    "last_name",
    "phone_number",
    "country",
    "bio",
    "teaching_style",
    "expectation",
    "description",
    "intro_video_file",
    "intro_video_url",
  ];

  for (const key of stringKeys) {
    const val = input[key];

    if (typeof val === "string") {
      if (key === "first_name") {
        fd.append("user_first_name", val);
      } else if (key === "last_name") {
        fd.append("user_last_name", val);
      } else {
        fd.append(String(key), val);
      }
    }
  }

  for (const key of stringKeys) {
    const val = input[key];
    if (typeof val === "string") fd.append(String(key), val);
  }

  if (input.profile_picture instanceof File) {
    fd.append("profile_picture", input.profile_picture);
  }

  if (input.intro_video_file instanceof File) {
    fd.append("intro_video_file", input.intro_video_file);
  }

  const jsonKeys: (keyof CreateTutorProfilePayload)[] = [
    "subjects",
    "languages_spoken",
    "certificates",
    "educations",
    "experiences",
    "courses",
  ];

  for (const key of jsonKeys) {
    const v = input[key];
    if (v !== undefined) fd.append(String(key), JSON.stringify(v));
  }

  return fd;
}

export function buildCourseFormData(input: CreateCoursePayload) {
  const fd = new FormData();

  const textFields: (keyof CreateCoursePayload)[] = [
    "title",
    "description",
    "detail",
    "requirements",
    "materials",
    "language",
    "level",
    "schedule_day",
    "schedule_start",
    "schedule_end",
  ];

  for (const key of textFields) {
    const value = input[key];
    if (value !== undefined && value !== null) {
      fd.append(String(key), String(value));
    }
  }

  const numericFields: (keyof CreateCoursePayload)[] = [
    "price_per_hour",
    "price_per_dollar",
    "price_per_toman",
    "capacity",
    "active_students",
    "length",
    "course_duration",
  ];

  for (const key of numericFields) {
    const value = input[key];
    if (value !== undefined && value !== null && value !== "") {
      fd.append(String(key), String(value));
    }
  }

  if (input.image instanceof File) {
    fd.append("image", input.image);
  }

  if (input.language_flag instanceof File) {
    fd.append("language_flag", input.language_flag);
  }

  return fd;
}

export const api = {
  login: (payload: LoginPayload) =>
    apiRequest("/api/login/", { method: "POST", body: payload }),

  register: (payload: RegisterPayload) =>
    apiRequest("/api/register/", { method: "POST", body: payload }),

  me: () => apiRequest("/api/me/", { method: "GET" }),

  logout: () => apiRequest("/api/logout/", { method: "POST" }),

  createTutorProfile: (payload: CreateTutorProfilePayload | FormData) =>
    apiRequest("/api/create-tutor-profile/", {
      method: "POST",
      body: payload,
    }),

  getMyTutorProfile: () =>
    apiRequest("/api/tutors-api/tutors/me/", { method: "GET" }),

  updateTutorProfile: (payload: FormData) =>
    apiRequest("/api/tutors-api/tutors/me/", {
      method: "PATCH",
      body: payload,
    }),

  updateStudentProfile: (payload: FormData) =>
    apiRequest("/api/students/me/profile/", {
      method: "PATCH",
      body: payload,
    }),

  createTutorCertificate: (payload: FormData) =>
    apiRequest("/api/tutors-api/tutor-certificates/", {
      method: "POST",
      body: payload,
    }),

  createTutorEducation: (payload: Record<string, any>) =>
    apiRequest("/api/tutors-api/tutor-educations/", {
      method: "POST",
      body: payload,
    }),

  createTutorExperience: (payload: Record<string, any>) =>
    apiRequest("/api/tutors-api/tutor-experiences/", {
      method: "POST",
      body: payload,
    }),

  tutorDashboard: () =>
    apiRequest("/api/tutors-api/tutors/me/dashboard/", { method: "GET" }),

  tutorsList: () => apiRequest("/api/tutors-api/tutors/"),

  tutorDetail: (id: string | number) =>
    apiRequest(`/api/tutors-api/tutors/${id}/`),

  getTutorCourses: () =>
    apiRequest<{ results: any[] }>("/api/tutors-api/tutor-courses/"),

  deleteCourse: (id: string | number) =>
    apiRequest(`/api/courses/${id}/`, { method: "DELETE" }),

  coursesList: () => apiRequest("/api/courses/"),

  courseDetail: (id: string | number) => apiRequest(`/api/courses/${id}/`),

  updateCourse: (id: string | number, data: Record<string, any>) =>
    apiRequest(`/api/courses/${id}/`, {
      method: "PATCH",
      body: data,
    }),

  createEnrollment: (FormData: Record<string, any>) =>
    apiRequest("/api/enrollments/", {
      method: "POST",
      body: FormData,
    }),

  enrollmentsList: () => apiRequest("/api/enrollments/"),

  createCourse: (payload: CreateCoursePayload | FormData) =>
    apiRequest("/api/courses/", {
      method: "POST",
      body: payload,
    }),

  studentDashboard: () => apiRequest("/api/students/me/dashboard/"),
  getBlogs: () => apiRequest("/api/blogs/"),
  getBlogDetail: (id: string | string[] | number) =>
    apiRequest(`/api/blogs/${id}/`),
};

export default api;
