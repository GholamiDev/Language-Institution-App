"use client";

import Link from "next/link";

type Blog = {
  id: number;
  title: string;
  description: string;
  picture: string;
  difficulty_level: string;
  created_at: string;
};

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/blog/${blog.id}`}
      className="group block overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--background)] shadow-[var(--shadow-custom)] transition hover:shadow-lg"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={blog.picture}
          alt={blog.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5 text-right">
        <div className="flex items-center justify-between mb-3 text-xs text-[var(--primary)]">
          <span className="px-2 py-1 bg-[var(--chip-bg)] rounded-md">
            {blog.difficulty_level}
          </span>

          <span>{new Date(blog.created_at).toLocaleDateString("fa-IR")}</span>
        </div>

        <h3 className="text-lg font-bold mb-2 text-[var(--primary)] transition">
          {blog.title}
        </h3>

        <p className="text-sm text-[var(--secondary)] line-clamp-3">
          {blog.description}
        </p>

        <div className="mt-4 text-sm font-medium text-blue-600">
          ادامه مطلب ←
        </div>
      </div>
    </Link>
  );
}
