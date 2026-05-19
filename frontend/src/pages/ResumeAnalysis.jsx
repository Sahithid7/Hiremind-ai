import { CheckCircle2, FileSearch, Loader2, WandSparkles } from "lucide-react";
import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import { usePageTitle } from "../hooks/usePageTitle";
import { fetchResumes } from "../services/resumeService";

export default function ResumeAnalysis() {
  usePageTitle("Resume Analysis");
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const latestResume = resumes[0];

  useEffect(() => {
    let ignore = false;

    async function loadResumes() {
      try {
        const data = await fetchResumes();
        if (!ignore) setResumes(data);
      } catch (apiError) {
        if (!ignore) setError(apiError.response?.data?.detail ?? "Unable to load resumes.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadResumes();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="AI analysis"
        title="Resume analysis"
        description="A focused analysis workspace for ATS scoring, strengths, weaknesses, rewritten bullets, and missing keywords."
      />
      {isLoading && (
        <div className="panel mb-6 flex items-center gap-3 p-5 text-sm font-semibold text-graphite">
          <Loader2 className="animate-spin" size={18} aria-hidden="true" />
          Loading parsed resumes
        </div>
      )}
      {error && <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
      <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
        <section className="panel p-6">
          <FileSearch size={28} className="text-signal" aria-hidden="true" />
          <p className="mt-5 text-sm font-semibold text-graphite">Parsed resumes</p>
          <p className="mt-2 text-6xl font-semibold text-ink">{resumes.length}</p>
          <div className="mt-5 h-3 rounded-full bg-slate-100">
            <div className="h-3 rounded-full bg-signal" style={{ width: resumes.length ? "72%" : "8%" }} />
          </div>
          <p className="mt-4 text-sm leading-6 text-graphite">
            {latestResume ? latestResume.original_filename : "Upload a resume to populate this workspace."}
          </p>
        </section>
        <section className="panel p-6">
          <div className="flex items-center gap-3">
            <WandSparkles className="text-amber" size={24} aria-hidden="true" />
            <h2 className="text-xl font-semibold text-ink">Suggested improvements</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {(latestResume?.extracted_skills?.length
              ? latestResume.extracted_skills.map((skill) => `Detected skill: ${skill}`)
              : [
                  "Upload a PDF or DOCX resume.",
                  "The parser will extract resume text.",
                  "Detected skills will appear here.",
                  "AI scoring arrives in Phase 4."
                ]
            ).map((item) => (
              <div key={item} className="flex gap-3 rounded-lg bg-mist p-4">
                <CheckCircle2 className="mt-0.5 shrink-0 text-mint" size={18} aria-hidden="true" />
                <p className="text-sm leading-6 text-graphite">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      {latestResume && (
        <section className="panel mt-6 p-6">
          <h2 className="text-xl font-semibold text-ink">Parsed text preview</h2>
          <p className="mt-4 max-h-72 overflow-auto rounded-lg bg-mist p-4 text-sm leading-6 text-graphite">
            {latestResume.parsed_text}
          </p>
        </section>
      )}
    </div>
  );
}
