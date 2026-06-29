"use client";

import { useEffect, useState } from "react";
import api from "@/app/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiPlus, BiUser, BiMoney, BiBookOpen } from "react-icons/bi";
import { toast } from "react-toastify";
import TutorCourseCard from "@/components/tutor/TutorCourseCard";
import DeleteCourseModal from "@/components/ui/DeleteCourseModal";
import TutorDashEmptyState from "@/components/tutor/TutorDashEmptyState";
import CourseToolbar from "@/components/tutor/CourseToolbar";
import NextClassCard from "@/components/tutor/NextClassCard";
import TeachingScheduleMiniCalendar from "@/components/tutor/MiniCalender";
import DashboardSkeleton from "@/components/loading/TutorDashSkeleton";
import { Course, TutorInfo } from "@/app/types/types";
import { dayToPersian } from "../../../utils/daysToPersian";
import { toPersianNumber } from "@/app/utils/toPersianNum";

export default function TutorDashboard() {
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [tutorInfo, setTutorInfo] = useState<TutorInfo | null>(null);
  const [filters, setFilters] = useState({
    q: "",
    language: "",
    level: "",
  });
  const router = useRouter();

  const filtered = myCourses.filter((c) => {
    const qOk = filters.q
      ? c.title.toLowerCase().includes(filters.q.toLowerCase())
      : true;
    const langOk =
      filters.language === "" ? true : c.language === filters.language;
    const levelOk = filters.level === "" ? true : c.level === filters.level;
    return qOk && langOk && levelOk;
  });

  const languages = Array.from(
    new Set(myCourses.map((course) => course.language).filter(Boolean)),
  );

  const levels = Array.from(
    new Set(myCourses.map((course) => course.level).filter(Boolean)),
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const meResponse = await api.me();
        const responseData = meResponse?.data ?? meResponse;

        // console.log("Response from api.me():", responseData);

        // if (!responseData?.has_profile) {
        //   router.push("/tutor/complete-profile");
        //   return;
        // }

        const currentTutorId = responseData?.tutor_id;
        setTutorInfo(responseData);

        if (currentTutorId === undefined) {
          console.error(
            "Could not determine current tutor ID from api.me() response.",
          );
          toast.error("خطا در دریافت شناسه مدرس.");
          setLoading(false);
          return;
        }

        const coursesResponse = await api.coursesList();
        const allCourses: Course[] =
          coursesResponse.results || coursesResponse || [];

        const filteredCourses = allCourses.filter(
          (course) => course.tutor && course.tutor.id === currentTutorId,
        );

        setMyCourses(filteredCourses);
      } catch (err) {
        console.error("خطا در دریافت اطلاعات داشبورد:", err);
        toast.error("خطا در بارگذاری اطلاعات داشبورد.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openDeleteModal = (course: Course) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedCourse) return;

    try {
      await api.deleteCourse(selectedCourse.id);
      setMyCourses(myCourses.filter((c: Course) => c.id !== selectedCourse.id));
      toast.success("دوره با موفقیت حذف شد.");
    } catch (err: any) {
      console.error("خطا در حذف دوره:", err);
      toast.error(err.data?.detail || err.message || "خطا در حذف دوره");
    } finally {
      setShowDeleteModal(false);
      setSelectedCourse(null);
    }
  };

  if (loading) return <DashboardSkeleton />;
  if (!tutorInfo || tutorInfo.id === undefined) {
    return (
      <div className="text-center py-20">
        خطا در بارگذاری اطلاعات مدرس. لطفاً مجدداً تلاش کنید.
      </div>
    );
  }

  const totalCoursesCount = myCourses.length;

  return (
    <>
      {showDeleteModal && selectedCourse && (
        <DeleteCourseModal
          title={selectedCourse.title}
          setShowDeleteModal={() => setShowDeleteModal(false)}
          confirmDelete={confirmDelete}
        />
      )}
      <div className="container-custom">
        <div className="justify-self-center flex flex-wrap justify-between items-center md:w-3xl lg:w-5xl mb-10 px-3 mt-24">
          <div className="ml-2 md:ml-0 mb-4 md:mb-0">
            <h1 className="text-3xl flex gap-2 font-extrabold text-primary">
              <span className="blue-col"></span>
              مدیریت دوره‌ها
            </h1>
            <p className="text-secondary mt-1">لیست دوره‌های شما</p>
          </div>
          <Link href={"/tutor/create-course"}>
            <button className="my-btn blue-btn cursor-pointer">
              <BiPlus size={22} />
              ثبت دوره جدید
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto px-3">
          <div className="tutor-dash-card">
            <div className="text-3xl bg-indigo-50 p-3 rounded-xl ml-2 text-third">
              <BiUser size={30} />
            </div>
            <div>
              <p className="text-sm text-secondary">دانشجویان فعال</p>
              <p className="text-xl font-bold text-primary">
                {toPersianNumber(tutorInfo?.total_active_students ?? 0)}
              </p>
            </div>
          </div>
          <div className="tutor-dash-card">
            <div className="text-3xl bg-indigo-50 p-3 rounded-xl ml-2 text-third">
              <BiMoney size={30} />
            </div>
            <div>
              <p className="text-sm text-secondary">درآمدهای ماه اخیر</p>
              <p className="text-xl font-bold text-primary">
                {tutorInfo?.monthly_income ?? "۰"} تومان
              </p>
            </div>
          </div>
          <div className="tutor-dash-card">
            <div className="text-3xl bg-indigo-50 p-3 rounded-xl ml-2 text-third">
              <BiBookOpen size={30} />
            </div>
            <div>
              <p className="text-sm text-secondary">دوره‌های منتشر شده</p>
              <p className="text-xl font-bold text-primary">
                {toPersianNumber(totalCoursesCount)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-self-center gap-4 w-full md:w-3xl lg:w-5xl">
          <h1 className="text-md  text-primary mb-3 mx-auto">
            لیست کلاس های هفتگی شما
          </h1>
          <NextClassCard courses={myCourses} />
          <TeachingScheduleMiniCalendar courses={myCourses} />
        </div>

        <div className="mt-5">
          <CourseToolbar
            languages={languages}
            levels={levels}
            onChange={setFilters}
            value={filters}
          />
        </div>
        {myCourses.length === 0 ? (
          <TutorDashEmptyState />
        ) : (
          <div className="w-full flex justify-center items-center px-3">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((c: Course) => (
                <TutorCourseCard
                  key={c.id}
                  id={c.id}
                  courseId={c.id}
                  title={c.title}
                  schedule_start={c.schedule_start}
                  schedule_day={dayToPersian(c.schedule_day)}
                  openDeleteModal={() => openDeleteModal(c)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
