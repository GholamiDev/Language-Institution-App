import Link from "next/link";
import {
  BiPhone,
  BiEnvelope,
  BiMap,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoTelegram,
  BiLogoYoutube,
} from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-30 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="col-span-1 lg:col-span-1">
          <h2 className="text-white text-2xl font-bold mb-4">آکادمی من</h2>
          <p className="text-sm leading-relaxed mb-6 text-gray-400">
            ما در آکادمی من معتقدیم که یادگیری هرگز متوقف نمی‌شود. هدف ما فراهم
            کردن دسترسی آسان و با کیفیت به دانش روز دنیا برای همه است.
          </p>
          <div
            className="italic text-blue-400 text-sm font-medium text-justify"
            dir="ltr"
          >
            {
              "The beautiful thing about learning is that no one can take it away from you."
            }
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6 text-lg">دسترسی سریع</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <Link
                href="/courses"
                className="hover:text-blue-400 transition-colors"
              >
                لیست دوره‌ها
              </Link>
            </li>
            <li>
              <Link
                href="/tutors"
                className="hover:text-blue-400 transition-colors"
              >
                اساتید برتر
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-blue-400 transition-colors"
              >
                درباره ما
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-blue-400 transition-colors"
              >
                همکاری با ما
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6 text-lg">ارتباط با ما</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <BiPhone className="text-blue-500 text-xl" />
              <span dir="ltr">+98 919 286 4866</span>
            </li>
            <li className="flex items-center gap-3">
              <BiEnvelope className="text-blue-500 text-xl" />
              <span>aligholami.dev@gmail.com</span>
            </li>
            <li className="flex items-center gap-3 leading-6">
              <BiMap className="text-blue-500 text-2xl shrink-0" />
              <span>
                تهران، میدان آزادی، بلوار دانش، ساختمان آکادمی من ،طبقه 5
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6 text-lg">
            ما را دنبال کنید
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            در شبکه‌های اجتماعی از جدیدترین دوره‌ها باخبر شوید:
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-2xl hover:bg-pink-600 hover:text-white transition-all"
            >
              <BiLogoInstagram size={24} />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-2xl hover:bg-blue-600 hover:text-white transition-all"
            >
              <BiLogoLinkedin size={24} />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-2xl hover:bg-blue-400 hover:text-white transition-all"
            >
              <BiLogoTelegram size={24} />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-2xl hover:bg-red-600 hover:text-white transition-all"
            >
              <BiLogoYoutube size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 text-center">
        <p className="text-xs text-gray-500">
          تمامی حقوق مادی و معنوی این وب‌سایت متعلق به آکادمی من می‌باشد. ۲۰۲۶
          &copy;
        </p>
      </div>
    </footer>
  );
};

export default Footer;
