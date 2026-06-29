"use client";

import { useEffect, useState } from "react";
import api from "@/app/services/api";
import Link from "next/link";
import TutorDashboardSkeleton from "./TutorDashboradSkeleton";
import {
  BiEdit,
  BiTrash,
  BiPlus,
  BiTimeFive,
  BiCheckCircle,
  BiBookOpen,
} from "react-icons/bi";
import { toast } from "react-toastify";

export default function TutorDashboard() {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{
    id: number;
    title: string;
  } | null>(null);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setLoading(true);
        const res = await api.get("/auth/courses/my-tutor-courses/");
        setMyCourses(res.data);
      } catch (err) {
        console.error("خطا در دریافت دوره‌های استاد");
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  const openDeleteModal = (id: number, title: string) => {
    setSelectedCourse({ id, title });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedCourse) return;

    try {
      await api.delete(`/auth/courses/${selectedCourse.id}/delete/`);
      setMyCourses(myCourses.filter((c: any) => c.id !== selectedCourse.id));
      toast.success("دوره با موفقیت حذف شد.");
    } catch (err: any) {
      toast.error("خطا در حذف دوره");
    } finally {
      setShowDeleteModal(false);
      setSelectedCourse(null);
    }
  };

  if (loading) return "در حال بارگزاری...";

  return (
    <>
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setShowDeleteModal(false)}
          ></div>

          <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-2xl transform transition-all scale-100">
            <div className="text-center">
              <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BiTrash size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">حذف دوره</h3>
              <p className="text-gray-500 text-sm mb-8">
                آیا از حذف دوره{" "}
                <span className="font-bold text-gray-700">
                  {selectedCourse?.title}
                </span>{" "}
                مطمئن هستید؟ این عمل غیرقابل بازگشت است.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 text-white py-3 rounded-2xl font-semibold hover:bg-red-700 transition-colors cursor-pointer"
                >
                  بله، حذف شود
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  انصراف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full h-[80vh]">
        <div className="justify-self-center flex justify-between items-center md:w-3xl lg:w-5xl mb-10 mt-25 px-3">
          <div className="ml-2 md:ml-0">
            <h1 className="text-3xl flex gap-2 font-extrabold text-gray-800">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              مدیریت دوره‌ها
            </h1>
            <p className="text-gray-500 mt-1">
              لیست دوره‌هایی که شما تدریس می‌کنید
            </p>
          </div>
          <Link href={"/dashboard/tutor/create-course"}>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 font-semibold cursor-pointer">
              <BiPlus size={22} />
              ثبت دوره جدید
            </button>
          </Link>
        </div>

        {myCourses.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">هنوز هیچ دوره‌ای ثبت نکرده‌اید.</p>
          </div>
        ) : (
          <div className="w-full flex justify-self-center justify-center items-center md:w-3xl lg:w-5xl">
            <div className="w-full mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.map((c: any) => (
                <div
                  key={c.id}
                  className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        c.status === "approved"
                          ? "bg-green-50 text-green-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {c.status === "approved" ? (
                        <BiCheckCircle />
                      ) : (
                        <BiTimeFive />
                      )}
                      {c.status === "approved"
                        ? "منتشر شده"
                        : "در انتظار تایید"}
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/courses/${c.id}/edit`}>
                        <button
                          className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                          title="ویرایش"
                        >
                          <BiEdit size={20} />
                        </button>
                      </Link>
                      <button
                        onClick={() => openDeleteModal(c.id, c.title)}
                        className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                        title="حذف"
                      >
                        <BiTrash size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gray-100 p-3 rounded-2xl text-gray-400">
                      <BiBookOpen size={28} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 line-clamp-1">
                        {c.title}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                        <BiTimeFive />
                        {new Date(c.created_at).toLocaleDateString("fa-IR")}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-50 pt-4">
                    {c.status === "approved" ? (
                      <Link
                        href={`/courses/${c.id}`}
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        مشاهده جزئیات صفحه دوره
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
