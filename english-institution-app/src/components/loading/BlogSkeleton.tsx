export default function BlogSkeleton() {
  return (
    <div className="group block overflow-hidden rounded-2xl border border-gray-200 bg-background p-5 animate-pulse">
      <div className="h-48 w-full bg-(--card-bg) rounded-lg mb-4"></div>

      <div className="flex items-center justify-between mb-3">
        <div className="h-6 w-20 bg-gray-200 rounded-md"></div>
        <div className="h-4 w-24 bg-(--card-bg) rounded-md"></div>
      </div>

      <div className="h-7 w-3/4 bg-gray-200 rounded-md mb-4"></div>

      <div className="space-y-2">
        <div className="h-4 w-full bg-(--card-bg) rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-2/3 bg-(--card-bg) rounded"></div>
      </div>

      <div className="mt-4 h-4 w-24 bg-gray-200 rounded-md"></div>
    </div>
  );
}
