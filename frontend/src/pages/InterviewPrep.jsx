import { MessageSquareText, Star } from "lucide-react";

import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import { usePageTitle } from "../hooks/usePageTitle";

const questions = [
  "Explain how you would design a rate-limited resume analysis API.",
  "Tell me about a time you debugged a difficult production-style issue.",
  "How do JWT access tokens and password hashing work together in authentication?"
];

export default function InterviewPrep() {
  usePageTitle("Interview Prep");

  return (
    <div>
      <PageHeader
        eyebrow="Interview prep"
        title="Role-specific practice"
        description="Generate technical and behavioral interview sets from resume context and target roles."
        action={
          <Button variant="signal">
            <MessageSquareText size={18} aria-hidden="true" />
            Generate set
          </Button>
        }
      />
      <section className="grid gap-4">
        {questions.map((question) => (
          <article key={question} className="panel flex items-start justify-between gap-4 p-5">
            <div>
              <p className="text-sm font-semibold text-signal">Backend Engineer</p>
              <h2 className="mt-2 text-lg font-semibold text-ink">{question}</h2>
              <p className="mt-3 text-sm leading-6 text-graphite">
                Suggested answers will be saved with tags and favorites in the interview history table.
              </p>
            </div>
            <button className="focus-ring rounded-lg p-2 text-amber hover:bg-amber-50" aria-label="Favorite question">
              <Star size={20} aria-hidden="true" />
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
