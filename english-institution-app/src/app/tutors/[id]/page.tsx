"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/app/services/api";
import CourseCard from "@/components/CourseCard";
import {
  Mail,
  GraduationCap,
  Briefcase,
  Award,
  MapPin,
  User,
  CheckCircle,
} from "lucide-react";
import TutorProfileSkeleton from "@/components/loading/TutorProfileSkeleton";
import { BiBookAlt } from "react-icons/bi";

export default function TutorProfile() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [tutorCourses, setTutorCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const [tutorRes, coursesRes] = await Promise.all([
          api.tutorDetail(id as string),
          api.coursesList(),
        ]);

        const tutorPayload = (tutorRes as any)?.data ?? tutorRes;
        const coursesPayload = (coursesRes as any)?.data ?? coursesRes;

        const courses = Array.isArray(coursesPayload)
          ? coursesPayload
          : coursesPayload?.results || [];

        setData(tutorPayload);

        const filtered = courses.filter(
          (c: any) => Number(c?.tutor?.id ?? c?.tutor) === Number(id),
        );

        setTutorCourses(filtered);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTutorData();
  }, [id]);

  if (loading) return <TutorProfileSkeleton />;

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        استاد پیدا نشد
      </div>
    );

  const tutor = data.tutor || data;
  const tutorName =
    `${tutor?.user?.first_name || ""} ${tutor?.user?.last_name || ""}`.trim();

  return (
    <div className="min-h-screen pb-20">
      <div className="relative mt-62 max-w-7xl mx-auto">
        {/* <div className="h-60 bg-linear-to-r from-blue-900 via-blue-800 to-blue-600"></div> */}

        <div className="absolute inset-x-0 -bottom-20 flex justify-start px-4">
          <div className="w-3xl bg-[var(--card-bg)] rounded-3xl p-8 shadow-[var(--shadow-custom)] border border-[var(--card-border)] flex gap-6 ">
            {tutor.profile_picture ? (
              <img
                src={tutor.profile_picture}
                alt={tutorName}
                className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-2xl bg-blue-100 border-4 border-[var(--card-border)] shadow-lg flex items-center justify-center">
                <User size={64} className="text-blue-500" strokeWidth={1.5} />
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[var(--primary)]">
                {tutorName}
                {tutor.is_approved && (
                  <CheckCircle className="text-green-500 w-5 h-5" />
                )}
              </h1>
              <p className="text-blue-600 mt-1">مدرس دوره‌های آموزشی</p>

              <div className="flex gap-6 mt-4 text-sm text-[var(--secondary)] flex-wrap">
                {tutor.country && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} /> {tutor.country}
                  </div>
                )}
                {tutor.user?.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={16} /> {tutor.user.email}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-28"></div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[var(--card-bg)] p-8 rounded-3xl shadow-sm border border-[var(--card-border)]">
            <h2 className="text-xl font-bold mb-4">درباره استاد</h2>
            <p className="text-[var(--secondary)] leading-relaxed">
              {tutor.bio || "توضیحاتی ثبت نشده است."}
            </p>

            {tutor.teaching_style && (
              <div className="mt-6 bg-[var(--background)] text-[var(--third)] p-4 rounded-xl text-sm">
                سبک تدریس: {tutor.teaching_style}
              </div>
            )}
            {tutor.intro_video_file && (
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">ویدیو معرفی استاد</h2>
                <div className="overflow-hidden rounded-2xl border border-[var(--card-border)] shadow-inner">
                  <video
                    src={tutor.intro_video_file}
                    controls
                    className="w-full aspect-video bg-slate-900"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold mb-6">دوره‌های استاد</h2>

            {tutorCourses.length === 0 ? (
              <div className="notfound-card">
                <div className="center-card">
                  <div className="icon-bg">
                    <BiBookAlt className="icon" />
                  </div>
                </div>
                <h3 className="header-md"> هنوز دوره‌ای ثبت نشده</h3>
              </div>
            ) : (
              <div className="course-grid">
                {tutorCourses.map((c) => (
                  <CourseCard
                    key={c.id}
                    id={c.id}
                    title={c.title}
                    description={c.description}
                    price={Number(c.price_per_toman || 0)}
                    level={c.level}
                    image={c.image}
                    showTutor={false}
                    showPrice={false}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[var(--card-bg)] rounded-3xl p-6 shadow-sm border border-[var(--card-border)]">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <GraduationCap className="text-blue-600" /> تحصیلات
            </h3>

            {data.educations?.length ? (
              data.educations.map((edu: any) => (
                <div
                  key={edu.id}
                  className="mb-4 pb-3 border-b border-[var(--card-border)]"
                >
                  <p className="font-semibold  text-sm bg-[var(--background)] rounded-xl p-3 mb-2">
                    {edu.degree}
                  </p>
                  <p className="text-xs text-[var(--secondary)]">
                    {edu.institution_name}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--primary)]">ثبت نشده</p>
            )}
          </div>

          <div className="bg-[var(--card-bg)] rounded-3xl p-6 shadow-[var(--shadow-custom)] border border-[var(--card-border)]">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Briefcase className="text-blue-600" /> سوابق کاری
            </h3>

            {data.experiences?.length ? (
              data.experiences.map((exp: any) => (
                <div key={exp.id} className="mb-4">
                  <p className="font-semibold rounded-xl p-3 text-sm text-[var(--primary)] bg-[var(--background)] mb-2">
                    {exp.title}
                  </p>
                  <p className="text-xs text-[var(--secondary)]">
                    {exp.organization}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">ثبت نشده</p>
            )}
          </div>

          <div className="bg-[var(--card-bg)] rounded-3xl p-6 shadow-sm border border-[var(--card-border)]">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Award className="text-blue-600" /> مدارک
            </h3>

            {data.certificates?.length ? (
              data.certificates.map((c: any) => (
                <div
                  key={c.id}
                  className="bg-[var(--background)] rounded-xl p-3 text-sm mb-2"
                >
                  {c.title}
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--secondary)]">ثبت نشده</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
