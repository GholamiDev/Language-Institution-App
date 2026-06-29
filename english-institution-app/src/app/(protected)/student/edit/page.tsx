"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/ui/AuthCard";
import TextInput from "@/components/ui/TextInput";
import api from "@/app/services/api";
import { useAppDispatch } from "@/hooks/redux";
import { setUser } from "@/app/store/authSlice";

const schema = yup.object().shape({
  first_name: yup.string().required("نام الزامی است"),
  last_name: yup.string().required("نام خانوادگی الزامی است"),
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
});

export default function StudentEditPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.me();
        const userData = (res as any)?.data ?? res;

        setValue("first_name", userData.first_name);
        setValue("last_name", userData.last_name);
        setValue("email", userData.email);
      } catch (err) {
        toast.error("خطا در دریافت اطلاعات پروفایل");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [setValue]);

  const onSubmit = async (data: any) => {
    try {
      await api.updateStudentProfile(data);

      const res = await api.me();
      const updatedUserData = (res as any)?.data ?? res;

      dispatch(setUser(updatedUserData));

      toast.success("پروفایل با موفقیت بروزرسانی شد!");
      router.push("/student/dashboard");
    } catch (error) {
      console.error("خطا در آپدیت پروفایل:", error);
      toast.error("خطا در ذخیره تغییرات");
    }
  };

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        در حال بارگذاری اطلاعات...
      </div>
    );

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <AuthCard
          title="ویرایش پروفایل دانشجو"
          subtitle="اطلاعات شخصی خود را مدیریت کنید"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <TextInput
                label="نام"
                {...register("first_name")}
                error={errors.first_name?.message}
                className="focus:border-blue-500 focus:ring-blue-500"
              />
              <TextInput
                label="نام خانوادگی"
                {...register("last_name")}
                error={errors.last_name?.message}
                className="focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <TextInput
              label="ایمیل"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              className="focus:border-blue-500 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full my-btn blue-btn"
            >
              {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          </form>
        </AuthCard>
      </div>
    </main>
  );
}
