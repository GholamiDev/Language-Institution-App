export default function CourseDetailSkeleton() {
  return (
    <div className="min-h-screen pb-20 animate-pulse">
      <div className="relative w-full h-100 bg-(--card-bg)" />

      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-background p-8 rounded-3xl h-48 border border-(--card-border) shadow-sm" />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-background p-6 rounded-2xl h-40 border border-(--card-border) shadow-sm" />
              <div className="bg-background p-6 rounded-2xl h-40 border border-(--card-border) shadow-sm" />
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-background p-6 rounded-3xl shadow-xl border border-(--card-border) h-80 space-y-6">
              <div className="h-6 w-1/3 bg-(--card-bg) rounded" />
              <div className="h-10 w-2/3 bg-(--card-bg) rounded" />
              <div className="h-14 w-full bg-(--card-bg) rounded-xl" />
              <div className="space-y-3 pt-4 border-t border-(--card-border)">
                <div className="h-4 w-full bg-(--card-border) rounded" />
                <div className="h-4 w-3/4 bg-(--card-border) rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
