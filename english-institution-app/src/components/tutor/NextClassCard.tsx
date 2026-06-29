"use client";

import { BiTimeFive } from "react-icons/bi";
import { findNextClass, formatHoursFromNow } from "@/lib/schedule";
import { toPersianDigits } from "@/app/utils/toPersianNum";

export type Weekday =
  | "Saturday"
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday";

export interface CourseForSchedule {
  id: number;
  title: string;
  schedule_day: Weekday;
  schedule_start: string;
}

export default function NextClassCard({
  courses,
}: {
  courses: CourseForSchedule[];
}) {
  const next = findNextClass(courses);
  if (!next) return null;

  const now = new Date();
  const whenText = toPersianDigits(formatHoursFromNow(next.date, now));

  const timeFa = next.date.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const dayFa = next.date.toLocaleDateString("fa-IR", { weekday: "long" });

  return (
    <div className="bg-(--card-bg) w-full mx-auto md:w-2xl rounded-2xl p-5 shadow-sm border border-(--card-border) flex items-center justify-between hover:shadow-(--shadow-custom) transition .4s">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-50 text-third p-3 rounded-xl">
          <BiTimeFive size={24} />
        </div>
        <div>
          <div className="text-sm text-secondary">کلاس بعدی</div>
          <div className="font-bold text-primary">
            {`«${next.course.title}» ساعت ${timeFa} (${dayFa})`}
          </div>
          <div className="text-xs text-secondary mt-1">{whenText}</div>
        </div>
      </div>
    </div>
  );
}
