import Link from "next/link";
import { BiSearchAlt, BiHome } from "react-icons/bi";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="text-9xl font-extrabold text-secondary mb-4 select-none">
        404
      </div>

      <div className="bg-blue-50 p-6 rounded-full mb-6">
        <BiSearchAlt size={64} className="text-blue-500" />
      </div>

      <h2 className="text-3xl font-bold text-primary mb-2">
        صفحه مورد نظر پیدا نشد!
      </h2>
      <p className="text-secondary max-w-sm mb-8">
        متأسفیم، صفحه‌ای که به دنبال آن هستید حذف شده یا آدرس را اشتباه وارد
        کرده‌اید.
      </p>

      <Link href="/">
        <button className="my-btn blue-btn">
          <BiHome size={20} />
          برگشت به صفحه اصلی
        </button>
      </Link>
    </div>
  );
}
