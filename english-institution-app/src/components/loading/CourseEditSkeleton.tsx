export default function CourseEditSkeleton() {
  return (
    <div className="min-h-[80vh] p-4 md:p-10 w-full lg:w-5xl mx-auto animate-pulse">
      <div className="flex lg:w-3xl mx-auto items-center mb-10 mt-20 gap-4">
        <div className="w-10 h-10 bg-(--card-bg) rounded-full" />
        <div>
          <div className="h-8 w-40 bg-(--card-bg) rounded-lg mb-2" />
          <div className="h-4 w-60 bg-gray-100 rounded-lg" />
        </div>
      </div>

      <div className="bg-background lg:w-3xl mx-auto border border-gray-100 shadow-xl rounded-3xl p-8 space-y-7">
        <div>
          <div className="h-4 w-24 bg-(--card-bg) rounded mb-2" />
          <div className="h-12 w-full bg-gray-100 rounded-xl" />
        </div>

        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="h-4 w-32 bg-(--card-bg) rounded mb-2" />
            <div className="h-24 w-full bg-gray-100 rounded-xl" />
          </div>
        ))}

        <div className="grid md:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-4 w-20 bg-(--card-bg) rounded mb-2" />
              <div className="h-12 w-full bg-gray-100 rounded-xl" />
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-4 w-20 bg-(--card-bg) rounded mb-2" />
              <div className="h-12 w-full bg-gray-100 rounded-xl" />
            </div>
          ))}
        </div>

        <div className="h-14 w-full bg-(--card-bg) rounded-xl mt-8" />
      </div>
    </div>
  );
}
