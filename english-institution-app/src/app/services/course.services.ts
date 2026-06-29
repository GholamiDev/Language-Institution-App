import api from "./api";

export const createCourse = async (formData: FormData) => {
  const res = await api.post("/auth/courses/create/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const getCourses = async () => {
  const res = await api.get("/auth/courses/");
  return res.data;
};

export const getMyCourses = async () => {
  const res = await api.get("/auth/courses/my/");
  return res.data;
};

export const getCourseDetail = async (id: number) => {
  const res = await api.get(`/auth/courses/${id}/`);
  return res.data;
};

export const buyCourse = async (id: number) => {
  const res = await api.post(`/auth/courses/${id}/buy/`);
  return res.data;
};
