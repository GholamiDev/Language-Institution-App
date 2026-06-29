"use client";

import { useState } from "react";
import api from "@/app/services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
}

export default function EnrollmentModal({
  isOpen,
  onClose,
  courseId,
}: EnrollmentModalProps) {
  const router = useRouter();
  const [paymentAmount, setPaymentAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [paymentNote, setPaymentNote] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [buying, setBuying] = useState(false);

  if (!isOpen) return null;

  const handleSubmitEnrollment = async () => {
    if (!paymentAmount) {
      toast.error("لطفاً مبلغ پرداخت را وارد کنید.");
      return;
    }

    if (!selectedFile) {
      toast.error("لطفاً فیش پرداخت را آپلود کنید.");
      return;
    }

    try {
      setBuying(true);

      const formData = new FormData();
      formData.append("course", String(courseId));
      formData.append("payment_amount", paymentAmount);
      formData.append("currency", currency);
      formData.append("payment_note", paymentNote);
      formData.append("payment_proof", selectedFile);

      await api.createEnrollment(formData);

      toast.success("درخواست ثبت‌نام با موفقیت ارسال شد.");

      setPaymentAmount("");
      setCurrency("USD");
      setPaymentNote("");
      setSelectedFile(null);

      onClose();
      router.push("/courses");
    } catch (err: any) {
      console.error(err);
      console.log("Enrollment error response:", err?.data);
      toast.error("خطا در ثبت درخواست دوره");
    } finally {
      setBuying(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl border border-slate-100 animate-[fadeIn_.2s_ease]"
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          ثبت‌نام در دوره
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-600">
              مبلغ پرداخت
            </label>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
              placeholder="مثلاً 100.00"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-slate-600">
              واحد پول
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            >
              <option value="USD">USD</option>
              <option value="TOMAN">TOMAN</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-slate-600">
              توضیحات پرداخت
            </label>
            <textarea
              value={paymentNote}
              onChange={(e) => setPaymentNote(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
              rows={3}
              placeholder="مثلاً شماره پیگیری یا توضیح پرداخت"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-600">
              فیش پرداخت
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-7 flex gap-3">
          <button
            onClick={onClose}
            disabled={buying}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 font-medium text-slate-700 hover:border-red-400 hover:text-red-400 transition disabled:opacity-50 cursor-pointer"
          >
            انصراف
          </button>

          <button
            onClick={handleSubmitEnrollment}
            disabled={buying}
            className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 font-bold text-white hover:bg-blue-700 transition .4s disabled:opacity-50 shadow-sm cursor-pointer"
          >
            {buying ? "در حال ثبت..." : "تأیید و ثبت"}
          </button>
        </div>
      </div>
    </div>
  );
}
