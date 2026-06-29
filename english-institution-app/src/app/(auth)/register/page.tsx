"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthCard from "@/components/ui/AuthCard";
import TextInput from "@/components/ui/TextInput";
import api from "@/app/services/api";
import { getRedirectPathFromMe } from "@/lib/authRedirect";
import { registerSchema, RegisterFormValues } from "@/lib/validators/auth";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { setUser } from "@/app/store/authSlice";
import { RegisterSkeleton } from "@/components/loading/RegisterSkeleton";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [checkingAuth, setCheckingAuth] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "student",
    },
    mode: "onTouched",
  });

  const selectedRole = watch("role");

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await api.register({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        is_teacher: values.role === "tutor",
      });

      const me = await api.me();
      const payload = (me as any)?.data ?? me;

      dispatch(setUser(payload));
      toast.success("ثبت‌نام با موفقیت انجام شد");
      router.push(getRedirectPathFromMe(me));
    } catch (err: any) {
      const message =
        err?.data?.email?.[0] ||
        err?.data?.detail ||
        err?.data?.message ||
        "ثبت‌نام ناموفق بود. دوباره تلاش کنید.";
      toast.error(message);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.me();
        const payload = (res as any)?.data ?? res;

        if (payload) {
          router.replace("/");
          return;
        }
      } catch (error) {
      } finally {
        setCheckingAuth(false);
      }
    };

    checkUser();
  }, [router]);

  if (checkingAuth) {
    return <RegisterSkeleton />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 mt-14">
      <AuthCard
        title="ایجاد حساب کاربری"
        subtitle="به عنوان دانشجو یا استاد وارد پلتفرم شوید"
      >
        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() =>
              setValue("role", "student", { shouldValidate: true })
            }
            className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
              selectedRole === "student"
                ? "border-third bg-indigo-50 text-third"
                : "border-(--card-border) bg-background text-secondary hover:border-slate-300"
            }`}
          >
            دانشجو
          </button>

          <button
            type="button"
            onClick={() => setValue("role", "tutor", { shouldValidate: true })}
            className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
              selectedRole === "tutor"
                ? "border-third bg-indigo-50 text-third"
                : "border-(--card-border) bg-background text-secondary hover:border-slate-300"
            }`}
          >
            استاد
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <TextInput
              label="نام"
              // name="first_name"
              placeholder="علی"
              error={errors.first_name?.message}
              {...register("first_name")}
            />

            <TextInput
              label="نام خانوادگی"
              // name="last_name"
              placeholder="محمدی"
              error={errors.last_name?.message}
              {...register("last_name")}
            />
          </div>

          <TextInput
            label="ایمیل"
            // name="email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <TextInput
            label="رمز عبور"
            // name="password"
            type="password"
            placeholder="حداقل ۶ کاراکتر"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="rounded-2xl border border-(--card-border) bg-background px-4 py-3 text-sm text-secondary">
            نقش انتخاب شده :{" "}
            <span className="font-semibold text-primary">
              {selectedRole === "tutor" ? "استاد" : "دانشجو"}
            </span>
          </div>

          {errors.role?.message ? (
            <p className="text-sm text-rose-600">{errors.role.message}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="my-btn blue-btn w-full"
          >
            {isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          </button>

          <p className="text-center text-sm text-secondary">
            قبلاً ثبت‌نام کرده‌اید؟{" "}
            <Link
              href="/login"
              className="font-medium text-third hover:text-indigo-500"
            >
              ورود
            </Link>
          </p>
        </form>
      </AuthCard>
    </main>
  );
}
