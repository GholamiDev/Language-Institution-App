"use client";

import { useEffect, useState } from "react";
import ClientAuthGuard from "@/components/auth/ClientAuthGuard";
import api from "@/app/services/api";
import StudentDashSkeleton from "@/components/loading/StudentDashSkeleton";
import { dayToPersian } from "../../../utils/daysToPersian";
import CourseCard from "@/components/CourseCard";
import { BiBookOpen, BiEnvelope, BiTask, BiUserCircle } from "react-icons/bi";
import NextClassCard from "@/components/tutor/NextClassCard";
import TeachingScheduleMiniCalendar from "@/components/tutor/MiniCalender";
import Link from "next/link";
import { Stats, StudentCourse } from "@/app/types/types";
import { toPersianNumber } from "@/app/utils/toPersianNum";

export default function StudentDashboardPage() {
  const [student, setStudent] = useState<any>(null);
  const [me, setMe] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [courses, setCourses] = useState<StudentCourse[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [dashRes, tutorsRes, meRes] = await Promise.all([
          api.studentDashboard(),
          api.tutorsList(),
          api.me(),
        ]);

        const dashData = (dashRes as any)?.data ?? dashRes;
        const tutorsData = (tutorsRes as any)?.data ?? tutorsRes ?? [];
        const meData = (meRes as any)?.data ?? meRes;

        setStudent(dashData.student);
        setStats(dashData.stats);
        setMe(meData);

        const tutorMap = new Map();
        tutorsData.forEach((t: any) => {
          const fullName =
            `${t.user?.first_name || ""} ${t.user?.last_name || ""}`.trim();
          tutorMap.set(t.id, fullName || "مدرس نامشخص");
        });

        const enrollments = dashData.enrollments ?? [];

        const mapped = enrollments.map((enroll: any) => {
          const course = enroll.course;

          return {
            id: course?.id,
            title: course?.title,
            level: course?.level,
            image: course?.image,
            tutor_id: course?.tutor?.id,
            tutor_name: tutorMap.get(course?.tutor?.id) || "مدرس نامشخص",
            schedule_day: course?.schedule_day,
            schedule_start: course?.schedule_start,
            status: enroll?.status,
          };
        });

        setCourses(mapped);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const studentFullName =
    `${me?.first_name || ""} ${me?.last_name || ""}`.trim() || "دانشجو";

  const coursesForSchedule = courses
    .filter((c) => c.schedule_day && c.schedule_start)
    .map((c) => ({
      id: c.id,
      title: c.title,
      schedule_day: c.schedule_day as any,
      schedule_start: c.schedule_start!,
    }));

  if (loading) {
    return <StudentDashSkeleton />;
  }

  return (
    <ClientAuthGuard allow={(me) => !me.is_teacher}>
      <main className="min-h-screen px-4 py-12 mt-15">
        <div className="mx-auto max-w-6xl space-y-8">
          <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 to-blue-700 p-8 text-white shadow-2xl">
            <h1 className="text-3xl font-bold">خوش آمدی، {studentFullName}</h1>
            <p className="mt-2 text-blue-100">
              اینجا مرکز فرماندهی یادگیری توست.
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            <div className="flex items-center gap-4 rounded-2xl bg-(--card-bg) p-6 shadow-sm border border-(--card-border)">
              <BiBookOpen className="text-3xl text-third" />
              <div>
                <p className="text-sm text-secondary">دوره‌ها</p>
                <p className="text-xl font-bold">
                  {toPersianNumber(courses.length ? courses.length : 0)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-(--card-bg) p-6 shadow-sm border border-(--card-border)">
              <BiEnvelope className="text-3xl text-third" />
              <div>
                <p className="text-sm text-secondary">پیام‌ها</p>
                <p className="text-xl font-bold">
                  {toPersianNumber(stats?.messages_received ?? 0)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-(--card-bg) p-6 shadow-sm border border-(--card-border)">
              <BiTask className="text-3xl text-third" />
              <div>
                <p className="text-sm text-secondary">تکالیف ارسال شده</p>
                <p className="text-xl font-bold">
                  {toPersianNumber(stats?.homework_sent ?? 0)}
                </p>
              </div>
            </div>
          </section>

          <NextClassCard courses={coursesForSchedule} />

          <TeachingScheduleMiniCalendar courses={coursesForSchedule} />

          <section className="rounded-3xl p-8 shadow-sm border border-(--card-border)">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">دوره‌های من</h2>
              <span className="text-sm text-secondary">
                {toPersianNumber(courses.length)} دوره
              </span>
            </div>

            {courses.length === 0 ? (
              <div className="mt-8 text-center">
                <BiUserCircle className="mx-auto text-5xl text-primary mb-4" />
                <p className="text-secondary">
                  هنوز در هیچ دوره‌ای ثبت‌نام نکرده‌ای
                </p>

                <Link href="/courses">
                  <button className="mt-4 text-third hover:underline">
                    مشاهده دوره‌ها
                  </button>
                </Link>
              </div>
            ) : (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    level={course.level}
                    title={course.title}
                    image={course.image}
                    showTutor={true}
                    tutor_name={course.tutor_name}
                    showPrice={false}
                    schedule_day={dayToPersian(course.schedule_day)}
                    schedule_start={course.schedule_start}
                    status={course.status}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </ClientAuthGuard>
  );
}
