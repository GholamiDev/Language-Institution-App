"use client";

import { toPersianDigits, toPersianNumber } from "@/app/utils/toPersianNum";
import Link from "next/link";
import { BiUser, BiBook } from "react-icons/bi";

type CourseCardProps = {
  id: number;
  title: string;
  description?: string;
  price?: number;
  level?: string;
  image?: string | null;
  tutor_name?: string;
  showTutor?: boolean;
  showPrice?: boolean;
  schedule_day?: string;
  schedule_start?: string;
  status?: string;
};

const CourseCard = ({
  id,
  title,
  description,
  price = 0,
  level,
  image,
  tutor_name,
  showTutor = true,
  showPrice = true,
  schedule_start,
  schedule_day,
  status,
}: CourseCardProps) => {
  const BASE_URL = "http://127.0.0.1:8000";

  const getImageUrl = (image?: string) => {
    if (!image) return "https://placehold.co/600x400?text=Course";

    if (image.startsWith("http")) return image;

    return `${BASE_URL}${image}`;
  };

  return (
    <div className="group border border-[var(--card-border)] rounded-2xl shadow-[var(--shadow-custom)] hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col bg-[var(--background)] hover:-translate-y-1">
      <div className="relative h-44 w-full overflow-hidden bg-gray-100">
        <img
          src={getImageUrl(image)}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 duration-500"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>

        <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-lg flex text-gray-700 items-center gap-1 shadow text-xs font-semibold">
          <BiBook className="text-[var(--third)]" />
          دوره
        </div>

        {status === "approved" && (
          <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-lg shadow">
            تایید شده
          </div>
        )}

        {status === "under_review" && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-3 py-1 rounded-lg shadow">
            در حال بررسی
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col grow">
        <h3 className="font-bold text-lg text-[var(--primary)] line-clamp-1">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-[var(--secondary)] mt-1 line-clamp-2 min-h-10">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between mt-4">
          {level && (
            <span className="text-xs bg-[var(--chip-bg)] text-[var(--primary)] px-3 py-1 rounded-full font-medium">
              {level}
            </span>
          )}

          {showTutor && (
            <div className="flex items-center gap-2 text-sm text-[var(--primary)]">
              <div className="bg-[var(--chip-bg)] p-2 rounded-full">
                <BiUser />
              </div>
              {tutor_name}
            </div>
          )}
        </div>

        <div className="w-full h-px bg-(--card-border) my-4"></div>

        <div className="flex justify-between items-center mt-auto">
          <div>
            {showPrice ? (
              <>
                <span className="text-xs text-[var(--secondary)]">قیمت</span>
                <p className="text-orange-500 font-bold">
                  {toPersianNumber(Number(price))}
                  <span className="text-xs mr-1">تومان</span>
                </p>
              </>
            ) : schedule_day ? (
              <div className="text-xs text-secondary">
                {schedule_day} | {toPersianDigits(schedule_start)}
              </div>
            ) : null}
          </div>

          <Link href={`/courses/${id}`}>
            <button className="bg-blue-600 text-white hover:bg-blue-700 transition px-4 py-2 rounded-lg text-sm shadow-sm cursor-pointer">
              مشاهده
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
