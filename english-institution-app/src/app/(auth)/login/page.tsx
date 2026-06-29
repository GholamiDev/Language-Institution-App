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
import { loginSchema, LoginFormValues } from "@/lib/validators/auth";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { setUser } from "@/app/store/authSlice";
import { LoginSkeleton } from "@/components/loading/LoginSkeleton";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [checkingAuth, setCheckingAuth] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await api.login(values);
      const me = await api.me();
      const payload = (me as any)?.data ?? me;

      dispatch(setUser(payload));
      toast.success("ورود با موفقیت انجام شد");
      router.push(getRedirectPathFromMe(me));
    } catch (err: any) {
      const message =
        err?.data?.detail ||
        err?.data?.message ||
        "ورود ناموفق بود. اطلاعات را بررسی کنید.";
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
    return <LoginSkeleton />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <AuthCard
        title="ورود به حساب"
        subtitle="برای ادامه وارد حساب کاربری خود شوید"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full my-btn blue-btn"
          >
            {isSubmitting ? "در حال ورود..." : "ورود"}
          </button>

          <p className="text-center text-sm text-secondary">
            حساب ندارید؟{" "}
            <Link
              href="/register"
              className="font-medium text-third hover:text-secondary"
            >
              ثبت‌نام کنید
            </Link>
          </p>
        </form>
      </AuthCard>
    </main>
  );
}
