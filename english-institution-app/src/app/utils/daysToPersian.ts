export const dayToPersian = (day?: string) => {
  const map: Record<string, string> = {
    Saturday: "شنبه",
    Sunday: "یکشنبه",
    Monday: "دوشنبه",
    Tuesday: "سه‌شنبه",
    Wednesday: "چهارشنبه",
    Thursday: "پنجشنبه",
    Friday: "جمعه",
  };

  return map[day || ""] || day || "";
};
