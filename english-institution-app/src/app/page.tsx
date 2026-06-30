"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import HeroSection from "@/components/home/HeroSection";
import CourseSearchBar from "@/components/home/CourseSearchBar";
import LatestArticles from "@/components/home/LatestArticles";
import { BiBookAlt, BiRightArrowAlt } from "react-icons/bi";
import CommentsSlider from "@/components/home/CommentSlider";
import api from "./services/api";
import { AnimatePresence, motion } from "framer-motion";
import CourseSkeleton from "@/components/loading/CourseSkeleton";

type Course = {
  id: number;
  title: string;
  description: string;
  price_per_toman: number;
  level: string;
  image?: string | null;
  tutorName?: string;
};

interface Tutor {
  id: number;
  user: {
    first_name: string;
    last_name: string;
  };
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [coursesData, tutorsData] = await Promise.all([
          api.coursesList(),
          api.tutorsList(),
        ]);

        const rawCourses = Array.isArray(coursesData)
          ? coursesData
          : coursesData?.results || [];
        const tutors = Array.isArray(tutorsData)
          ? tutorsData
          : tutorsData?.results || [];

        const tutorMap = tutors.reduce(
          (acc: Record<number, string>, tutor: Tutor) => {
            acc[tutor.id] = `${tutor.user.first_name} ${tutor.user.last_name}`;
            return acc;
          },
          {} as Record<number, string>,
        );
        // console.log(tutorMap);

        const enrichedCourses = rawCourses.map((c: any) => ({
          ...c,
          tutorName: tutorMap[c.tutor.id] || "مدرس ناشناس",
        }));

        setCourses(enrichedCourses);
      } catch (err) {
        console.error(err);
        setError("خطا در دریافت اطلاعات");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) =>
        course.title.toLowerCase().includes(search.toLowerCase()),
      )
      .slice(0, 6);
  }, [courses, search]);

  return (
    <main className=" min-h-screen">
      <HeroSection />
      <section className="container-custom">
        <div className="title-card">
          <div>
            <span className="small-header">دوره‌های آموزشی</span>
            <h2 className="main-header ">جدیدترین دوره‌ها</h2>
            <p className="small-p">
              جستجو کن و بهترین دوره مناسب خودت را پیدا کن
            </p>
          </div>

          <Link href="/courses" className="arrow-link">
            مشاهده همه دوره‌ها
            <BiRightArrowAlt className="text-xl" />
          </Link>
        </div>

        <div className="mb-10">
          <CourseSearchBar value={search} onChange={setSearch} />
        </div>

        {loading ? (
          <div className="course-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="notfound-card">
            <div className="center-card">
              <div className="icon-bg">
                <BiBookAlt className="icon" />
              </div>
            </div>

            <h3 className="header-md">خطا در دریافت اطلاعات</h3>
            <p className="small-p text-red-500">لطفاً دوباره تلاش کنید.</p>
          </div>
        ) : filteredCourses.length > 0 ? (
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
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    level={course.level}
                    description={course.description}
                    price={course.price_per_toman}
                    image={course.image}
                    tutor_name={course.tutorName}
                    showTutor={true}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
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
        )}
      </section>

      <LatestArticles />
      <CommentsSlider />
    </main>
  );
}
