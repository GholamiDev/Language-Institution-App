export default function EditTextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-(--card-border) bg-(--card-bg) px-4 py-3 text-sm text-primary outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 ${props.className || ""}`}
    />
  );
}
