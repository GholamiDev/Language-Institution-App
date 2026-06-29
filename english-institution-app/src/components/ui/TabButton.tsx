export default function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-2xl px-4 py-2 text-sm font-semibold transition",
        active
          ? "bg-third text-white"
          : "bg-gray-50 text-gray-600 hover:bg-gray-100",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
