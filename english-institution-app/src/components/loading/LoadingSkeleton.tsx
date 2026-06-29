export default function LoadingSkeleton() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 w-32 bg-gray-100 rounded"></div>
    </div>
  );
}
