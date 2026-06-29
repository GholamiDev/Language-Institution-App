export default function DashboardSkeleton() {
  return (
    <div className="w-full h-auto min-h-screen p-4 mt-25 animate-pulse">
      <div className="justify-self-center flex flex-wrap justify-between items-center md:w-3xl lg:w-5xl mb-10 px-3">
        <div className="h-10 w-48 bg-(--card-bg) rounded-lg"></div>
        <div className="h-12 w-36 bg-white rounded-2xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto px-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-(--card-bg) rounded-2xl h-24 w-full"></div>
        ))}
      </div>

      <div className="flex flex-col justify-self-center gap-4 w-full md:w-3xl lg:w-5xl mb-10">
        <div className="h-4 w-40 bg-white rounded mx-auto mb-3"></div>
        <div className="h-24 bg-(--card-bg) rounded-2xl w-full"></div>{" "}
        <div className="h-40 bg-white rounded-2xl w-full"></div>{" "}
      </div>

      <div className="h-14 bg-white rounded-2xl w-full max-w-5xl mx-auto mb-6"></div>

      <div className="w-full flex justify-center items-center px-3">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-(--card-bg) rounded-2xl h-64 w-full"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
