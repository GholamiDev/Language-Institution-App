"use client";

import Link from "next/link";
import { BiPlus } from "react-icons/bi";

export default function TutorDashEmptyState() {
  return (
    <div className="text-center py-16 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 max-w-5xl mx-auto px-6">
      <div className="text-xl font-bold text-slate-800">
        هنوز دوره‌ای نساختید
      </div>
      <div className="text-slate-500 mt-2">
        اولین دوره‌تان را بسازید تا دانشجوها بتوانند ثبت‌نام کنند.
      </div>

      <div className="mt-6">
        <Link href="/tutor/create-course">
          <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl hover:bg-indigo-700">
            <BiPlus size={20} />
            ساخت اولین دوره
          </button>
        </Link>
      </div>
    </div>
  );
}
