"use client";

import Link from "next/link";
import { BiCalendar, BiRightArrowAlt } from "react-icons/bi";

const articles = [
  {
    id: 1,
    title: "چطور دایره لغات زبان انگلیسی را سریع‌تر تقویت کنیم؟",
    excerpt:
      "در این مقاله با روش‌هایی کاربردی برای افزایش دامنه لغات و ماندگاری بیشتر آن‌ها آشنا می‌شوید.",
    date: "۱۲ خرداد ۱۴۰۵",
    category: "یادگیری زبان",
  },
  {
    id: 2,
    title: "5 تکنیک کاربردی برای تقویت مهارت Speaking",
    excerpt:
      "اگر در مکالمه انگلیسی اعتماد به نفس کافی نداری، این تکنیک‌ها می‌توانند شروع بسیار خوبی باشند.",
    date: "۱۸ خرداد ۱۴۰۵",
    category: "Speaking",
  },
  {
    id: 3,
    title: "بهترین روش برنامه‌ریزی برای یادگیری روزانه زبان",
    excerpt:
      "یک برنامه ساده اما منظم می‌تواند سرعت یادگیری شما را چند برابر کند. در این مقاله مسیر را مشخص کرده‌ایم.",
    date: "۲۲ خرداد ۱۴۰۵",
    category: "برنامه‌ریزی",
  },
];

const LatestArticles = () => {
  return (
    <section className="container-custom">
      <div className="title-card">
        <div>
          <span className="small-header">وبلاگ آموزشی</span>
          <h2 className="main-header">آخرین مقالات</h2>
          <p className="small-p">
            سه مقاله آخر برای یادگیری بهتر و رشد سریع‌تر
          </p>
        </div>

        <Link href="/blog" className="arrow-link">
          مشاهده همه مقالات
          <BiRightArrowAlt className="text-xl" />
        </Link>
      </div>

      <div className="course-grid">
        {articles.map((article) => (
          <div
            key={article.id}
            className="group bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                {article.category}
              </span>
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <BiCalendar />
                <span>{article.date}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 leading-8 mb-3 group-hover:text-blue-600 transition-colors">
              {article.title}
            </h3>

            <p className="text-sm text-gray-600 leading-7 mb-5 line-clamp-3">
              {article.excerpt}
            </p>

            <Link
              href={`/blog/${article.id}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              مطالعه مقاله
              <BiRightArrowAlt className="text-lg" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestArticles;
