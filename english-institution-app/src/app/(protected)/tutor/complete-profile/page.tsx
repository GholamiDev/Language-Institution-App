"use client";

import React, { useMemo, useState } from "react";
import { api, buildTutorProfileFormData } from "@/app/services/api";
import Card from "@/components/ui/complete-profile/Card";
import ErrorBox from "@/components/ui/complete-profile/ErrorBox";
import FieldLabel from "@/components/ui/complete-profile/FieldLabel";
import TextInput from "@/components/ui/complete-profile/TextInput";
import TextArea from "@/components/ui/complete-profile/TextArea";
import PrimaryButton from "@/components/ui/complete-profile/PrimaryButton";
import Chip from "@/components/ui/complete-profile/Chip";
import SecondaryButton from "@/components/ui/complete-profile/SecondaryButton";
import { TutorEditSkeleton } from "@/components/loading/TutorEditSkeleton";
import {
  CreateTutorProfilePayload,
  LanguageLevel,
  LanguageSpoken,
} from "@/app/types/types";

function Stepper({
  step,
  steps,
}: {
  step: number;
  steps: { title: string; desc?: string }[];
}) {
  return (
    <div>
      <div className="flex items-center">
        {steps.map((s, i) => {
          const isActive = i === step;
          const isDone = i < step;

          return (
            <React.Fragment key={s.title}>
              <div className="flex flex-col items-center">
                <div
                  className={[
                    "h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold",
                    isActive
                      ? "bg-third text-white"
                      : isDone
                        ? "bg-blue-50 text-third ring-1 ring-blue-200"
                        : "bg-gray-100 text-secondary",
                  ].join(" ")}
                >
                  {i + 1}
                </div>
                <div
                  className={[
                    "mt-2 text-xs font-semibold text-center w-20",
                    isActive ? "text-primary" : "text-secondary",
                  ].join(" ")}
                >
                  {s.title}
                </div>
              </div>

              {i !== steps.length - 1 && (
                <div className="flex-1 px-2">
                  <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={[
                        "h-1 rounded-full transition-all",
                        i < step ? "w-full bg-third" : "w-0 bg-third",
                      ].join(" ")}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {steps[step]?.desc ? (
        <p className="mt-4 text-sm text-secondary">{steps[step].desc}</p>
      ) : null}
    </div>
  );
}

export default function CompleteTutorProfileWizard() {
  const steps = useMemo(
    () => [
      {
        title: "اصلی",
        desc: "این اطلاعات برای ساخت پروفایل استاد ضروری هستند.",
      },
      {
        title: "تخصص",
        desc: "موضوعات تدریس و زبان‌هایی که می‌توانید با آن‌ها تدریس کنید را وارد کنید.",
      },
      {
        title: "اختیاری",
        desc: "می‌توانید بعداً در داشبورد استاد هم تکمیل کنید.",
      },
      { title: "ارسال", desc: "یک بار مرور کنید و ارسال نهایی را انجام دهید." },
    ],
    [],
  );

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<CreateTutorProfilePayload>({
    first_name: "",
    last_name: "",
    phone_number: "",
    country: "",
    bio: "",
    subjects: [],
    languages_spoken: [],
    teaching_style: "",
    expectation: "",
    profile_picture: null,
    intro_video_url: "",
  });

  const [subjectInput, setSubjectInput] = useState("");
  const addSubject = () => {
    const v = subjectInput.trim();
    if (!v) return;
    setForm((p) => ({
      ...p,
      subjects: Array.from(new Set([...(p.subjects ?? []), v])),
    }));
    setSubjectInput("");
  };
  const removeSubject = (index: number) => {
    setForm((p) => ({
      ...p,
      subjects: (p.subjects ?? []).filter((_, i) => i !== index),
    }));
  };

  const [languageInput, setLanguageInput] = useState("");
  const [languageLevel, setLanguageLevel] = useState<LanguageLevel>("basic");

  const addLanguage = () => {
    const v = languageInput.trim();
    if (!v) return;
    const item: LanguageSpoken = { language: v, level: languageLevel };
    setForm((p) => ({
      ...p,
      languages_spoken: [...(p.languages_spoken ?? []), item],
    }));
    setLanguageInput("");
    setLanguageLevel("basic");
  };

  const removeLanguage = (index: number) => {
    setForm((p) => ({
      ...p,
      languages_spoken: (p.languages_spoken ?? []).filter(
        (_, i) => i !== index,
      ),
    }));
  };

  function validateStep(s: number): string | null {
    if (s === 0) {
      if (!form.first_name.trim()) return "نام الزامی است.";
      if (!form.last_name.trim()) return "نام خانوادگی الزامی است.";
      if (!form.country.trim()) return "کشور الزامی است.";
      if (!form.phone_number.trim()) return "شماره تماس الزامی است.";
      if (!form.bio.trim()) return "معرفی کوتاه (Bio) الزامی است.";
      return null;
    }
    if (s === 1) {
      if ((form.subjects ?? []).length < 1)
        return "حداقل یک موضوع تدریس اضافه کنید.";
      if ((form.languages_spoken ?? []).length < 1)
        return "حداقل یک زبان اضافه کنید.";
      return null;
    }
    return null;
  }

  const next = () => {
    setError("");
    const msg = validateStep(step);
    if (msg) return setError(msg);
    setStep((p) => Math.min(p + 1, steps.length - 1));
  };

  const back = () => {
    setError("");
    setStep((p) => Math.max(p - 1, 0));
  };

  const submit = async () => {
    setError("");
    const s0 = validateStep(0);
    const s1 = validateStep(1);
    if (s0) return setError(s0);
    if (s1) return setError(s1);

    setLoading(true);
    try {
      const fd = buildTutorProfileFormData(form as any);
      await api.createTutorProfile(fd);

      const me = await api.me();
      if ((me as any)?.tutor_approved)
        window.location.href = "/tutor/dashboard";
      else window.location.href = "/tutor/pending-approval";
    } catch (err: any) {
      setError(
        err?.data?.detail ||
          "ارسال اطلاعات ناموفق بود. لطفاً دوباره تلاش کنید.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <TutorEditSkeleton />;
  }

  return (
    <main className=" min-h-screen">
      <section className="max-w-4xl mx-auto px-6 py-14 mt-15">
        <div className="mb-8">
          <span className="text-third font-semibold text-sm">
            پروفایل استاد
          </span>
          <h1 className="text-3xl font-extrabold text-primary mt-2">
            تکمیل پروفایل
          </h1>
          <p className="text-secondary mt-2 text-sm">
            موارد ضروری را کامل کنید. عکس/ویدیو/مدارک اختیاری هستند و بعداً هم
            قابل تکمیل‌اند.
          </p>
        </div>

        <Card className="p-6">
          <Stepper step={step} steps={steps} />
          <div className="mt-6">
            <ErrorBox message={error} />
          </div>

          <div className="mt-6">
            {step === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <FieldLabel required>نام</FieldLabel>
                  <TextInput
                    value={form.first_name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, first_name: e.target.value }))
                    }
                    placeholder="مثلاً: علی"
                  />
                </div>
                <div>
                  <FieldLabel required>نام خانوادگی</FieldLabel>
                  <TextInput
                    value={form.last_name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, last_name: e.target.value }))
                    }
                    placeholder="مثلاً: رضایی"
                  />
                </div>
                <div>
                  <FieldLabel required>کشور</FieldLabel>
                  <TextInput
                    value={form.country}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, country: e.target.value }))
                    }
                    placeholder="مثلاً: Iran"
                  />
                </div>
                <div>
                  <FieldLabel required>شماره تماس</FieldLabel>
                  <TextInput
                    value={form.phone_number}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone_number: e.target.value }))
                    }
                    placeholder="مثلاً: +98..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <FieldLabel required>معرفی کوتاه (Bio)</FieldLabel>
                  <TextArea
                    rows={4}
                    value={form.bio}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, bio: e.target.value }))
                    }
                    placeholder="چند خط درباره تجربه، سبک تدریس و زمینه تخصصی..."
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-7">
                <div>
                  <FieldLabel required>موضوعات تدریس</FieldLabel>
                  <div className="flex gap-2">
                    <TextInput
                      value={subjectInput}
                      onChange={(e) => setSubjectInput(e.target.value)}
                      placeholder="مثلاً: IELTS"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSubject();
                        }
                      }}
                    />
                    <PrimaryButton type="button" onClick={addSubject}>
                      افزودن
                    </PrimaryButton>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {(form.subjects ?? []).map((s, i) => (
                      <Chip key={`${s}-${i}`} onRemove={() => removeSubject(i)}>
                        {s}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <FieldLabel required>زبان‌های قابل تدریس</FieldLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="sm:col-span-2">
                      <TextInput
                        value={languageInput}
                        onChange={(e) => setLanguageInput(e.target.value)}
                        placeholder="مثلاً: English"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addLanguage();
                          }
                        }}
                      />
                    </div>

                    <select
                      value={languageLevel}
                      onChange={(e) =>
                        setLanguageLevel(e.target.value as LanguageLevel)
                      }
                      className="select-input"
                    >
                      <option value="basic">مقدماتی</option>
                      <option value="intermediate">متوسط</option>
                      <option value="advanced">پیشرفته</option>
                      <option value="native">بومی</option>
                    </select>
                  </div>

                  <div className="mt-2">
                    <PrimaryButton type="button" onClick={addLanguage}>
                      افزودن زبان
                    </PrimaryButton>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {(form.languages_spoken ?? []).map((l, i) => (
                      <Chip
                        key={`${l.language}-${l.level}-${i}`}
                        onRemove={() => removeLanguage(i)}
                      >
                        {l.language}{" "}
                        <span className="text-secondary">({l.level})</span>
                      </Chip>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <FieldLabel>سبک تدریس (اختیاری)</FieldLabel>
                    <TextArea
                      rows={3}
                      value={form.teaching_style || ""}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          teaching_style: e.target.value,
                        }))
                      }
                      placeholder="مثلاً تمرکز بر مکالمه و تمرین..."
                    />
                  </div>
                  <div>
                    <FieldLabel>انتظارات از زبان‌آموز (اختیاری)</FieldLabel>
                    <TextArea
                      rows={3}
                      value={form.expectation || ""}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, expectation: e.target.value }))
                      }
                      placeholder="مثلاً انجام تکالیف و حضور منظم..."
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-7">
                <div className="rounded-2xl bg-background border border-(--card-border) p-4 text-sm text-third">
                  این بخش اختیاری است؛ اگر الان انجام ندهید، بعداً در داشبورد
                  استاد قابل تکمیل است.
                </div>

                <div>
                  <FieldLabel>عکس پروفایل (اختیاری)</FieldLabel>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        profile_picture: e.target.files?.[0] || null,
                      }))
                    }
                    className="block w-full text-sm text-secondary
                      file:me-4 file:rounded-2xl file:border-0
                      file:bg-blue-600 file:px-5 file:py-3
                      file:text-sm file:font-semibold file:text-white
                      hover:file:bg-blue-700"
                  />
                  {form.profile_picture ? (
                    <div className="mt-2 text-xs text-gray-500">
                      فایل انتخاب شد: {form.profile_picture.name}
                    </div>
                  ) : null}
                </div>

                <div>
                  <FieldLabel>لینک ویدیو معرفی (اختیاری)</FieldLabel>
                  <TextInput
                    value={form.intro_video_url || ""}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        intro_video_url: e.target.value,
                      }))
                    }
                    placeholder="مثلاً: https://youtube.com/..."
                  />
                </div>

                <div className="rounded-2xl bg-background border border-(--card-border) p-4 text-sm text-third">
                  مدارک، سوابق تحصیلی/کاری و دوره‌ها را بهتر است در «ویرایش
                  پروفایل» داخل داشبورد اضافه کنیم.
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-(--card-border) bg-background p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-secondary">نام:</span>{" "}
                      <span className="font-semibold text-primary">
                        {form.first_name}
                      </span>
                    </div>
                    <div>
                      <span className="text-secondary">نام خانوادگی:</span>{" "}
                      <span className="font-semibold text-primary">
                        {form.last_name}
                      </span>
                    </div>
                    <div>
                      <span className="text-secondary">کشور:</span>{" "}
                      <span className="font-semibold text-primary">
                        {form.country}
                      </span>
                    </div>
                    <div>
                      <span className="text-secondary">شماره تماس:</span>{" "}
                      <span className="font-semibold text-primary">
                        {form.phone_number}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-secondary text-sm">Bio:</div>
                    <div className="mt-1 whitespace-pre-wrap text-sm font-medium text-primary">
                      {form.bio}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-secondary text-sm">موضوعات:</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(form.subjects ?? []).map((s, i) => (
                        <span
                          key={`${s}-${i}`}
                          className="rounded-full bg-(--card-bg) px-3 py-1 text-xs text-primary ring-1 ring-gray-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-secondary text-sm">زبان‌ها:</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(form.languages_spoken ?? []).map((l, i) => (
                        <span
                          key={`${l.language}-${l.level}-${i}`}
                          className="rounded-full bg-(--card-bg) px-3 py-1 text-xs text-primary ring-1 ring-gray-200"
                        >
                          {l.language} ({l.level})
                        </span>
                      ))}
                    </div>
                  </div>

                  {form.intro_video_url ? (
                    <div className="mt-4 text-sm">
                      <span className="text-secondary">ویدیو:</span>{" "}
                      <span className="font-medium text-primary">
                        {form.intro_video_url}
                      </span>
                    </div>
                  ) : null}
                </div>

                <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                  با ارسال نهایی، پروفایل شما ثبت و برای بررسی ارسال می‌شود.
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 flex items-center justify-between gap-3">
            <SecondaryButton onClick={back} disabled={step === 0 || loading}>
              قبلی
            </SecondaryButton>

            {step < steps.length - 1 ? (
              <PrimaryButton onClick={next} disabled={loading}>
                ادامه
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={submit} disabled={loading}>
                {loading ? "در حال ارسال..." : "ارسال نهایی"}
              </PrimaryButton>
            )}
          </div>
        </Card>
      </section>
    </main>
  );
}
