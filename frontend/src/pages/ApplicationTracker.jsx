import { BriefcaseBusiness, Plus } from "lucide-react";

import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import { usePageTitle } from "../hooks/usePageTitle";

const jobs = [
  ["Stripe", "Backend Engineer Intern", "Applied"],
  ["Datadog", "Software Engineer", "OA"],
  ["Capital One", "Cloud Engineer", "Interview"]
];

export default function ApplicationTracker() {
  usePageTitle("Applications");

  return (
    <div>
      <PageHeader
        eyebrow="Pipeline"
        title="Application tracker"
        description="Track applied jobs, statuses, interview rounds, notes, and next steps."
        action={
          <Button variant="signal">
            <Plus size={18} aria-hidden="true" />
            Add job
          </Button>
        }
      />
      <section className="panel overflow-hidden">
        <div className="grid grid-cols-[1.1fr_1fr_0.7fr] border-b border-line bg-white px-5 py-3 text-sm font-semibold text-graphite">
          <span>Company</span>
          <span>Role</span>
          <span>Status</span>
        </div>
        {jobs.map(([company, role, status]) => (
          <div key={`${company}-${role}`} className="grid grid-cols-[1.1fr_1fr_0.7fr] items-center border-b border-line px-5 py-4 last:border-b-0">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mist text-signal">
                <BriefcaseBusiness size={18} aria-hidden="true" />
              </span>
              <span className="font-semibold text-ink">{company}</span>
            </div>
            <span className="text-sm text-graphite">{role}</span>
            <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-signal">{status}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
