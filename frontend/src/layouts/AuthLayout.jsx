import { Outlet } from "react-router-dom";

import BrandMark from "../components/BrandMark";

export default function AuthLayout() {
  return (
    <main className="grid min-h-screen bg-mist lg:grid-cols-[1fr_1.1fr]">
      <section className="hidden border-r border-line bg-ink p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <BrandMark to="/" inverse />
        <div>
          <p className="max-w-lg text-4xl font-semibold leading-tight">
            Build a sharper job search system with AI feedback, interview prep, and tracking.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {["ATS score", "Job match", "Pipeline"].map((item) => (
              <div key={item} className="rounded-lg border border-white/15 bg-white/10 p-4">
                <p className="text-sm font-semibold text-white">{item}</p>
                <p className="mt-2 text-xs leading-5 text-slate-300">Connected from day one</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-slate-300">Phase 2 frontend connected to the FastAPI auth foundation.</p>
      </section>
      <section className="flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <BrandMark to="/" />
          </div>
          <Outlet />
        </div>
      </section>
    </main>
  );
}
