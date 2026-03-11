import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/auth/authSlice.js";
import Navbar from "../components/Navbar.jsx";

const StatCard = ({
  icon,
  label,
  value,
  sub,
  accent = "indigo",
  delay = "",
}) => {
  const map = {
    indigo: {
      ring: "bg-indigo-50 border-indigo-100",
      icon: "text-indigo-600",
      bar: "bg-indigo-500",
    },
    sage: {
      ring: "bg-sage-50   border-sage-100",
      icon: "text-sage-600",
      bar: "bg-sage-500",
    },
    amber: {
      ring: "bg-amber-50  border-amber-100",
      icon: "text-amber-600",
      bar: "bg-amber-500",
    },
  };
  const a = map[accent];

  return (
    <div className={`stat-card opacity-0-init animate-fade-up ${delay}`}>
      <div
        className={`w-10 h-10 rounded-xl border ${a.ring} flex items-center justify-center mb-4`}
      >
        <span className={`${a.icon} text-lg`}>{icon}</span>
      </div>
      <p className="text-2xl font-display font-bold text-ink-900 tracking-tight leading-none">
        {value}
      </p>
      <p className="text-sm font-display font-semibold text-ink-600 mt-2">
        {label}
      </p>
      {sub && <p className="text-xs text-ink-400 font-body mt-0.5">{sub}</p>}
      <div className={`mt-4 h-0.5 w-full rounded-full bg-canvas-200`}>
        <div className={`h-0.5 rounded-full ${a.bar} w-3/4`} />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((s) => s.auth);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "—";

  const accountId = user?._id ? user._id.slice(-8).toUpperCase() : "—";

  const activities = [
    { label: "Login successful", type: "success" },
    { label: "JWT token issued", type: "success" },
    { label: "Profile fetched", type: "info" },
    { label: "Dashboard loaded", type: "info" },
    { label: "Session started", type: "success" },
  ];

  return (
    <div className="min-h-screen bg-canvas-50">
      <Navbar />
      <div className="dot-grid min-h-screen">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome banner */}
          <div className="surface rounded-2xl p-6 mb-8 animate-fade-up relative overflow-hidden">
            {/* Subtle stripe accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-indigo-500" />
            <div className="pl-4">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <p className="text-indigo-600 text-xs font-mono tracking-widest uppercase mb-1">
                    {greeting}
                  </p>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink-900 tracking-tight">
                    {isLoading ? (
                      <span className="text-ink-300 animate-pulse">
                        Loading…
                      </span>
                    ) : (
                      user?.name || "Administrator"
                    )}
                  </h1>
                  <p className="text-ink-500 text-sm font-body mt-1">
                    {user?.email}
                  </p>
                </div>
            </div>
          </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <StatCard
              icon="◈"
              label="Account ID"
              value={accountId}
              sub="Unique identifier"
              accent="indigo"
              delay="delay-100"
            />
            <StatCard
              icon="⬡"
              label="Status"
              value="Active"
              sub="Account in good standing"
              accent="sage"
              delay="delay-200"
            />
            <StatCard
              icon="◎"
              label="Member Since"
              value={memberSince}
              sub="Account created"
              accent="amber"
              delay="delay-300"
            />
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activity log */}
            <div className="lg:col-span-2 surface rounded-2xl p-6 animate-fade-up delay-400">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-base font-display font-bold text-ink-900">
                    Recent Activity
                  </h2>
                  <p className="text-xs text-ink-400 font-body mt-0.5">
                    Current session log
                  </p>
                </div>
                <span className="badge badge-sage">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse-soft" />
                  live
                </span>
              </div>
              <div className="divide-y divide-canvas-100">
                {activities.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          item.type === "success"
                            ? "bg-sage-400"
                            : "bg-indigo-400"
                        }`}
                      />
                      <span className="text-sm text-ink-700 font-body">
                        {item.label}
                      </span>
                    </div>
                    <span
                      className={`badge ${item.type === "success" ? "badge-sage" : "badge-indigo"}`}
                    >
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* System info */}
            <div className="surface rounded-2xl p-6 animate-fade-up delay-500">
              <h2 className="text-base font-display font-bold text-ink-900 mb-5">
                Stack Info
              </h2>
              <div className="space-y-3">
                {[
                  { k: "Auth", v: "JWT Bearer" },
                  { k: "Storage", v: "localStorage" },
                  { k: "API", v: "Express ESM" },
                  { k: "DB", v: "MongoDB" },
                  { k: "Frontend", v: "React + Vite" },
                  { k: "Style", v: "Tailwind CSS" },
                ].map(({ k, v }) => (
                  <div key={k} className="flex items-center justify-between">
                    <span className="text-xs text-ink-500 font-mono uppercase tracking-wider">
                      {k}
                    </span>
                    <span className="badge badge-indigo">{v}</span>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="mt-6 pt-5 border-t border-canvas-200 space-y-2">
                <p className="text-xs font-display font-bold text-ink-400 uppercase tracking-widest mb-3">
                  Quick Links
                </p>
                <a
                  href="http://localhost:5000/api/health"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg bg-canvas-50 hover:bg-indigo-50 border border-canvas-200 hover:border-indigo-200 transition-all duration-150 group"
                >
                  <span className="text-sm font-display font-medium text-ink-700 group-hover:text-indigo-700">
                    API Health
                  </span>
                  <svg
                    className="w-3.5 h-3.5 text-ink-400 group-hover:text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
