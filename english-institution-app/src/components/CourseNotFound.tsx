import { BiErrorCircle, BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function CourseNotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="bg-white border border-blue-100 shadow-xl rounded-3xl p-10 flex flex-col items-center text-center max-w-md w-full">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <BiErrorCircle className="text-4xl text-blue-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">دوره پیدا نشد</h2>
        <p className="text-gray-500 mb-8">
          متأسفانه دوره‌ای با این مشخصات یافت نشد یا ممکن است حذف شده باشد.
        </p>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition shadow-lg shadow-gray-200"
        >
          <BiArrowBack size={20} />
          بازگشت به عقب
        </button>
      </div>
    </div>
  );
}
