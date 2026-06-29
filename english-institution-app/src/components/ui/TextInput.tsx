type TextInputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function TextInput({
  label,
  name,
  type = "text",
  placeholder,
  error,
  ...props
}: TextInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-secondary"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        {...props}
        className={`w-full rounded-2xl border bg-(--card-bg) px-4 py-3 text-primary shadow-sm outline-none transition focus:ring-4 ${
          error
            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
            : "border-slate-200 focus:border-third focus:ring-indigo-100"
        }`}
      />

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}
