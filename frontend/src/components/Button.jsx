const variants = {
  primary: "bg-ink text-white hover:bg-slate-800",
  signal: "bg-signal text-white hover:bg-blue-700",
  ghost: "bg-transparent text-graphite hover:bg-slate-100",
  outline: "border border-line bg-white text-ink hover:bg-slate-50"
};

export default function Button({
  as: Component = "button",
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  return (
    <Component
      className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
