"use client";

import { BiCopy, BiCheck } from "react-icons/bi";
import { useState } from "react";

export default function QuickActions({
  courseId,
}: {
  courseId: number | string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const url = `${window.location.origin}/courses/${courseId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      onClick={copy}
      className=" p-2 bg-blue-50 text-gray-700 rounded-xl  hover:bg-gray-600 hover:text-white transition-colors cursor-pointer"
      title="کپی لینک"
    >
      {copied ? <BiCheck size={18} /> : <BiCopy size={18} />}
    </button>
  );
}
