import {
  BarChart3,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  FileSearch,
  MessageSquareText,
  TrendingUp
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { useAuth } from "../context/AuthContext";
import { usePageTitle } from "../hooks/usePageTitle";

const activity = [
  "Resume foundation created",
  "Auth session connected",
  "Dashboard shell ready",
  "Application tracker queued"
];

export default function Dashboard() {
  usePageTitle("Dashboard");
  const { user } = useAuth();

  return (
    <div>
      <PageHeader
        eyebrow="Dashboard"
        title={`Career cockpit${user?.full_name ? ` for ${user.full_name.split(" ")[0]}` : ""}`}
        description="Monitor resume readiness, application momentum, interview preparation, and AI recommendations from one workspace."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={FileSearch} label="Resume score" value="82" change="+12 from baseline" tone="signal" />
        <StatCard icon={BriefcaseBusiness} label="Applications" value="18" change="5 active interviews" tone="mint" />
        <StatCard icon={MessageSquareText} label="Prep questions" value="36" change="Role-specific set" tone="coral" />
        <StatCard icon={TrendingUp} label="Search momentum" value="74%" change="On track this week" tone="amber" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="panel p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-ink">Application pipeline</h2>
              <p className="mt-1 text-sm text-graphite">A preview of the analytics view planned for Phase 6.</p>
            </div>
            <BarChart3 className="text-signal" size={24} aria-hidden="true" />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {[
              ["Applied", 8, "70%"],
              ["OA", 3, "42%"],
              ["Interview", 5, "58%"],
              ["Rejected", 2, "28%"],
              ["Offer", 0, "8%"]
            ].map(([label, count, height]) => (
              <div key={label} className="flex min-h-56 flex-col justify-end rounded-lg bg-mist p-4">
                <div className="rounded-t-lg bg-signal" style={{ height }} />
                <p className="mt-4 text-2xl font-semibold text-ink">{count}</p>
                <p className="text-sm font-medium text-graphite">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ink">AI recommendations</h2>
            <CalendarClock className="text-mint" size={24} aria-hidden="true" />
          </div>
          <div className="mt-6 space-y-4">
            {[
              "Add measurable impact to your latest backend project.",
              "Mention Docker and API testing in technical bullets.",
              "Prepare STAR stories for ownership and conflict."
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-line p-4">
                <CheckCircle2 className="mt-0.5 shrink-0 text-mint" size={19} aria-hidden="true" />
                <p className="text-sm leading-6 text-graphite">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel mt-6 p-6">
        <h2 className="text-xl font-semibold text-ink">Recent activity</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {activity.map((item) => (
            <div key={item} className="rounded-lg bg-mist p-4 text-sm font-semibold text-graphite">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
