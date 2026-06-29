export default function TutorProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background pb-20 animate-pulse">
      <div className="relative">
        <div className="h-60 bg-(--card-bg)"></div>

        <div className="absolute inset-x-0 -bottom-20 flex justify-center px-4">
          <div className="w-full max-w-6xl bg-(--card-bg) rounded-3xl p-8 border border-(--card-border) flex flex-col md:flex-row gap-6">
            <div className="w-32 h-32 rounded-2xl bg-slate-200"></div>
            <div className="flex-1 space-y-3 pt-2">
              <div className="h-8 w-64 bg-(--card-bg) rounded-lg"></div>
              <div className="h-4 w-48 bg-slate-200 rounded-lg"></div>
              <div className="flex gap-4 pt-2">
                <div className="h-4 w-32 bg-(--card-bg) rounded"></div>
                <div className="h-4 w-32 bg-slate-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-28"></div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-(--card-bg) p-8 rounded-3xl border border-(--card-border) space-y-4">
            <div className="h-6 w-32 bg-slate-200 rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-(--card-bg) rounded"></div>
              <div className="h-4 w-full bg-slate-100 rounded"></div>
              <div className="h-4 w-3/4 bg-(--card-bg) rounded"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-64 bg-(--card-bg) rounded-3xl border border-(--card-border) p-4 space-y-3"
              >
                <div className="h-32 bg-slate-200 rounded-2xl w-full"></div>
                <div className="h-5 w-3/4 bg-(--card-bg) rounded-lg"></div>
                <div className="h-4 w-1/2 bg-slate-100 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-(--card-bg) rounded-3xl p-6 border border-(--card-border) space-y-4"
            >
              <div className="h-5 w-24 bg-slate-200 rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-(--card-bg) rounded"></div>
                <div className="h-3 w-1/2 bg-slate-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
