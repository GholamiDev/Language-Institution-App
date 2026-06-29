import api from "./api";

export const loginUser = (data: { email: string; password: string }) => {
  return api.login(data);
};

export const registerUser = (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_teacher: boolean;
}) => {
  return api.register(data);
};

export const getMe = () => {
  return api.me();
};

export const logoutUser = () => {
  return api.logout();
};
