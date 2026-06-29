export default function CreateCourseLoading() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-linear-to-b px-4 py-8 pb-15 animate-pulse"
    >
      <div className="mx-auto mt-20 w-full max-w-275">
        {/* Header Card */}
        <div className="mb-6 rounded-3xl border border-slate-200/80 bg-(--card-bg) p-6 shadow-sm">
          <div className="space-y-3">
            <div className="h-6 w-28 rounded-full bg-slate-200" />
            <div className="h-8 w-60 rounded-lg bg-(--card-bg)" />
            <div className="h-4 w-full max-w-xl rounded bg-slate-200" />
          </div>
        </div>

        {/* Form Container */}
        <div className="rounded-[28px] border border-slate-200 bg-(--card-bg) p-6 shadow-sm space-y-10">
          {/* Section Template */}
          {[1, 2, 3, 4, 5].map((section) => (
            <div
              key={section}
              className="space-y-6 border-b border-slate-200 pb-6 last:border-b-0"
            >
              {/* Section Title */}
              <div className="h-6 w-56 rounded bg-slate-300" />

              {/* Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-24 rounded bg-(--card-bg)" />
                    <div className="h-12 w-full rounded-2xl bg-slate-100" />
                  </div>
                ))}
              </div>

              {/* Textarea Placeholder */}
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-(--card-bg)" />
                <div className="h-24 w-full rounded-2xl bg-slate-100" />
              </div>
            </div>
          ))}

          {/* Image Upload Area */}
          <div className="space-y-4">
            <div className="h-6 w-40 rounded bg-slate-300" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-20 rounded-2xl bg-slate-100 border border-dashed border-slate-300" />
              <div className="h-20 rounded-2xl bg-slate-100 border border-dashed border-slate-300" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <div className="h-12 w-32 rounded-2xl bg-slate-200" />
            <div className="h-12 w-40 rounded-2xl bg-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
