"use client";

import { BiSupport } from "react-icons/bi";

export default function SupportTicketsSummary({
  unresolvedCount,
  onOpen,
}: {
  unresolvedCount: number;
  onOpen: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-amber-50 text-amber-700 p-3 rounded-xl">
            <BiSupport size={22} />
          </div>
          <div>
            <div className="font-bold text-slate-900">تیکت‌های پشتیبانی</div>
            <div className="text-sm text-slate-600">
              {unresolvedCount} مورد پاسخ‌داده‌نشده
            </div>
          </div>
        </div>

        <button
          onClick={onOpen}
          className="text-sm px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
        >
          مشاهده
        </button>
      </div>
    </div>
  );
}
