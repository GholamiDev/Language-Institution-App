export const RegisterSkeleton = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10 animate-pulse">
      <div className="w-full max-w-md rounded-2xl border border-(--card-bg) bg-background p-8 shadow-sm">
        <div className="space-y-2 text-center mb-6">
          <div className="h-8 w-40 bg-(--card-bg) rounded-lg mx-auto"></div>
          <div className="h-4 w-56 bg-(--card-bg) rounded-full mx-auto"></div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="h-11 rounded-2xl bg-(--card-bg)"></div>
          <div className="h-11 rounded-2xl bg-(--card-bg)"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-16 bg-(--card-bg) rounded"></div>
              <div className="h-12 w-full bg-(--card-bg) rounded-2xl"></div>
            </div>
          ))}
        </div>

        <div className="space-y-2 mb-5">
          <div className="h-4 w-16 bg-(--card-bg) rounded"></div>
          <div className="h-12 w-full bg-(--card-bg) rounded-2xl"></div>
        </div>

        <div className="space-y-2 mb-5">
          <div className="h-4 w-20 bg-(--card-bg) rounded"></div>
          <div className="h-12 w-full bg-(--card-bg) rounded-2xl"></div>
        </div>

        <div className="h-12 w-full rounded-2xl bg-(--card-bg) mb-5"></div>

        <div className="h-12 w-full rounded-2xl bg-(--card-bg) mb-5"></div>

        <div className="h-4 w-44 bg-(--card-bg) rounded-full mx-auto"></div>
      </div>
    </div>
  );
};
