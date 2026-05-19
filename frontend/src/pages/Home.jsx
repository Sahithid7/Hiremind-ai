import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  FileSearch,
  MessageSquareText,
  Radar,
  Route,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

import BrandMark from "../components/BrandMark";
import Button from "../components/Button";
import { usePageTitle } from "../hooks/usePageTitle";

const features = [
  {
    icon: FileSearch,
    title: "Resume intelligence",
    text: "Analyze ATS readiness, weak bullets, missing keywords, and technical alignment."
  },
  {
    icon: Radar,
    title: "Job match scoring",
    text: "Compare your resume against job descriptions and see what to strengthen before applying."
  },
  {
    icon: MessageSquareText,
    title: "Interview preparation",
    text: "Generate role-specific technical and behavioral questions from your target role."
  },
  {
    icon: BriefcaseBusiness,
    title: "Application tracking",
    text: "Keep statuses, notes, interviews, and outcomes organized in one focused workspace."
  }
];

const workflow = ["Upload resume", "Paste job description", "Review AI analysis", "Track progress"];

export default function Home() {
  usePageTitle();

  return (
    <div className="bg-mist text-ink">
      <header className="border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <BrandMark />
          <nav className="hidden items-center gap-7 text-sm font-semibold text-graphite md:flex">
            <a href="#features" className="hover:text-ink">Features</a>
            <a href="#workflow" className="hover:text-ink">Workflow</a>
            <a href="#pricing" className="hover:text-ink">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button as={Link} to="/login" variant="ghost">Login</Button>
            <Button as={Link} to="/signup" variant="signal">
              Start Free
              <ArrowRight size={17} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-line bg-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-mist px-3 py-2 text-sm font-semibold text-graphite">
                <Sparkles size={16} className="text-amber" aria-hidden="true" />
                AI career operating system
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight text-ink md:text-6xl">
                HireMind AI
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-graphite">
                A modern job search workspace that helps students and early-career professionals improve resumes,
                prepare for interviews, optimize applications, and stay accountable.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button as={Link} to="/signup" variant="signal" className="sm:w-auto">
                  Get Started
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
                <Button as={Link} to="/login" variant="outline" className="sm:w-auto">
                  Analyze Resume
                </Button>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {["ATS feedback", "Job fit score", "Interview practice"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-semibold text-graphite">
                    <CheckCircle2 size={18} className="text-mint" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="panel overflow-hidden">
              <div className="border-b border-line bg-ink px-5 py-4 text-white">
                <p className="text-sm font-semibold">Career readiness snapshot</p>
              </div>
              <div className="space-y-5 p-5">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    ["ATS", "86"],
                    ["Match", "74"],
                    ["Apps", "18"]
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-lg bg-mist p-4">
                      <p className="text-xs font-semibold uppercase text-graphite">{label}</p>
                      <p className="mt-2 text-3xl font-semibold text-ink">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-line p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink">Keyword alignment</p>
                    <p className="text-sm font-semibold text-mint">+18%</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      ["Python", "92%"],
                      ["AWS", "68%"],
                      ["Docker", "54%"]
                    ].map(([label, width]) => (
                      <div key={label}>
                        <div className="mb-1 flex justify-between text-xs font-medium text-graphite">
                          <span>{label}</span>
                          <span>{width}</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100">
                          <div className="h-2 rounded-full bg-signal" style={{ width }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-sm font-semibold text-ink">Next best action</p>
                  <p className="mt-1 text-sm leading-6 text-graphite">
                    Add measurable impact to two backend project bullets and mention deployment ownership.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase text-signal">Product</p>
              <h2 className="mt-2 text-3xl font-semibold text-ink">Everything needed for a serious search</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map(({ icon: Icon, title, text }) => (
              <article key={title} className="panel p-5">
                <Icon size={24} className="text-signal" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="border-y border-line bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase text-signal">Workflow</p>
                <h2 className="mt-2 text-3xl font-semibold text-ink">From raw resume to focused execution</h2>
                <p className="mt-4 text-sm leading-6 text-graphite">
                  HireMind turns scattered career tasks into a repeatable operating system for applications,
                  interviews, and skill growth.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-4">
                {workflow.map((item, index) => (
                  <div key={item} className="rounded-lg border border-line bg-mist p-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <p className="mt-4 text-sm font-semibold text-ink">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-5 py-16">
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              ["Starter", "$0", "Resume upload, auth workspace, basic tracking"],
              ["Career Pro", "$12", "AI analysis, job matching, interview practice"],
              ["Launch", "$29", "Advanced analytics, roadmap, priority features"]
            ].map(([name, price, description]) => (
              <article key={name} className="panel p-6">
                <h3 className="text-xl font-semibold text-ink">{name}</h3>
                <p className="mt-4 text-4xl font-semibold text-ink">{price}</p>
                <p className="mt-3 text-sm leading-6 text-graphite">{description}</p>
                <Button as={Link} to="/signup" className="mt-6 w-full" variant={name === "Career Pro" ? "signal" : "outline"}>
                  Start Free
                </Button>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-ink px-5 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} aria-hidden="true" />
            <p className="text-sm font-medium text-slate-300">Built for production-style career workflows.</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            <BarChart3 size={17} aria-hidden="true" />
            <Route size={17} aria-hidden="true" />
            <span>Resume. Interview. Apply.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
