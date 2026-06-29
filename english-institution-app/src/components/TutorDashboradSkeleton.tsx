export default function TutorDashboardSkeleton() {
  return (
    <div className="p-8 flex flex-col xl:w-7xl lg:w-4xl md:w-3xl w-auto self-center animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-40 bg-gray-200 rounded"></div>
        <div className="h-10 w-32 bg-gray-200 rounded"></div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border border-gray-300">عنوان دوره</th>
            <th className="p-3 border border-gray-300">وضعیت</th>
            <th className="p-3 border border-gray-300">تاریخ ثبت</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((i) => (
            <tr key={i}>
              <td className="p-4 border border-gray-300">
                <div className="h-4 w-3/4 bg-gray-200 rounded mx-auto"></div>
              </td>
              <td className="p-4 border border-gray-300">
                <div className="h-6 w-20 bg-gray-200 rounded-full mx-auto"></div>
              </td>
              <td className="p-4 border border-gray-300">
                <div className="h-4 w-24 bg-gray-200 rounded mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
