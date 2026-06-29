"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/services/api";
import { toast } from "react-toastify";
import {
  BiSave,
  BiArrowBack,
  BiEdit,
  BiDollar,
  BiCalendar,
} from "react-icons/bi";
import CourseEditSkeleton from "@/components/loading/CourseEditSkeleton";
import CourseNotFound from "@/components/CourseNotFound";
import { CourseData } from "@/app/types/types";

export default function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const courseId = resolvedParams.id;

  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const languageOptions = [
    { label: "فارسی", value: "farsi" },
    { label: "انگلیسی", value: "english" },
    { label: "آلمانی", value: "german" },
    { label: "فرانسه", value: "french" },
    { label: "عربی", value: "arabic" },
  ];
  const levelOptions = [
    { label: "مقدماتی", value: "beginner" },
    { label: "متوسط", value: "intermediate" },
    { label: "پیشرفته", value: "advanced" },
  ];
  const dayOptions = [
    { label: "شنبه", value: "Saturday" },
    { label: "یکشنبه", value: "Sunday" },
    { label: "دوشنبه", value: "Monday" },
    { label: "سه‌شنبه", value: "Tuesday" },
    { label: "چهارشنبه", value: "Wednesday" },
    { label: "پنجشنبه", value: "Thursday" },
    { label: "جمعه", value: "Friday" },
  ];

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;

      try {
        setLoading(true);
        setError(null);

        const res = await api.courseDetail(courseId);
        const payload = (res as any)?.data ?? res;

        setCourseData({
          id: payload.id || courseId,
          title: payload.title || "",
          description: payload.description || "",
          detail: payload.detail ?? "",
          requirements: payload.requirements ?? "",
          materials: payload.materials ?? "",
          price_per_toman: Number(payload.price_per_toman || 0),
          price_per_dollar: Number(payload.price_per_dollar ?? 0),
          price_per_hour: Number(payload.price_per_hour ?? 0),
          image: payload.image || null,
          language: payload.language ?? "",
          level: payload.level ?? "",
          schedule_day: payload.schedule_day ?? "",
          schedule_start: payload.schedule_start,
          schedule_end: payload.schedule_end,
          capacity: Number(payload.capacity ?? 0),
          course_duration: Number(payload.course_duration ?? 0),
        });
      } catch (err: any) {
        console.error("Error fetching course details:", err);
        setError(
          `خطا در بارگذاری اطلاعات دوره: ${err?.response?.data?.message || err.message || "خطای ناشناخته"}`,
        );
        toast.error(
          `خطا در بارگذاری اطلاعات دوره: ${err?.response?.data?.message || err.message || "خطای ناشناخته"}`,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const formatTime = (time: string | undefined | null) => {
    if (!time) return undefined;
    if (time.length === 5) return `${time}:00`;
    return time;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    setCourseData((prev) => {
      if (!prev) return null;

      let newValue: string | number | null | undefined = value;

      if (
        type === "number" ||
        name.includes("price") ||
        name === "capacity" ||
        name === "course_duration"
      ) {
        newValue = value === "" ? null : Number(value);
      }

      return {
        ...prev,
        [name]: newValue,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseData) {
      setError("داده‌های دوره نامعتبر هستند.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const dataToSend = {
        title: courseData.title,
        description: courseData.description,
        detail: courseData.detail || undefined,
        requirements: courseData.requirements || undefined,
        materials: courseData.materials || undefined,
        language: courseData.language || undefined,
        level: courseData.level || undefined,

        price_per_toman:
          courseData.price_per_toman === 0
            ? undefined
            : courseData.price_per_toman,
        price_per_dollar:
          courseData.price_per_dollar === 0 ||
          courseData.price_per_dollar === null
            ? undefined
            : courseData.price_per_dollar,
        price_per_hour:
          courseData.price_per_hour === 0 || courseData.price_per_hour === null
            ? undefined
            : courseData.price_per_hour,

        schedule_day: courseData.schedule_day || undefined,
        schedule_start: formatTime(courseData.schedule_start) || undefined,
        schedule_end: formatTime(courseData.schedule_end) || undefined,
        capacity:
          courseData.capacity === 0 || courseData.capacity === null
            ? undefined
            : courseData.capacity,
        course_duration:
          courseData.course_duration === 0 ||
          courseData.course_duration === null
            ? undefined
            : courseData.course_duration,
      };

      Object.keys(dataToSend).forEach((key) => {
        if ((dataToSend as any)[key] === undefined) {
          delete (dataToSend as any)[key];
        }
      });

      await api.updateCourse(courseId, dataToSend as any);

      toast.success("تغییرات دوره با موفقیت ذخیره شد.");
      router.push("/tutor/dashboard");
    } catch (err: any) {
      console.error("Error submitting course update:", err);

      // setError(`خطا در ثبت اطلاعات دوره: ${err}`);
      router.push("/login");
      toast.error(`خطا در ثبت اطلاعات دوره: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <CourseEditSkeleton />;
  if (error) return <div className="p-4 mt-25 text-red-600">{error}</div>;
  if (!courseData) return <CourseNotFound />;

  return (
    <div className="min-h-[80vh] p-4 md:p-10 w-full lg:w-5xl mx-auto rounded-3xl">
      <div className="flex lg:w-3xl mx-auto items-center justify-between mb-10 mt-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="my-btn white-btn rounded-full"
          >
            <BiArrowBack className="text-xl text-third" />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-primary">ویرایش دوره</h1>
            <p className="text-sm text-secondary">
              اطلاعات دوره خود را بروزرسانی کنید
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-(--card-bg) lg:w-3xl mx-auto border border-(--card-border) shadow-xl rounded-3xl p-8 space-y-7"
      >
        <div>
          <label className="block text-sm font-semibold text-secondary mb-2">
            عنوان دوره
          </label>
          <div className="relative">
            <BiEdit className="absolute top-4 left-3 text-third" />
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleChange}
              required
              className="add-course-input"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-secondary mb-2">
            توضیحات کوتاه
          </label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            required
            rows={4}
            className="add-course-text w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-secondary mb-2">
            جزئیات دوره
          </label>
          <textarea
            name="detail"
            value={courseData.detail ?? ""}
            onChange={handleChange}
            rows={5}
            className="w-full add-course-text"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-secondary mb-2">
            پیش‌نیازها
          </label>
          <textarea
            name="requirements"
            value={courseData.requirements ?? ""}
            onChange={handleChange}
            rows={4}
            className="w-full add-course-text"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-secondary mb-2">
            منابع و متریال
          </label>
          <textarea
            name="materials"
            value={courseData.materials ?? ""}
            onChange={handleChange}
            rows={4}
            className="w-full add-course-text"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-semibold text-secondary mb-2">
              قیمت تومان
            </label>
            <div className="relative">
              <BiDollar className="absolute top-4 left-1 text-blue-400" />
              <input
                type="number"
                name="price_per_toman"
                value={courseData.price_per_toman}
                onChange={handleChange}
                required
                min="0"
                className="add-course-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary mb-2">
              قیمت دلار
            </label>
            <input
              type="number"
              name="price_per_dollar"
              value={courseData.price_per_dollar ?? 0}
              onChange={handleChange}
              min="0"
              className="add-course-input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary mb-2">
              قیمت ساعتی
            </label>
            <input
              type="number"
              name="price_per_hour"
              value={courseData.price_per_hour ?? 0}
              onChange={handleChange}
              min="0"
              className="add-course-input"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-semibold text-secondary mb-2">
              روز برگزاری
            </label>

            <div className="relative">
              <BiCalendar className="absolute top-4 left-5 text-blue-400" />
              <select
                name="schedule_day"
                value={courseData.schedule_day ?? ""}
                onChange={handleChange}
                className="select-input"
              >
                <option value="">انتخاب روز</option>
                {dayOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary mb-2">
              زمان شروع
            </label>

            <div className="relative">
              <input
                type="time"
                name="schedule_start"
                value={courseData.schedule_start ?? ""}
                onChange={handleChange}
                className="add-course-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary mb-2">
              زمان پایان
            </label>

            <div className="relative">
              <input
                type="time"
                name="schedule_end"
                value={courseData.schedule_end ?? ""}
                onChange={handleChange}
                className="add-course-input"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-secondary mb-2">
              ظرفیت دوره
            </label>
            <input
              type="number"
              name="capacity"
              value={courseData.capacity ?? 0}
              onChange={handleChange}
              min="1"
              required
              className="add-course-input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary mb-2">
              مدت دوره (دقیقه)
            </label>
            <input
              type="number"
              name="course_duration"
              value={courseData.course_duration ?? 0}
              onChange={handleChange}
              min="0"
              className="add-course-input"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="my-btn blue-btn w-full"
        >
          {submitting ? (
            "در حال ذخیره..."
          ) : (
            <>
              <BiSave size={20} /> ذخیره تغییرات
            </>
          )}
        </button>
      </form>
    </div>
  );
}
