import * as yup from "yup";

export const registerSchema = yup.object({
  first_name: yup
    .string()
    .required("نام الزامی است")
    .min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  last_name: yup
    .string()
    .required("نام خانوادگی الزامی است")
    .min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  password: yup
    .string()
    .required("رمز عبور الزامی است")
    .min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
  role: yup
    .mixed<"student" | "tutor">()
    .oneOf(["student", "tutor"], "نقش نامعتبر است")
    .required("انتخاب نقش الزامی است"),
});

export const loginSchema = yup.object({
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  password: yup
    .string()
    .required("رمز عبور الزامی است")
    .min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
});

export type RegisterFormValues = yup.InferType<typeof registerSchema>;
export type LoginFormValues = yup.InferType<typeof loginSchema>;
