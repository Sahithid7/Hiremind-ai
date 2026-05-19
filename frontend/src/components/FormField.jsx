export default function FormField({ label, id, error, className = "", ...props }) {
  return (
    <label className={`block ${className}`} htmlFor={id}>
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      <input
        id={id}
        className="focus-ring w-full rounded-lg border border-line bg-white px-3 py-3 text-sm text-ink shadow-sm transition placeholder:text-slate-400"
        {...props}
      />
      {error && <span className="mt-2 block text-sm font-medium text-red-600">{error}</span>}
    </label>
  );
}
