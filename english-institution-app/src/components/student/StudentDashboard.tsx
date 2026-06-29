"use client";

import { useEffect, useState } from "react";
import { getMyCourses } from "@/app/services/course.services";
import StudentDashboardSkeleton from "./StudentDashboardSkeleton";
import StudentInfo from "./StudentInfo";
import StudentCourseCard from "./StudentCourseCard";

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  image?: string;
  status: "approved" | "pending";
  enrollment_status: "approved" | "pending";
}

export default function StudentDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getMyCourses();
        setCourses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // if (user?.role !== "student") {
  //   return <p>فقط دانشجویان دسترسی دارند.</p>;
  // }

  if (loading) return <StudentDashboardSkeleton />;

  return (
    <div className="w-full flex justify-center min-h-[70vh]">
      <div className="mt-25 mx-3 flex-col w-full md:w-3xl lg:w-5xl">
        <div>
          <StudentInfo />
        </div>
        <h1 className="text-2xl font-bold mb-6 flex gap-2">
          <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
          دوره های من
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <StudentCourseCard
              key={course.id}
              id={course.id}
              enrollment={course.enrollment_status}
              image={course.image}
              title={course.title}
            />
          ))}
        </div>

        {courses.length === 0 && (
          <p className="text-gray-500 mt-6">هنوز دوره‌ای خریداری نکرده‌اید.</p>
        )}
      </div>
    </div>
  );
}
