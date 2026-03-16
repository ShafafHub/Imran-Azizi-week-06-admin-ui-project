import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    setOpen(false);
    await dispatch(logoutUser());
    navigate("/login");
  };

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/profile", label: "Profile" },
  ];

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AD";

  return (
    <header
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-canvas-200"
      style={{ boxShadow: "0 1px 0 rgba(26,24,20,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center justify-between h-15"
          style={{ height: "60px" }}
        >
          {/* Logo */}
          <NavLink to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm group-hover:bg-indigo-700 transition-colors duration-150">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect
                  x="2"
                  y="2"
                  width="5"
                  height="5"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.9"
                />
                <rect
                  x="9"
                  y="2"
                  width="5"
                  height="5"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.5"
                />
                <rect
                  x="2"
                  y="9"
                  width="5"
                  height="5"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.5"
                />
                <rect
                  x="9"
                  y="9"
                  width="5"
                  height="5"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.9"
                />
              </svg>
            </div>
            <span className="font-display font-bold text-ink-900 text-[15px] tracking-tight hidden sm:block">
              Admin Authentication
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-display font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-ink-600 hover:text-ink-900 hover:bg-canvas-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Avatar dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-canvas-200 hover:border-canvas-300 bg-white hover:bg-canvas-50 transition-all duration-150 group"
              >
                <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-700 text-xs font-display font-bold">
                    {initials}
                  </span>
                </div>
                <span className="text-ink-700 text-sm font-display font-medium hidden sm:block max-w-[100px] truncate">
                  {user?.name?.split(" ")[0] || "Admin"}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-ink-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {open && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl border border-canvas-200 shadow-card-md overflow-hidden animate-slide-down z-50">
                    {/* Links */}
                    <div className="py-1.5">
                      {links.map((link) => (
                        <NavLink
                          key={link.to}
                          to={link.to}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 text-sm font-display transition-colors duration-100 ${
                              isActive
                                ? "text-indigo-700 bg-indigo-50"
                                : "text-ink-700 hover:bg-canvas-50"
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>
                      ))}
                      <div className="mx-3 my-1.5 h-px bg-canvas-200" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-display text-rose-600 hover:bg-rose-50 transition-colors duration-100"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.75}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden border-t border-canvas-200 flex">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex-1 flex items-center justify-center py-2.5 text-xs font-display font-semibold tracking-wide transition-colors duration-150 ${
                isActive ? "text-indigo-600 bg-indigo-50" : "text-ink-500"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
