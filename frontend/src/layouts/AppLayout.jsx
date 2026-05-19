import {
  BarChart3,
  BriefcaseBusiness,
  FileSearch,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  SearchCheck,
  UploadCloud,
  UserCircle
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import BrandMark from "../components/BrandMark";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/resume-upload", label: "Resume Upload", icon: UploadCloud },
  { to: "/app/resume-analysis", label: "Resume Analysis", icon: FileSearch },
  { to: "/app/job-match", label: "Job Match", icon: SearchCheck },
  { to: "/app/interview-prep", label: "Interview Prep", icon: MessageSquareText },
  { to: "/app/applications", label: "Applications", icon: BriefcaseBusiness },
  { to: "/app/profile", label: "Profile", icon: UserCircle }
];

export default function AppLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-mist">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-line bg-white px-4 py-5 lg:block">
        <BrandMark to="/app" />
        <nav className="mt-8 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition ${
                  isActive ? "bg-ink text-white" : "text-graphite hover:bg-slate-100 hover:text-ink"
                }`
              }
            >
              <Icon size={19} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-5 left-4 right-4 rounded-lg border border-line bg-mist p-4">
          <p className="text-sm font-semibold text-ink">{user?.full_name ?? "HireMind User"}</p>
          <p className="mt-1 text-xs text-graphite">{user?.target_role ?? "Career goal not set"}</p>
          <Button className="mt-4 w-full" variant="outline" onClick={handleLogout}>
            <LogOut size={17} aria-hidden="true" />
            Logout
          </Button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-line bg-white/95 px-4 py-3 backdrop-blur md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 lg:hidden">
              <Button variant="ghost" aria-label="Open navigation" onClick={() => setIsMobileNavOpen((open) => !open)}>
                <Menu size={20} aria-hidden="true" />
              </Button>
              <BrandMark to="/app" compact />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-graphite">Welcome back</p>
              <p className="text-lg font-semibold text-ink">{user?.full_name ?? "Builder"}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden rounded-lg border border-line bg-mist px-3 py-2 text-sm font-medium text-graphite md:block">
                Backend connected
              </div>
              <Button variant="signal" onClick={() => navigate("/app/resume-upload")}>
                <UploadCloud size={17} aria-hidden="true" />
                Upload
              </Button>
            </div>
          </div>
          {isMobileNavOpen && (
            <nav className="mt-3 grid gap-2 border-t border-line pt-3 lg:hidden">
              {navItems.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition ${
                      isActive ? "bg-ink text-white" : "text-graphite hover:bg-slate-100 hover:text-ink"
                    }`
                  }
                >
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </NavLink>
              ))}
              <Button className="justify-start" variant="outline" onClick={handleLogout}>
                <LogOut size={17} aria-hidden="true" />
                Logout
              </Button>
            </nav>
          )}
        </header>

        <main className="px-4 py-8 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
