"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { BiSolidQuoteAltLeft, BiStar } from "react-icons/bi";

import "swiper/css";
import "swiper/css/pagination";
import { comments } from "@/app/mock/mockComments";

const CommentsSlider = () => {
  return (
    <div className="container-custom">
      <div className="text-center mb-10">
        <span className="small-header">تجربه کاربران</span>
        <h2 className="main-header">نظرات دانشجویان ما</h2>
        <p className="small-p">
          آنچه کاربران درباره تجربه یادگیری در آکادمی ما می‌گویند
        </p>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
        className="pb-14"
      >
        {comments.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="h-full bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-5">
                <div className="bg-blue-50 p-3 rounded-2xl">
                  <BiSolidQuoteAltLeft className="text-2xl text-blue-600" />
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <BiStar
                      key={index}
                      className="text-yellow-400 text-lg fill-yellow-400"
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-600 leading-8 text-sm mb-6">
                {item.comment}
              </p>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-bold text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{item.role}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CommentsSlider;
