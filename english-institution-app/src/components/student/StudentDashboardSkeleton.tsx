export default function StudentDashboardSkeleton() {
  return (
    <div className="max-w-5xl lg:mx-auto mx-10 mt-10 animate-pulse">
      <div className="h-8 w-40 bg-gray-200 rounded mb-6"></div>

      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="border border-gray-300 rounded-lg p-4 shadow"
          >
            <div className="h-6 w-20 bg-gray-200 rounded-full mb-3"></div>

            <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>

            <div className="h-5 w-3/4 bg-gray-200 rounded mb-4"></div>

            <div className="h-10 w-full bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
