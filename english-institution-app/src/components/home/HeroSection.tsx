"use client";

import { toPersianNumber } from "@/app/utils/toPersianNum";
import Link from "next/link";
import { BiSearchAlt2, BiBookOpen, BiUserVoice } from "react-icons/bi";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-10 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-purple-200 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="hero-grid">
          <div className="text-center lg:text-right">
            <span className="blue-chip">یادگیری هوشمند، آینده روشن</span>

            <h1 className="hero-header">
              یادگیری زبان انگلیسی را
              <span className="text-blue-600"> حرفه‌ای </span>
              شروع کن
            </h1>

            <p className="medium-p">
              در آکادمی ما به مجموعه‌ای از دوره‌های تخصصی زبان، اساتید حرفه‌ای،
              مقالات آموزشی و تجربه یادگیری مدرن دسترسی داری. همین امروز مسیر
              پیشرفتت را شروع کن.
            </p>

            <div className="center-card lg:justify-start">
              <Link href="/courses" className="blue-btn my-btn">
                <BiBookOpen className="text-xl" />
                مشاهده دوره‌ها
              </Link>

              <Link href="/tutors" className="white-btn my-btn">
                <BiUserVoice className="text-xl" />
                آشنایی با اساتید
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10">
              <div className="hero-card">
                <p className="text-2xl font-extrabold text-blue-600">
                  {toPersianNumber(+120)}
                </p>
                <p className="small-p">دوره آموزشی</p>
              </div>
              <div className="hero-card">
                <p className="text-2xl font-extrabold text-green-600">
                  {toPersianNumber(+40)}
                </p>
                <p className="small-p">مدرس فعال</p>
              </div>
              <div className="hero-card">
                <p className="text-2xl font-extrabold text-purple-600">
                  {toPersianNumber(3)}K+
                </p>
                <p className="small-p">دانشجو</p>
              </div>
            </div>
          </div>

          <div className="hero-card">
            <div className="grid grid-cols-1 gap-4">
              <div className=" rounded-2xl p-5 border ">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-600  p-3 rounded-xl">
                    <BiSearchAlt2 className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="header-md">جستجوی سریع دوره‌ها</h3>
                    <p className="small-p">دوره مناسب خودت را راحت پیدا کن</p>
                  </div>
                </div>
                <p className="small-p">
                  از بین دوره‌های متنوع، سریع‌ترین مسیر یادگیری را بر اساس نیاز
                  و سطح خودت انتخاب کن.
                </p>
              </div>

              <div className="rounded-2xl p-5 border ">
                <h3 className="header-md">چرا این آکادمی؟</h3>
                <ul className="space-y-2 pr-4 list-disc small-p">
                  <li> آموزش پروژه‌محور و کاربردی</li>
                  <li> مدرسین باتجربه و حرفه‌ای</li>
                  <li> محتوای آموزشی به‌روز</li>
                  <li> تجربه کاربری سریع و ساده</li>
                </ul>
              </div>

              <div className="secondary-bg rounded-2xl p-5">
                <p className="text-sm opacity-90 mb-2">شروع کن و رشد کن</p>
                <h3 className="text-xl font-bold leading-8">
                  یادگیری امروز، سرمایه‌گذاری برای موفقیت فرداست.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
