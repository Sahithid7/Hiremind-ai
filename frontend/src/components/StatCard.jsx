export default function StatCard({ icon: Icon, label, value, change, tone = "signal" }) {
  const tones = {
    signal: "bg-blue-50 text-signal",
    mint: "bg-emerald-50 text-mint",
    coral: "bg-orange-50 text-coral",
    amber: "bg-amber-50 text-amber"
  };

  return (
    <section className="metric-tile">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-graphite">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-ink">{value}</p>
        </div>
        {Icon && (
          <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${tones[tone]}`}>
            <Icon size={22} aria-hidden="true" />
          </span>
        )}
      </div>
      {change && <p className="mt-4 text-sm font-medium text-mint">{change}</p>}
    </section>
  );
}
