// lib/schedule.ts
export type Weekday =
  | "Saturday"
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday";

const weekdayIndex: Record<Weekday, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

// برگرداندن تاریخ/زمان جلسه بعدی برای یک course
export function getNextOccurrenceDate(opts: {
  schedule_day: Weekday;
  schedule_start: string; // "HH:MM:SS"
  now?: Date;
}) {
  const now = opts.now ?? new Date();
  const targetDow = weekdayIndex[opts.schedule_day];

  const startParts = opts.schedule_start.split(":").map(Number);
  const hour = startParts[0] ?? 0;
  const minute = startParts[1] ?? 0;
  const second = startParts[2] ?? 0;

  const next = new Date(now);
  next.setHours(hour, minute, second, 0);

  // JS getDay: Sunday=0 ... Saturday=6
  const currentDow = now.getDay();
  let diff = targetDow - currentDow;

  // اگر امروز هست ولی زمانش گذشته، برو هفته بعد
  if (diff === 0 && next <= now) diff = 7;
  if (diff < 0) diff += 7;

  next.setDate(now.getDate() + diff);
  return next;
}

export function findNextClass<
  CourseLike extends { schedule_day: Weekday; schedule_start: string },
>(courses: CourseLike[], now = new Date()) {
  const withDate = courses
    .map((c) => ({
      course: c,
      date: getNextOccurrenceDate({
        schedule_day: c.schedule_day,
        schedule_start: c.schedule_start,
        now,
      }),
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return withDate[0] ?? null;
}

export function formatHoursFromNow(target: Date, now = new Date()) {
  const ms = target.getTime() - now.getTime();
  const minutes = Math.round(ms / 60000);
  const h = Math.floor(Math.abs(minutes) / 60);
  const m = Math.abs(minutes) % 60;

  if (minutes >= 0)
    return `در ${h ? `${h} ساعت` : ""}${h && m ? " و " : ""}${m ? `${m} دقیقه` : ""} آینده`;
  return `${h ? `${h} ساعت` : ""}${h && m ? " و " : ""}${m ? `${m} دقیقه` : ""} قبل`;
}
