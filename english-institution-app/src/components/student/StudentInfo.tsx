"use client";

import { useEffect, useState } from "react";
import { getMe } from "@/app/services/auth.services";
import { BiUser, BiIdCard, BiEnvelope, BiShield } from "react-icons/bi";

interface MeResponse {
  id: number;
  username: string;
  email: string;
  role: "student" | "tutor";
  full_name?: string;
}

export default function StudentInfo() {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (err) {
        console.error("خطا در دریافت اطلاعات کاربر", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return <div className="p-4">در حال بارگذاری...</div>;
  }

  if (!user) {
    return <div className="p-4 text-red-600">عدم دسترسی به اطلاعات کاربر</div>;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
        <h1 className="text-2xl font-bold text-gray-800">اطلاعات کاربری</h1>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2 text-gray-600">
            <BiUser className="text-blue-600 text-xl" />
            <span className="font-medium">نام کاربری</span>
          </div>
          <span className="text-gray-800 font-semibold">{user.username}</span>
        </div>

        {user.full_name && (
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2 text-gray-600">
              <BiIdCard className="text-blue-600 text-xl" />
              <span className="font-medium">نام و نام خانوادگی</span>
            </div>
            <span className="text-gray-800 font-semibold">
              {user.full_name}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2 text-gray-600">
            <BiEnvelope className="text-blue-600 text-xl" />
            <span className="font-medium">ایمیل</span>
          </div>
          <span className="text-gray-800 font-semibold">{user.email}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <BiShield className="text-blue-600 text-xl" />
            <span className="font-medium">نقش</span>
          </div>
          <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-sm font-semibold">
            {user.role === "student" ? "دانشجو" : "استاد"}
          </span>
        </div>
      </div>
    </div>
  );
}
