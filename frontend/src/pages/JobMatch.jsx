import { SearchCheck } from "lucide-react";

import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import { usePageTitle } from "../hooks/usePageTitle";

export default function JobMatch() {
  usePageTitle("Job Match");

  return (
    <div>
      <PageHeader
        eyebrow="Job intelligence"
        title="Match resume to job description"
        description="Paste a job description to compare target skills, missing keywords, and resume alignment."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <section className="panel p-6">
          <label htmlFor="job-description" className="text-sm font-semibold text-ink">
            Job description
          </label>
          <textarea
            id="job-description"
            className="focus-ring mt-3 min-h-80 w-full rounded-lg border border-line p-4 text-sm leading-6 text-ink"
            placeholder="Paste the target job description here..."
          />
          <Button className="mt-4" variant="signal">
            <SearchCheck size={18} aria-hidden="true" />
            Calculate match
          </Button>
        </section>
        <section className="panel p-6">
          <p className="text-sm font-semibold text-graphite">Preview match</p>
          <p className="mt-3 text-6xl font-semibold text-ink">74%</p>
          <div className="mt-5 space-y-3">
            {["AWS", "Docker", "System design"].map((skill) => (
              <div key={skill} className="rounded-lg bg-mist p-4 text-sm font-semibold text-graphite">
                Missing: {skill}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
