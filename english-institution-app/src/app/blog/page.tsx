"use client";
import { useEffect, useState } from "react";
import { api } from "@/app/services/api";
import BlogCard from "@/components/BlogCard";
import BlogSkeleton from "@/components/loading/BlogSkeleton";
import { Blog } from "../types/types";
import { BiBookAlt } from "react-icons/bi";

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.getBlogs();
        setBlogs(res);
      } catch (error) {
        setError("خطا در دریافت اطلاعات");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container-custom">
      <div className="secondary-container">
        <div className="mb-4">
          <h1 className="blue-title">
            <span className="blue-col"></span>
            مقالات آموزشی
          </h1>
          <p className="small-p">
            با این مقالات میتونی مسیر یادگیری رو بهتر انتخاب کنی
          </p>
        </div>
        {loading ? (
          <div className="course-grid">
            {[1, 2, 3].map((i) => (
              <BlogSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="notfound-card">
            <div className="center-card">
              <div className="icon-bg">
                <BiBookAlt className="icon" />
              </div>
            </div>
            <h3 className="header-md">مقاله ای پیدا نشد</h3>
            <p className="small-p text-red-500">خطا در یافت اطلاعات</p>
          </div>
        ) : (
          <div className="course-grid">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
