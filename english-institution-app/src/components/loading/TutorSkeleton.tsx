export default function TutorSkeleton() {
  return (
    <div className="bg-background rounded-2xl p-8 shadow-sm border border-slate-100 animate-pulse">
      <div className="flex flex-col justify-self-center items-center justify-center gap-4 mb-4">
        <div className="w-20 h-20 mb-3 rounded-full bg-slate-200 " />
        <div className="flex flex-col justify-center items-center space-y-2">
          <div className="h-4 w-32 bg-slate-200 rounded" />
          <div className="h-3 w-24 bg-(--card-bg) rounded" />
        </div>
      </div>

      <div className="h-px bg-(--card-bg) mb-4" />

      <div className="h-10 bg-slate-100 rounded-xl" />
    </div>
  );
}
