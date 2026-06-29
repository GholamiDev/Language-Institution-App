"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/app/services/api";
import { useAppSelector } from "@/hooks/redux";
import EnrollmentModal from "@/components/student/EnrollmentModal";
import { dayToPersian } from "@/app/utils/daysToPersian";
import CourseDetailSkeleton from "@/components/loading/CourseDetailSkeleton";
import { Course } from "@/app/types/types";
import { toPersianNumber } from "@/app/utils/toPersianNum";

const BASE_URL = "http://127.0.0.1:8000";

const getImageUrl = (image?: string | null) => {
  if (!image) return "https://placehold.co/1200x600?text=Course";
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `${BASE_URL}${image}`;
};

export default function CourseDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tutorName, setTutorName] = useState<string>("مدرس نامشخص");

  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.courseDetail(id as string);
        console.log(res);

        const payload = (res as any)?.data ?? res;
        setCourse(payload);
      } catch (err) {
        console.error("خطا در دریافت جزئیات دوره:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourse();
  }, [id]);

  useEffect(() => {
    const fetchTutor = async () => {
      if (!course?.tutor?.id) return;

      try {
        const res = await api.tutorsList();
        const payload = (res as any)?.data ?? res ?? [];

        const tutors = Array.isArray(payload)
          ? payload
          : (payload.results ?? []);

        const tutor = tutors.find((t: any) => t.id === course.tutor?.id);

        if (tutor) {
          const first = tutor?.user?.first_name || tutor?.first_name || "";
          const last = tutor?.user?.last_name || tutor?.last_name || "";

          const fullName = `${first} ${last}`.trim();
          setTutorName(fullName || "مدرس نامشخص");
        }
      } catch (error) {
        console.error("Tutor fetch error", error);
      }
    };

    fetchTutor();
  }, [course?.tutor?.id]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setCheckingAuth(true);

        if (user) {
          setIsAuthenticated(true);
          return;
        }

        const res = await api.me();
        const payload = (res as any)?.data ?? res;

        if (payload) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [user]);

  const checkEnrollmentStatus = async (courseId: number) => {
    const res = await api.studentDashboard();
    const payload = (res as any)?.data ?? res;

    const enrollments = payload?.enrollments ?? [];

    const found = enrollments.find((enrollment: any) => {
      const enrolledCourseId = enrollment.course?.id ?? enrollment.course;
      return Number(enrolledCourseId) === Number(courseId);
    });

    if (!found) {
      return {
        enrolled: false,
        status: null,
      };
    }

    return {
      enrolled: ["approved", "under_review"].includes(found.status),
      status: found.status,
    };
  };

  useEffect(() => {
    if (!isAuthenticated || !course?.id) return;

    let isCancelled = false;

    const run = async () => {
      try {
        const result = await checkEnrollmentStatus(course.id);

        if (!isCancelled) {
          setAlreadyEnrolled(result.enrolled);
          setEnrollmentStatus(result.status);
        }
      } catch (error) {
        console.error("Error checking enrollment status:", error);

        if (!isCancelled) {
          setAlreadyEnrolled(false);
          setEnrollmentStatus(null);
        }
      }
    };

    run();

    return () => {
      isCancelled = true;
    };
  }, [isAuthenticated, course?.id]);

  const handleOpenEnrollModal = () => {
    if (checkingAuth) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setIsModalOpen(true);
  };

  if (loading)
    return (
      <div className="p-6 mt-12">
        <CourseDetailSkeleton />
      </div>
    );
  if (!course) return <div className="p-6 mt-25">دوره یافت نشد.</div>;

  return (
    <div className="min-h-screen pb-20 mt-16">
      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseId={course.id}
      />
      <div className="relative w-full h-100 bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-blue-950/80 to-blue-600/40" />
        <img
          src={getImageUrl(course.image)}
          alt={course.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {course.title}
            </h1>
            <div className="flex flex-wrap gap-3">
              <span className="bg-blue-500/30 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-sm">
                مدرس: {tutorName}
              </span>
              <span className="bg-blue-500/30 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-sm">
                {course.level}
              </span>
              <span className="bg-blue-500/30 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-sm">
                {course.language}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-[var(--card-bg)] p-8 rounded-3xl shadow-sm border border-[var(--card-border)]">
              <h2 className="text-2xl font-bold text-[var(--primary)] mb-4 border-r-4 border-blue-500 pr-4">
                درباره دوره
              </h2>
              <p className="text-[var(--secondary)] leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {course.detail && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="font-bold text-blue-900 mb-2">جزئیات</h3>
                  <p className="text-slate-600 text-sm whitespace-pre-line">
                    {course.detail}
                  </p>
                </div>
              )}
              {course.requirements && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="font-bold text-blue-900 mb-2">پیش‌نیازها</h3>
                  <p className="text-slate-600 text-sm whitespace-pre-line">
                    {course.requirements}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-[var(--card-bg)] p-6 rounded-3xl shadow-xl border border-[var(--card-border)] sticky top-24">
              <div className="mb-6">
                <p className="text-[var(--secondary)] text-sm">قیمت </p>
                <div className="text-3xl font-bold text-blue-600 mt-1">
                  {toPersianNumber(Number(course.price_per_toman || 0))}{" "}
                  <span className="text-lg">تومان</span>
                </div>
              </div>

              {alreadyEnrolled ? (
                enrollmentStatus === "approved" ? (
                  <button
                    disabled
                    className="w-full rounded-xl bg-green-100 px-5 py-3 font-bold text-green-700"
                  >
                    شما در این دوره ثبت‌نام شده‌اید
                  </button>
                ) : enrollmentStatus === "under_review" ? (
                  <button
                    disabled
                    className="w-full rounded-xl bg-yellow-100 px-5 py-3 font-bold text-yellow-700"
                  >
                    درخواست شما در حال بررسی است
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full rounded-xl bg-gray-100 px-5 py-3 font-bold text-gray-600"
                  >
                    وضعیت ثبت‌نام نامشخص است
                  </button>
                )
              ) : (
                <button
                  onClick={handleOpenEnrollModal}
                  className="w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700 cursor-pointer"
                >
                  ثبت‌نام در دوره
                </button>
              )}

              <div className="mt-6 space-y-3 text-sm text-[var(--secondary)]">
                <div className="flex justify-between">
                  <span>ظرفیت:</span>{" "}
                  <span className="font-medium">
                    {toPersianNumber(course.capacity)} نفر
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>زمان برگزاری:</span>{" "}
                  <span className="font-medium">
                    {dayToPersian(course.schedule_day)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
