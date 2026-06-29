"use client";

import { useEffect, useMemo, useState } from "react";
import { api, buildTutorProfileFormData } from "@/app/services/api";
import Card from "../ui/Card";
import TabButton from "../ui/TabButton";
import Notice from "../ui/Notice";
import FieldLabel from "../ui/FieldLabel";
import EditTextInput from "../ui/EditTextInput";
import PrimaryButton from "../ui/PrimaryButton";
import Chip from "../ui/Chip";
import EditTextArea from "../ui/EditTextArea";
import SecondaryButton from "../ui/SecondaryButton";
import { TutorEditSkeleton } from "../loading/TutorEditSkeleton";

type LanguageLevel = "basic" | "intermediate" | "advanced" | "native";

type LanguageSpoken = {
  language: string;
  level: LanguageLevel;
};

type TutorProfileForm = {
  first_name: string;
  last_name: string;
  phone_number: string;
  country: string;
  bio: string;
  subjects: string[];
  languages_spoken: LanguageSpoken[];
  teaching_style?: string;
  expectation?: string;
  description?: string;
  profile_picture?: File | null;
  intro_video?: File | null;
};

type TabKey = "general" | "teaching" | "media" | "documents";

export default function TutorProfileEdit() {
  const tabs = useMemo(
    () => [
      { key: "general" as TabKey, label: "اطلاعات عمومی" },
      { key: "teaching" as TabKey, label: "تخصص و تدریس" },
      { key: "media" as TabKey, label: "رسانه" },
      { key: "documents" as TabKey, label: "مدارک و سوابق" },
    ],
    [],
  );

  const [activeTab, setActiveTab] = useState<TabKey>("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [subjectInput, setSubjectInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [languageLevel, setLanguageLevel] = useState<LanguageLevel>("basic");
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [form, setForm] = useState<TutorProfileForm>({
    first_name: "",
    last_name: "",
    phone_number: "",
    country: "",
    bio: "",
    subjects: [],
    languages_spoken: [],
    teaching_style: "",
    expectation: "",
    description: "",
    profile_picture: null,
    intro_video: null,
  });
  const [myTutorId, setMyTutorId] = useState<number | null>(null);

  const [certificate, setCertificate] = useState({
    title: "",
    issued_by: "",
    issue_date: "",
    certificate_image: null as File | null,
  });

  const [education, setEducation] = useState({
    degree: "",
    institution_name: "",
    country: "",
    city: "",
    field: "",
    start_date: "",
    end_date: "",
  });

  const [experience, setExperience] = useState({
    title: "",
    organization: "",
    country: "",
    city: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        const tutor = await api.getMyTutorProfile();
        setMyTutorId(tutor.id);

        if (!mounted) return;

        setForm({
          first_name: tutor.user.first_name || "",
          last_name: tutor.user.last_name || "",
          phone_number: tutor.phone_number || "",
          country: tutor.country || "",
          bio: tutor.bio || "",
          subjects: Array.isArray(tutor.subjects) ? tutor.subjects : [],
          languages_spoken: Array.isArray(tutor.languages_spoken)
            ? tutor.languages_spoken
            : [],
          teaching_style: tutor.teaching_style || "",
          expectation: tutor.expectation || "",
          description: tutor.description || "",
          profile_picture: null,
          // intro_video_url: tutor.intro_video_url || "",
        });
      } catch (err: any) {
        setError(err?.data?.detail || "دریافت اطلاعات پروفایل ناموفق بود.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  const addSubject = () => {
    const v = subjectInput.trim();
    if (!v) return;
    setForm((p) => ({
      ...p,
      subjects: Array.from(new Set([...(p.subjects || []), v])),
    }));
    setSubjectInput("");
  };

  const removeSubject = (index: number) => {
    setForm((p) => ({
      ...p,
      subjects: p.subjects.filter((_, i) => i !== index),
    }));
  };

  const addLanguage = () => {
    const v = languageInput.trim();
    if (!v) return;

    setForm((p) => ({
      ...p,
      languages_spoken: [
        ...p.languages_spoken,
        { language: v, level: languageLevel },
      ],
    }));

    setLanguageInput("");
    setLanguageLevel("basic");
  };

  const removeLanguage = (index: number) => {
    setForm((p) => ({
      ...p,
      languages_spoken: p.languages_spoken.filter((_, i) => i !== index),
    }));
  };

  const handleCreateCertificate = async () => {
    if (!myTutorId) {
      setError("شناسه استاد پیدا نشد.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const fd = new FormData();
      fd.append("tutor", String(myTutorId));
      fd.append("title", certificate.title);
      fd.append("issued_by", certificate.issued_by);
      if (certificate.issue_date) {
        fd.append("issue_date", certificate.issue_date);
      }
      if (certificate.certificate_image) {
        fd.append("certificate_image", certificate.certificate_image);
      }

      await api.createTutorCertificate(fd);

      setSuccess("مدرک با موفقیت ثبت شد.");
      setCertificate({
        title: "",
        issued_by: "",
        issue_date: "",
        certificate_image: null,
      });
    } catch (err: any) {
      setError(err?.data?.detail || "ثبت مدرک ناموفق بود.");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateEducation = async () => {
    if (!myTutorId) {
      setError("شناسه استاد پیدا نشد.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await api.createTutorEducation({
        tutor: myTutorId,
        degree: education.degree,
        institution_name: education.institution_name,
        country: education.country,
        city: education.city,
        field: education.field,
        start_date: education.start_date || null,
        end_date: education.end_date || null,
      });

      setSuccess("سابقه تحصیلی با موفقیت ثبت شد.");
      setEducation({
        degree: "",
        institution_name: "",
        country: "",
        city: "",
        field: "",
        start_date: "",
        end_date: "",
      });
    } catch (err: any) {
      setError(err?.data?.detail || "ثبت سابقه تحصیلی ناموفق بود.");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateExperience = async () => {
    if (!myTutorId) {
      setError("شناسه استاد پیدا نشد.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await api.createTutorExperience({
        tutor: myTutorId,
        title: experience.title,
        organization: experience.organization,
        country: experience.country,
        city: experience.city,
        start_date: experience.start_date || null,
        end_date: experience.end_date || null,
        description: experience.description,
      });

      setSuccess("سابقه کاری با موفقیت ثبت شد.");
      setExperience({
        title: "",
        organization: "",
        country: "",
        city: "",
        start_date: "",
        end_date: "",
        description: "",
      });
    } catch (err: any) {
      setError(err?.data?.detail || "ثبت سابقه کاری ناموفق بود.");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const fd = buildTutorProfileFormData(form as any);
      await api.updateTutorProfile(fd);

      setSuccess("تغییرات با موفقیت ذخیره شد.");
    } catch (err: any) {
      setError(err?.data?.detail || "ذخیره تغییرات ناموفق بود.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <TutorEditSkeleton />;
  }

  return (
    <main className="min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-14 mt-15">
        <div className="mb-8">
          <span className="text-third font-semibold text-sm">
            داشبورد استاد
          </span>
          <h1 className="text-3xl font-extrabold text-primary mt-2">
            ویرایش پروفایل
          </h1>
          <p className="text-secondary mt-2 text-sm">
            اطلاعات پروفایل خود را به‌روزرسانی کنید. برخی بخش‌ها بعداً برای
            نمایش در صفحه استاد استفاده می‌شوند.
          </p>
        </div>

        <Card className="p-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <TabButton
                key={tab.key}
                active={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {error ? <Notice tone="error">{error}</Notice> : null}
            {success ? <Notice tone="success">{success}</Notice> : null}
          </div>

          <div className="mt-8">
            {activeTab === "general" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <FieldLabel required>نام</FieldLabel>
                  <EditTextInput
                    value={form.first_name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, first_name: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <FieldLabel required>نام خانوادگی</FieldLabel>
                  <EditTextInput
                    value={form.last_name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, last_name: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <FieldLabel required>شماره تماس</FieldLabel>
                  <EditTextInput
                    value={form.phone_number}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone_number: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <FieldLabel required>کشور</FieldLabel>
                  <EditTextInput
                    value={form.country}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, country: e.target.value }))
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel required>Bio</FieldLabel>
                  <EditTextArea
                    rows={5}
                    value={form.bio}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, bio: e.target.value }))
                    }
                  />
                </div>
              </div>
            )}

            {activeTab === "teaching" && (
              <div className="space-y-8">
                <div>
                  <FieldLabel>موضوعات تدریس</FieldLabel>
                  <div className="flex gap-2">
                    <EditTextInput
                      value={subjectInput}
                      onChange={(e) => setSubjectInput(e.target.value)}
                      placeholder="مثلاً IELTS"
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
                    {form.subjects.map((s, i) => (
                      <Chip key={`${s}-${i}`} onRemove={() => removeSubject(i)}>
                        {s}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <FieldLabel>زبان‌ها</FieldLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="sm:col-span-2">
                      <EditTextInput
                        value={languageInput}
                        onChange={(e) => setLanguageInput(e.target.value)}
                        placeholder="مثلاً English"
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
                    {form.languages_spoken.map((l, i) => (
                      <Chip
                        key={`${l.language}-${l.level}-${i}`}
                        onRemove={() => removeLanguage(i)}
                      >
                        {l.language} ({l.level})
                      </Chip>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <FieldLabel>سبک تدریس</FieldLabel>
                    <EditTextArea
                      rows={4}
                      value={form.teaching_style || ""}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          teaching_style: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <FieldLabel>انتظارات از زبان‌آموز</FieldLabel>
                    <EditTextArea
                      rows={4}
                      value={form.expectation || ""}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, expectation: e.target.value }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel>توضیحات</FieldLabel>
                  <EditTextArea
                    rows={4}
                    value={form.description || ""}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, description: e.target.value }))
                    }
                  />
                </div>
              </div>
            )}

            {activeTab === "media" && (
              <div className="space-y-6">
                <div>
                  <FieldLabel>عکس پروفایل</FieldLabel>
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
                    <div className="mt-2 text-xs text-secondary">
                      فایل انتخاب شد: {form.profile_picture.name}
                    </div>
                  ) : null}
                </div>

                <div>
                  <FieldLabel>لینک ویدیو معرفی</FieldLabel>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        setForm((p) => ({
                          ...p,
                          intro_video_file: file,
                        }));

                        const previewUrl = URL.createObjectURL(file);
                        setVideoPreview(previewUrl);
                      }
                    }}
                    className="w-full border border-(--card-border) rounded-xl p-2 "
                  />
                  {videoPreview && (
                    <div className="mt-4">
                      <p className="text-sm text-secondary  mb-2">
                        پیش‌نمایش ویدیو
                      </p>

                      <video
                        src={videoPreview}
                        controls
                        className="w-full max-w-md rounded-xl border border-(--card-border)"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="space-y-8">
                <Card className="p-5">
                  <h3 className="text-base font-bold text-primary mb-4">
                    مدارک آموزشی
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel required>عنوان مدرک</FieldLabel>
                      <EditTextInput
                        value={certificate.title}
                        onChange={(e) =>
                          setCertificate((p) => ({
                            ...p,
                            title: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel>صادرکننده</FieldLabel>
                      <EditTextInput
                        value={certificate.issued_by}
                        onChange={(e) =>
                          setCertificate((p) => ({
                            ...p,
                            issued_by: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel>تاریخ صدور</FieldLabel>
                      <EditTextInput
                        type="date"
                        value={certificate.issue_date}
                        onChange={(e) =>
                          setCertificate((p) => ({
                            ...p,
                            issue_date: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel>تصویر مدرک</FieldLabel>
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full border border-(--card-border) rounded-2xl px-4 py-3 text-sm"
                        onChange={(e) =>
                          setCertificate((p) => ({
                            ...p,
                            certificate_image: e.target.files?.[0] || null,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <PrimaryButton
                      type="button"
                      onClick={handleCreateCertificate}
                      disabled={saving}
                    >
                      ثبت مدرک
                    </PrimaryButton>
                  </div>
                </Card>

                <Card className="p-5">
                  <h3 className="text-base font-bold text-primary mb-4">
                    سوابق تحصیلی
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel required>مدرک تحصیلی</FieldLabel>
                      <EditTextInput
                        value={education.degree}
                        onChange={(e) =>
                          setEducation((p) => ({
                            ...p,
                            degree: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel required>نام موسسه</FieldLabel>
                      <EditTextInput
                        value={education.institution_name}
                        onChange={(e) =>
                          setEducation((p) => ({
                            ...p,
                            institution_name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel>کشور</FieldLabel>
                      <EditTextInput
                        value={education.country}
                        onChange={(e) =>
                          setEducation((p) => ({
                            ...p,
                            country: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel>شهر</FieldLabel>
                      <EditTextInput
                        value={education.city}
                        onChange={(e) =>
                          setEducation((p) => ({ ...p, city: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel>رشته</FieldLabel>
                      <EditTextInput
                        value={education.field}
                        onChange={(e) =>
                          setEducation((p) => ({ ...p, field: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel>تاریخ شروع</FieldLabel>
                      <EditTextInput
                        type="date"
                        value={education.start_date}
                        onChange={(e) =>
                          setEducation((p) => ({
                            ...p,
                            start_date: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel>تاریخ پایان</FieldLabel>
                      <EditTextInput
                        type="date"
                        value={education.end_date}
                        onChange={(e) =>
                          setEducation((p) => ({
                            ...p,
                            end_date: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <PrimaryButton
                      type="button"
                      onClick={handleCreateEducation}
                      disabled={saving}
                    >
                      ثبت سابقه تحصیلی
                    </PrimaryButton>
                  </div>
                </Card>

                <Card className="p-5">
                  <h3 className="text-base font-bold text-primary mb-4">
                    سوابق کاری
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel required>عنوان</FieldLabel>
                      <EditTextInput
                        value={experience.title}
                        onChange={(e) =>
                          setExperience((p) => ({
                            ...p,
                            title: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel>سازمان</FieldLabel>
                      <EditTextInput
                        value={experience.organization}
                        onChange={(e) =>
                          setExperience((p) => ({
                            ...p,
                            organization: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel>کشور</FieldLabel>
                      <EditTextInput
                        value={experience.country}
                        onChange={(e) =>
                          setExperience((p) => ({
                            ...p,
                            country: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel>شهر</FieldLabel>
                      <EditTextInput
                        value={experience.city}
                        onChange={(e) =>
                          setExperience((p) => ({ ...p, city: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel>تاریخ شروع</FieldLabel>
                      <EditTextInput
                        type="date"
                        value={experience.start_date}
                        onChange={(e) =>
                          setExperience((p) => ({
                            ...p,
                            start_date: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel>تاریخ پایان</FieldLabel>
                      <EditTextInput
                        type="date"
                        value={experience.end_date}
                        onChange={(e) =>
                          setExperience((p) => ({
                            ...p,
                            end_date: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel>توضیحات</FieldLabel>
                      <EditTextInput
                        rows={4}
                        value={experience.description}
                        onChange={(e) =>
                          setExperience((p) => ({
                            ...p,
                            description: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <PrimaryButton
                      type="button"
                      onClick={handleCreateExperience}
                      disabled={saving}
                    >
                      ثبت سابقه کاری
                    </PrimaryButton>
                  </div>
                </Card>
              </div>
            )}
          </div>

          <div className="mt-10 flex items-center justify-between gap-3">
            <SecondaryButton
              type="button"
              onClick={() => window.history.back()}
              disabled={saving}
            >
              بازگشت
            </SecondaryButton>

            <PrimaryButton type="button" onClick={handleSave} disabled={saving}>
              {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </PrimaryButton>
          </div>
        </Card>
      </section>
    </main>
  );
}
