"use client";

import { useEffect } from "react";
import Link from "next/link";
import { BiError, BiRefresh, BiHome } from "react-icons/bi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <BiError size={64} className="text-red-500" />
      </div>

      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
        اوه! مشکلی پیش آمد
      </h1>
      <p className="text-gray-500 max-w-md mb-8">
        به نظر می‌رسد در سیستم خطایی رخ داده است. نگران نباشید، تیم فنی در حال
        بررسی است.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition-all font-semibold cursor-pointer"
        >
          <BiRefresh size={20} />
          تلاش مجدد
        </button>

        <Link href="/">
          <button className="flex items-center gap-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-2xl hover:bg-gray-200 transition-all font-semibold cursor-pointer">
            <BiHome size={20} />
            بازگشت به خانه
          </button>
        </Link>
      </div>
    </div>
  );
}
