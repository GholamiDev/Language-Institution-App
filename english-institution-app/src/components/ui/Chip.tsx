export default function Chip({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="rounded-full bg-background px-3 py-1.5 text-sm text-primary shadow-sm ring-1 ring-(--card-border) hover:bg-gray-50"
    >
      {children} <span className="ms-1 text-secondary">×</span>
    </button>
  );
}
