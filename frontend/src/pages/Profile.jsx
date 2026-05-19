import { UserCircle } from "lucide-react";

import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Profile() {
  usePageTitle("Profile");
  const { user } = useAuth();

  return (
    <div>
      <PageHeader
        eyebrow="Settings"
        title="Profile"
        description="Manage account identity, target roles, resume preferences, and future personalization settings."
      />
      <section className="panel p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-ink text-white">
            <UserCircle size={30} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold text-ink">{user?.full_name ?? "HireMind User"}</h2>
            <p className="mt-1 text-sm text-graphite">{user?.email}</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg bg-mist p-4">
                <p className="text-xs font-semibold uppercase text-graphite">Target role</p>
                <p className="mt-2 font-semibold text-ink">{user?.target_role ?? "Not set"}</p>
              </div>
              <div className="rounded-lg bg-mist p-4">
                <p className="text-xs font-semibold uppercase text-graphite">Location</p>
                <p className="mt-2 font-semibold text-ink">{user?.location ?? "Not set"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
