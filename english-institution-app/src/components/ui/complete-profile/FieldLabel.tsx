export default function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-sm font-semibold text-primary">
      {children} {required ? <span className="text-red-600">*</span> : null}
    </label>
  );
}
