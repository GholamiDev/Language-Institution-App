export default function CourseSkeleton() {
  return (
    <div className="animate-pulse bg-(--card-bg) border border-(--card-border) rounded-2xl p-5 shadow-sm">
      <div className="h-44 w-full bg-(--card-bg) rounded-xl mb-5"></div>

      <div className="space-y-3">
        <div className="h-6 w-3/4 bg-slate-200 rounded-lg"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-(--card-bg)rounded-lg"></div>
          <div className="h-4 w-2/3 bg-slate-200 rounded-lg"></div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="h-8 w-20 bg-(--card-bg)rounded-lg"></div>
        <div className="h-8 w-24 bg-slate-200 rounded-lg"></div>
      </div>
    </div>
  );
}
