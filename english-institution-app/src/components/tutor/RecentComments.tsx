"use client";

import { BiMessageRoundedDots } from "react-icons/bi";

export type CommentItem = {
  id: string | number;
  courseTitle: string;
  studentName: string;
  text: string;
  createdAt: string;
};

export default function RecentComments({
  items,
  onQuickReply,
}: {
  items: CommentItem[];
  onQuickReply: (commentId: CommentItem["id"], message: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-3">
        <div className="font-bold text-slate-900">نظرات اخیر</div>
        <div className="text-xs text-slate-500">{items.length} مورد</div>
      </div>

      {items.length === 0 ? (
        <div className="text-sm text-slate-500">هنوز نظری ثبت نشده است.</div>
      ) : (
        <div className="space-y-3">
          {items.slice(0, 3).map((c) => (
            <div
              key={c.id}
              className="border border-slate-100 rounded-xl p-3 bg-slate-50"
            >
              <div className="text-xs text-slate-500">
                {c.studentName} • {c.courseTitle}
              </div>
              <div className="text-sm text-slate-800 mt-1">{c.text}</div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => {
                    const msg = prompt("پاسخ سریع را وارد کنید:");
                    if (msg && msg.trim()) onQuickReply(c.id, msg.trim());
                  }}
                  className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  <BiMessageRoundedDots />
                  پاسخ سریع
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
