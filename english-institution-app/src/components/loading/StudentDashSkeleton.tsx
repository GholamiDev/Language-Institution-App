export default function StudentDashSkeleton() {
  return (
    <main className="min-h-screen px-4 py-10 mt-24">
      <div className="mx-auto max-w-6xl space-y-8 animate-pulse">
        <div className="rounded-3xl bg-background p-8 shadow-xl">
          <div className="h-8 w-64 rounded bg-(--card-bg)" />
          <div className="mt-4 h-4 w-96 rounded bg-slate-200" />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl bg-(--card-bg) p-6 shadow">
              <div className="h-4 w-24 rounded bg-slate-200" />
              <div className="mt-4 h-8 w-16 rounded bg-(--card-bg)" />
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-(--card-bg) p-6 shadow">
          <div className="h-6 w-40 rounded bg-slate-200" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-(--card-border) p-5"
              >
                <div className="h-5 w-3/4 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-1/2 rounded bg-(--card-bg)" />
                <div className="mt-4 h-2 w-full rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
