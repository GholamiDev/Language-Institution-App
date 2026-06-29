export const TutorEditSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 mt-24 animate-pulse">
      <div className="mb-8">
        <div className="h-4 w-24 bg-(--card-bg) rounded-full"></div>
        <div className="h-9 w-48 bg-gray-300 rounded-lg mt-3"></div>
        <div className="h-4 w-72 bg-(--card-bg) rounded-full mt-3"></div>
      </div>

      <div className="bg-(--card-bg) p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="h-2 w-full bg-gray-100 rounded-full mb-8"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-20 bg-(--card-bg) rounded"></div>
              <div className="h-12 w-full bg-gray-100 rounded-2xl"></div>
            </div>
          ))}

          <div className="sm:col-span-2 space-y-2">
            <div className="h-4 w-32 bg-(--card-bg) rounded"></div>
            <div className="h-32 w-full bg-gray-100 rounded-2xl"></div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <div className="h-11 w-24 bg-(--card-bg) rounded-2xl"></div>
          <div className="h-11 w-24 bg-(--card-bg) rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};
