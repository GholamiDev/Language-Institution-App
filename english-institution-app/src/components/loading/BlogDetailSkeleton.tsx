export const BlogDetailSkeleton = () => {
  return (
    <main className=" min-h-screen py-10 px-4 md:px-0 mt-15 animate-pulse">
      <article className="max-w-3xl mx-auto bg-(--card-bg) p-8 md:p-12 rounded-2xl shadow-sm border border-(--card-bg)">
        <header className="mb-8">
          <div className="h-6 w-24 bg-blue-100 rounded-full mb-6"></div>
          <div className="h-10 md:h-12 w-3/4 bg-(--card-bg) rounded-lg mb-4"></div>
          <div className="h-10 md:h-12 w-1/2 bg-blue-100 rounded-lg mb-8"></div>

          <div className="flex gap-6">
            <div className="h-4 w-32 bg-(--card-bg) rounded"></div>
            <div className="h-4 w-32 bg-blue-100 rounded"></div>
          </div>
        </header>

        <div className="w-full h-64 md:h-96 bg-(--card-bg) rounded-xl mb-10"></div>

        <div className="space-y-4">
          <div className="h-4 w-full bg-blue-100 rounded"></div>
          <div className="h-4 w-full bg-(--card-bg) rounded"></div>
          <div className="h-4 w-4/5 bg-blue-100 rounded"></div>
          <div className="h-4 w-full bg-(--card-bg) rounded"></div>
        </div>

        <div className="mt-16 pt-8 border-t border-blue-100">
          <div className="h-6 w-40 bg-(--card-bg) rounded mb-4"></div>
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg"></div>
            <div className="w-12 h-12 bg-(--card-bg) rounded-lg"></div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg"></div>
          </div>
        </div>
      </article>
    </main>
  );
};
