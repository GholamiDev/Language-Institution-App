"use client";

type Weekday =
  | "Saturday"
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday";

type CourseForSchedule = {
  id: number;
  title: string;
  schedule_day: Weekday;
  schedule_start: string;
};

const weekDaysFa = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];

export default function TeachingScheduleMiniCalendar({
  courses,
}: {
  courses: CourseForSchedule[];
}) {
  const now = new Date();

  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay());
  start.setHours(0, 0, 0, 0);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });

  const occurrencesThisWeek = courses
    .map((c) => {
      const targetDayName = c.schedule_day;
      const targetDayObj = days.find(
        (d) =>
          d.toLocaleDateString("en-US", { weekday: "long" }) === targetDayName,
      );

      if (!targetDayObj) return null;

      const [h, m] = (c.schedule_start || "00:00:00").split(":");
      const classDate = new Date(targetDayObj);
      classDate.setHours(parseInt(h), parseInt(m), 0);

      return { c, date: classDate };
    })
    .filter(
      (item): item is { c: CourseForSchedule; date: Date } => item !== null,
    );

  return (
    <div className="bg-(--card-bg) rounded-2xl p-5 shadow-sm border border-(--card-border)">
      <div className="font-bold text-primary mb-3">تقویم آموزشی این هفته</div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((d, idx) => {
          const hasClass = occurrencesThisWeek.some(
            (x) => x.date.toDateString() === d.toDateString(),
          );
          const isToday = d.toDateString() === now.toDateString();
          return (
            <div
              key={idx}
              className={[
                "rounded-xl p-2 text-center border text-xs",
                hasClass
                  ? "bg-indigo-50 border-third text-third"
                  : "bg-slate-50 border-slate-100 text-secondary",
                isToday ? "ring-2 ring-third text-third" : "",
              ].join(" ")}
            >
              <div className="font-medium">{weekDaysFa[idx]}</div>
              <div className="mt-1">
                {d.toLocaleDateString("fa-IR", { day: "2-digit" })}
              </div>
              {hasClass && (
                <div className="mt-1 text-[10px] font-bold">کلاس</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 space-y-2">
        {occurrencesThisWeek.length === 0 ? (
          <div className="text-sm text-secondary">
            این هفته کلاسی ثبت نشده است.
          </div>
        ) : (
          occurrencesThisWeek
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map(({ c, date }) => (
              <div
                key={c.id}
                className="flex items-center justify-between text-sm bg-slate-50 border border-slate-100 rounded-xl px-3 py-2"
              >
                <div className="font-medium text-slate-800 line-clamp-1">
                  {c.title}
                </div>
                <div className="text-slate-600">
                  {date.toLocaleDateString("fa-IR", { weekday: "long" })} •{" "}
                  {date.toLocaleTimeString("fa-IR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
