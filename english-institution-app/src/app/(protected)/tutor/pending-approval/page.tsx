"use client";

import ClientAuthGuard from "@/components/auth/ClientAuthGuard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/services/api";

export default function TutorPendingApprovalPage() {
  const router = useRouter();
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const tutorRes = await api.me();
        const tutor = (tutorRes as any)?.data ?? tutorRes;
        console.log("tutor from api:", tutor);

        if (tutor?.tutor_approved) {
          router.replace("/tutor/dashboard");
          return;
        }
      } catch (e) {
        router.replace("/tutor/dashboard");
        return;
      } finally {
        setLoadingStatus(false);
      }
    };

    run();
  }, [router]);

  return (
    <ClientAuthGuard allow={(me) => !!me}>
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center px-4 py-10 font-sans"
      >
        <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-lg border border-slate-100 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500 text-4xl">
            ⏳
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            پروفایل شما در حال بررسی است
          </h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            درخواست همکاری شما با موفقیت ثبت شد. تیم پشتیبانی ما در حال بررسی
            مدارک و اطلاعات شما هستند. این فرایند معمولاً بین ۲۴ تا ۴۸ ساعت زمان
            می‌برد.
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </main>
    </ClientAuthGuard>
  );
}
