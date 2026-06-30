"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/app/services/api";
import CourseCard from "@/components/CourseCard";
import CoursesFilterToolbar from "@/components/CourseFilterToolbar";
import { AnimatePresence, motion } from "framer-motion";
import CourseSkeleton from "@/components/loading/CourseSkeleton";
import { CourseProps } from "../types/types";
import { BiBookAlt } from "react-icons/bi";
import { toPersianNumber } from "../utils/toPersianNum";

const BASE_URL = "http://127.0.0.1:8000";

const getImageUrl = (image?: string | null) => {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `${BASE_URL}${image}`;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    level: "",
    language: "",
    sort: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const [coursesRes, tutorsRes] = await Promise.all([
          api.coursesList(),
          api.tutorsList(),
        ]);

        const coursesPayload = (coursesRes as any)?.data ?? coursesRes;
        const tutorsPayload = (tutorsRes as any)?.data ?? tutorsRes;

        const normalizedCourses = Array.isArray(coursesPayload)
          ? coursesPayload
          : (coursesPayload?.results ?? []);

        const normalizedTutors = Array.isArray(tutorsPayload)
          ? tutorsPayload
          : (tutorsPayload?.results ?? []);

        const tutorMap = normalizedTutors.reduce(
          (acc: Record<number, string>, tutor: any) => {
            const firstName =
              tutor?.user?.first_name || tutor?.first_name || "";
            const lastName = tutor?.user?.last_name || tutor?.last_name || "";

            const fullName = `${firstName} ${lastName}`.trim() || "مدرس نامشخص";

            acc[tutor.id] = fullName;
            return acc;
          },
          {},
        );

        const coursesWithTutorName = normalizedCourses.map((course: any) => ({
          ...course,
          tutor_name:
            tutorMap[course?.tutor?.id ?? course?.tutor] || "مدرس نامشخص",
        }));

        setCourses(coursesWithTutorName);
      } catch (err) {
        console.error("خطا در دریافت دوره‌ها:", err);
        setError("دریافت دوره‌ها با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const uniqueLevels = useMemo(() => {
    return Array.from(new Set(courses.map((c) => c.level).filter(Boolean)));
  }, [courses]);

  const uniqueLanguages = useMemo(() => {
    return Array.from(
      new Set(
        courses
          .map((c) => c.language)
          .filter((lang): lang is string => Boolean(lang)), // اضافه کردن تایپ گارد
      ),
    );
  }, [courses]);

  const filteredCourses = useMemo(() => {
    let result = [...courses];

    if (filters.search.trim()) {
      const query = filters.search.toLowerCase().trim();
      result = result.filter((course) =>
        course.title?.toLowerCase().includes(query),
      );
    }

    if (filters.level) {
      result = result.filter((course) => course.level === filters.level);
    }

    if (filters.language) {
      result = result.filter((course) => course.language === filters.language);
    }

    if (filters.sort === "price_desc") {
      result.sort(
        (a, b) =>
          Number(b.price_per_toman || 0) - Number(a.price_per_toman || 0),
      );
    }

    if (filters.sort === "price_asc") {
      result.sort(
        (a, b) =>
          Number(a.price_per_toman || 0) - Number(b.price_per_toman || 0),
      );
    }

    if (filters.sort === "newest") {
      result.sort((a, b) => {
        const aDate = new Date(a.created_at || 0).getTime();
        const bDate = new Date(b.created_at || 0).getTime();
        return bDate - aDate;
      });
    }

    return result;
  }, [courses, filters]);

  return (
    <div className="container-custom ">
      <div className="secondary-container">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="blue-title">
              <span className="blue-col"></span>
              دوره‌های آموزشی
            </h1>
            <p className="small-p">
              از بین دوره های موجود، دوره مورد نظر خود را انتخاب کنید.
            </p>
          </div>

          {!loading && !error && (
            <span className="text-sm ">
              {toPersianNumber(filteredCourses.length)} دوره
            </span>
          )}
        </div>

        <CoursesFilterToolbar
          levels={uniqueLevels}
          languages={uniqueLanguages}
          onFilterChange={setFilters}
        />

        {loading && (
          <div className="course-grid">
            {[...Array(6)].map((_, i) => (
              <CourseSkeleton key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="notfound-card">
            <div className="center-card">
              <div className="icon-bg">
                <BiBookAlt className="icon" />
              </div>
            </div>
            <h3 className="header-md">دوره‌ای پیدا نشد</h3>
            <p className="small-p text-red-500">خطا در دریافت اطلاعات</p>
          </div>
        )}

        {!loading && !error && courses.length === 0 && (
          <div className="notfound-card">
            <div className="center-card">
              <div className="icon-bg">
                <BiBookAlt className="icon" />
              </div>
            </div>
            <h3 className="header-md"> هنوز دوره‌ای ثبت نشده</h3>
          </div>
        )}

        {!loading &&
          !error &&
          courses.length > 0 &&
          filteredCourses.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="notfound-card">
                <div className="center-card">
                  <div className="icon-bg">
                    <BiBookAlt className="icon" />
                  </div>
                </div>
                <h3 className="header-md">دوره‌ای پیدا نشد</h3>
                <p className="small-p">
                  عنوان دیگری جستجو کن یا همه دوره‌ها را مشاهده کن.
                </p>
              </div>
            </motion.div>
          )}

        {!loading && !error && filteredCourses.length > 0 && (
          <motion.div layout className="course-grid">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.96 }}
                  transition={{ duration: 0.28 }}
                >
                  <CourseCard
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    price={Number(course.price_per_toman || 0)}
                    level={course.level}
                    image={getImageUrl(course.image)}
                    tutor_name={course.tutor_name}
                    showTutor={true}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
