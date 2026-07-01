"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/app/services/api";
import {
  FaShareAlt,
  FaTelegram,
  FaTwitter,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { BlogDetailSkeleton } from "@/components/loading/BlogDetailSkeleton";
import { calculateReadingTime } from "@/app/utils/CalculateReadingTime";
import { toPersianNumber } from "@/app/utils/toPersianNum";

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }];
}

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const blogId = Array.isArray(id) ? id[0] : id;

    const fetchBlog = async () => {
      try {
        const res = await api.getBlogDetail(blogId);
        setBlog(res);
      } catch (err) {
        console.error("خطا:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <BlogDetailSkeleton />;
  if (!blog) return <div className="text-center py-20">بلاگ پیدا نشد.</div>;

  const readingTime = calculateReadingTime(blog?.content || "");
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = blog?.title || "";

  return (
    <main className=" min-h-screen py-10 px-4 md:px-0 mt-15">
      <article className="max-w-3xl mx-auto bg-(--card-bg) p-8 md:p-12 rounded-2xl shadow-(--shadow-custom) border border-(--card-border)">
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mt-4 mb-2 leading-tight">
            {blog.title}
          </h1>
          <span className="text-primary bg-(--chip-bg) px-3 py-1 rounded-full text-sm ">
            {blog.difficulty_level}
          </span>

          <div className="flex items-center gap-6 text-secondary text-sm mt-6">
            <div className="flex items-center gap-2">
              <FaCalendarAlt />{" "}
              {new Date(blog.created_at).toLocaleDateString("fa-IR")}
            </div>
            <div className="flex items-center gap-2">
              <FaClock /> {toPersianNumber(readingTime)} دقیقه مطالعه
            </div>
          </div>
        </header>

        {blog.picture && (
          <img
            src={blog.picture}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl mb-10"
          />
        )}

        <div
          className="prose prose-blue prose-lg max-w-none text-secondary text-justify"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="mt-16 pt-8 border-t border-blue-100">
          <h3 className="font-bold text-third mb-4 flex items-center gap-2">
            <FaShareAlt /> به اشتراک بگذارید:
          </h3>
          <div className="flex gap-3">
            <button
              onClick={() =>
                window.open(
                  `https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`,
                )
              }
              className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              <FaTelegram size={20} />
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
                )
              }
              className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              <FaTwitter size={20} />
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              <MdContentCopy size={20} />
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}
