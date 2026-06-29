export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-(--card-border) bg-(--card-bg) shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
