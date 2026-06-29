"use client";

import { useEffect, useMemo, useState } from "react";
import api, {
  buildCourseFormData,
  CreateCoursePayload,
} from "@/app/services/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SelectField from "@/components/ui/SelectField";
import CreateCourseLoading from "@/components/loading/CreateCourseSkeleton";
import { MeResponse } from "@/app/types/types";

const dayOptions = [
  { value: "Saturday", label: "شنبه" },
  { value: "Sunday", label: "یکشنبه" },
  { value: "Monday", label: "دوشنبه" },
  { value: "Tuesday", label: "سه‌شنبه" },
  { value: "Wednesday", label: "چهارشنبه" },
  { value: "Thursday", label: "پنج‌شنبه" },
  { value: "Friday", label: "جمعه" },
];

const levelOptions = [
  { value: "Beginner", label: "مبتدی" },
  { value: "Intermediate", label: "متوسط" },
  { value: "Advanced", label: "پیشرفته" },
  { value: "Native", label: "بومی" },
];

const languageOptions = [
  { value: "English", label: "انگلیسی" },
  { value: "German", label: "آلمانی" },
  { value: "French", label: "فرانسوی" },
  { value: "Turkish", label: "ترکی" },
  { value: "Arabic", label: "عربی" },
  { value: "Persian", label: "فارسی" },
];

function RequiredStar() {
  return <span className="mr-1 text-red-500">*</span>;
}

export default function CreateCoursePage() {
  const router = useRouter();

  const [checkingAccess, setCheckingAccess] = useState(true);
  const [me, setMe] = useState<MeResponse | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState<CreateCoursePayload>({
    title: "",
    description: "",
    detail: "",
    requirements: "",
    materials: "",
    price_per_hour: "",
    price_per_dollar: "",
    price_per_toman: "",
    language: languageOptions[0].value,
    level: levelOptions[0].value,
    schedule_day: dayOptions[0].value,
    schedule_start: "",
    schedule_end: "",
    capacity: "",
    length: 20,
    course_duration: 60,
    image: null as File | null,
    language_flag: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    let mounted = true;

    async function checkAccess() {
      try {
        const meData = await api.me();

        if (!mounted) return;
        setMe(meData);

        if (!meData) {
          router.push("/login");
          return;
        }

        if (!meData.is_teacher || !meData.has_tutor_profile) {
          router.push("/register");
          return;
        }

        if (meData.tutor_approved !== true) {
          router.push("/tutor/pending-approval");
          return;
        }
      } catch (error: any) {
        router.push("/login");
        return;
      } finally {
        if (mounted) setCheckingAccess(false);
      }
    }

    checkAccess();

    return () => {
      mounted = false;
    };
  }, [router]);

  useEffect(() => {
    if (!form.image) {
      setImagePreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(form.image);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [form.image]);

  const fullName = useMemo(() => {
    if (!me) return "مدرس";
    return [me.first_name, me.last_name].filter(Boolean).join(" ") || "مدرس";
  }, [me]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "image" || name === "language_flag") {
      setForm((prev) => ({
        ...prev,
        [name]: files && files[0] ? files[0] : null,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm() {
    if (!form.title.trim()) return "عنوان دوره الزامی است.";
    if (!form.language.trim()) return "زبان دوره الزامی است.";
    if (!form.level.trim()) return "سطح دوره الزامی است.";
    if (!form.schedule_day.trim()) return "روز برگزاری الزامی است.";
    if (!form.schedule_start.trim()) return "ساعت شروع الزامی است.";
    if (!form.schedule_end.trim()) return "ساعت پایان الزامی است.";
    if (!String(form.capacity).trim()) return "ظرفیت دوره الزامی است.";

    const capacityNumber = Number(form.capacity);
    if (Number.isNaN(capacityNumber) || capacityNumber <= 0) {
      return "ظرفیت دوره باید یک عدد معتبر بیشتر از صفر باشد.";
    }

    if (form.price_per_toman !== "" && Number(form.price_per_toman) < 0) {
      return "قیمت به تومان نمی‌تواند منفی باشد.";
    }

    if (form.price_per_dollar !== "" && Number(form.price_per_dollar) < 0) {
      return "قیمت به دلار نمی‌تواند منفی باشد.";
    }

    if (form.price_per_hour !== "" && Number(form.price_per_hour) < 0) {
      return "قیمت ساعتی نمی‌تواند منفی باشد.";
    }

    return "";
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setPageError("");
    setSuccessMessage("");

    const validationError = validateForm();
    if (validationError) {
      setPageError(validationError);
      return;
    }

    try {
      setSubmitting(true);

      const payload: CreateCoursePayload = {
        title: form.title.trim(),
        description: form.description.trim(),
        detail: form.detail.trim(),
        requirements: form.requirements.trim(),
        materials: form.materials.trim(),
        price_per_hour: form.price_per_hour,
        price_per_dollar: form.price_per_dollar,
        price_per_toman: form.price_per_toman,
        language: form.language,
        level: form.level,
        schedule_day: form.schedule_day,
        schedule_start: form.schedule_start,
        schedule_end: form.schedule_end,
        capacity: form.capacity,
        length: form.length,
        course_duration: form.course_duration,
        image: form.image,
        language_flag: form.language_flag,
      };

      const formData = buildCourseFormData(payload);

      const createdCourse = await api.createCourse(formData);

      toast.success("دوره با موفقیت ایجاد شد.");
      setSuccessMessage("دوره با موفقیت ایجاد شد.");

      const createdId = createdCourse?.id;
      setTimeout(() => {
        if (createdId) {
          router.push(`/courses/${createdId}`);
        } else {
          router.push("/tutor/dashboard");
        }
      }, 800);
    } catch (error: any) {
      console.error("Backend Error:", error?.data || error);

      const backendErrors = error?.data;
      if (backendErrors && typeof backendErrors === "object") {
        const errorMessages = Object.entries(backendErrors)
          .map(
            ([field, msgs]) =>
              `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`,
          )
          .join(" | ");
        setPageError(errorMessages);
      } else {
        setPageError(
          "خطای سرور (500). احتمالاً داده‌های ارسالی با مدل دیتابیس همخوانی ندارند.",
        );
      }

      toast.error("خطا در ثبت دوره.");
    } finally {
      setSubmitting(false);
    }
  }

  if (checkingAccess) {
    return <CreateCourseLoading />;
  }

  return (
    <div dir="rtl" className="min-h-screen bg-linear-to-b px-4 py-8 pb-15">
      <div className="mx-auto mt-20 w-full max-w-275">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-(--card-border) bg-(--card-bg) p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-md">
          <div>
            <p className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-[13px] font-bold text-third">
              پنل مدرس
            </p>
            <h1 className="mb-2 text-3xl font-bold leading-[1.3] text-primary">
              ایجاد دوره جدید
            </h1>
            <p className="max-w-175 text-[15px] leading-8 text-secondary">
              {fullName} عزیز، اطلاعات دوره خود را با دقت وارد کنید تا صفحه‌ای
              حرفه‌ای و کامل برای دانشجویان نمایش داده شود.
            </p>
          </div>

          <button
            type="button"
            className="my-btn white-btn"
            onClick={() => router.push("/tutor/dashboard")}
          >
            بازگشت به داشبورد
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[28px] border border-(--card-border) bg-(--card-bg) p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
        >
          {pageError ? (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 leading-8 text-red-700">
              {pageError}
            </div>
          ) : null}

          {successMessage ? (
            <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 leading-8 text-green-700">
              {successMessage}
            </div>
          ) : null}

          <div className="mb-8 border-b border-(--card-border) pb-6">
            <h2 className="mb-5 text-xl font-bold text-primary">
              اطلاعات اصلی دوره
            </h2>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="mb-4 flex flex-col gap-2">
                <label className="text-sm font-bold text-secondary">
                  عنوان دوره
                  <RequiredStar />
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="مثلاً دوره مکالمه زبان انگلیسی"
                  className="add-course-input"
                />
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-sm font-bold text-secondary">
                  زبان دوره
                  <RequiredStar />
                </label>
                <SelectField
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                >
                  {languageOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </SelectField>
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-sm font-bold text-secondary">
                  سطح دوره
                  <RequiredStar />
                </label>
                <SelectField
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                >
                  {levelOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </SelectField>
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-sm font-bold text-secondary">
                  ظرفیت
                  <RequiredStar />
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  placeholder="مثلاً 20"
                  min={1}
                  className="add-course-input"
                />
              </div>
            </div>

            <div className="mb-4 flex flex-col gap-2">
              <label className="text-sm font-bold text-secondary">
                توضیح کوتاه
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="یک معرفی کوتاه و جذاب از دوره بنویسید"
                rows={4}
                className="add-course-text"
              />
            </div>

            <div className="mb-4 flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">
                جزئیات دوره
              </label>
              <textarea
                name="detail"
                value={form.detail}
                onChange={handleChange}
                placeholder="سرفصل‌ها، روش تدریس، خروجی نهایی و..."
                rows={5}
                className="add-course-text"
              />
            </div>
          </div>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <h2 className="mb-5 text-xl font-bold text-primary">
              زمان‌بندی برگزاری
            </h2>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="mb-4 flex flex-col gap-2">
                <label className="text-sm font-bold text-secondary">
                  روز برگزاری
                  <RequiredStar />
                </label>
                <SelectField
                  name="schedule_day"
                  value={form.schedule_day}
                  onChange={handleChange}
                >
                  {dayOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </SelectField>
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-sm font-bold text-secondary">
                  ساعت شروع
                  <RequiredStar />
                </label>
                <input
                  type="time"
                  name="schedule_start"
                  value={form.schedule_start}
                  onChange={handleChange}
                  className="add-course-input"
                />
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-sm font-bold text-secondary">
                  ساعت پایان
                  <RequiredStar />
                </label>
                <input
                  type="time"
                  name="schedule_end"
                  value={form.schedule_end}
                  onChange={handleChange}
                  className="add-course-input"
                />
              </div>
            </div>
          </div>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <h2 className="mb-5 text-xl font-bold text-primary">
              قیمت‌گذاری و جزئیات اجرایی
            </h2>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="mb-4 flex flex-col gap-2">
                <label className="text-sm font-bold text-secondary">
                  قیمت به تومان
                </label>
                <input
                  type="number"
                  name="price_per_toman"
                  value={form.price_per_toman}
                  onChange={handleChange}
                  placeholder="مثلاً 960000"
                  min={0}
                  className="add-course-input"
                />
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-sm font-bold text-secondary">
                  قیمت به دلار
                </label>
                <input
                  type="number"
                  name="price_per_dollar"
                  value={form.price_per_dollar}
                  onChange={handleChange}
                  placeholder="مثلاً 12"
                  min={0}
                  className="add-course-input"
                />
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-sm font-bold text-secondary">
                  قیمت ساعتی
                </label>
                <input
                  type="number"
                  name="price_per_hour"
                  value={form.price_per_hour}
                  onChange={handleChange}
                  placeholder="مثلاً 10"
                  min={0}
                  className="add-course-input"
                />
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-sm font-bold text-secondary">
                  تعداد جلسات
                </label>
                <input
                  type="number"
                  name="length"
                  value={form.length}
                  onChange={handleChange}
                  min={1}
                  className="add-course-input"
                />
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-sm font-bold text-secondary">
                  مدت هر جلسه (دقیقه)
                </label>
                <input
                  type="number"
                  name="course_duration"
                  value={form.course_duration}
                  onChange={handleChange}
                  min={1}
                  className="add-course-input"
                />
              </div>
            </div>
          </div>

          <div className="mb-8 border-b border-slate-200 pb-6">
            <h2 className="mb-5 text-xl font-bold text-primary">
              پیش‌نیازها و منابع
            </h2>

            <div className="mb-4 flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">
                پیش‌نیازها
              </label>
              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                placeholder="مثلاً آشنایی اولیه با گرامر پایه"
                rows={4}
                className="add-course-text"
              />
            </div>

            <div className="mb-4 flex flex-col gap-2">
              <label className="text-sm font-bold text-secondary">
                منابع و متریال
              </label>
              <textarea
                name="materials"
                value={form.materials}
                onChange={handleChange}
                placeholder="کتاب‌ها، فایل‌ها، تمرین‌ها یا منابع کمک‌آموزشی"
                rows={4}
                className="add-course-text"
              />
            </div>
          </div>

          <div className="mb-8 pb-2">
            <h2 className="mb-5 text-xl font-bold text-primary">تصاویر دوره</h2>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="mb-4 flex flex-col gap-2">
                <label className="text-sm font-bold text-secondary">
                  تصویر اصلی دوره
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="add-course-input"
                />
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-sm font-bold text-secondary">
                  پرچم زبان
                </label>
                <input
                  type="file"
                  name="language_flag"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="add-course-input"
                />
              </div>
            </div>

            {imagePreview ? (
              <div className="mt-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-3 font-bold text-secondary">
                  پیش‌نمایش تصویر دوره
                </p>
                <img
                  src={imagePreview}
                  alt="preview"
                  className="block w-full max-w-[360px] rounded-2xl"
                />
              </div>
            ) : null}
          </div>

          <div className="mt-3 flex flex-wrap justify-start gap-3">
            <button
              type="button"
              className="my-btn white-btn"
              onClick={() => router.push("/tutor/dashboard")}
              disabled={submitting}
            >
              انصراف
            </button>

            <button
              type="submit"
              className="my-btn blue-btn disabled:cursor-not-allowed disabled:opacity-60"
              disabled={submitting}
            >
              {submitting ? "در حال ایجاد دوره..." : "ایجاد دوره"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
