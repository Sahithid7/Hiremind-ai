export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-signal">{eyebrow}</p>}
        <h1 className="mt-2 text-3xl font-semibold text-ink">{title}</h1>
        {description && <p className="mt-2 max-w-3xl text-sm leading-6 text-graphite">{description}</p>}
      </div>
      {action}
    </div>
  );
}
