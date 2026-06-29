export default function Notice({
  children,
  tone = "info",
}: {
  children: React.ReactNode;
  tone?: "info" | "success" | "error";
}) {
  const styles =
    tone === "success"
      ? "border-green-100 bg-(--card-bg) text-green-700"
      : tone === "error"
        ? "border-red-100 bg-red-50 text-red-700"
        : "border-blue-100 bg-blue-50 text-blue-700";

  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm ${styles}`}>
      {children}
    </div>
  );
}
