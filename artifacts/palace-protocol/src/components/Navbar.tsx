import { Link, useLocation } from "wouter";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import logo from "@assets/WhatsApp_Image_2026-07-06_at_08.25.23_1783335090917.jpeg";

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  const navLinkClass = "text-parchment text-sm font-medium py-1.5 border-b border-transparent hover:text-[#C9A860] hover:border-[#A67C3D] transition-colors";

  return (
    <nav className="sticky top-0 z-50 bg-ink border-b border-line">
      <div className="max-w-wrap flex items-center justify-between h-[76px]">
        <Link href="/" className="flex items-center gap-3">
          <img src={logo} alt="Palace Protocol" className="h-10 w-10 rounded-full object-cover" />
          <div className="text-bone font-serif text-[21px] font-semibold tracking-[0.3px] leading-tight">
            Palace Protocol
            <span className="block font-mono text-[9px] tracking-[2px] text-[#C9A860] font-medium mt-[2px]">
              ACADEMY EST. 2026
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-9">
          <Link href="/" className={navLinkClass}>Home</Link>
          <Link href="/about" className={navLinkClass}>About</Link>
          <Link href="/books" className={navLinkClass}>Books</Link>
          <Link href="/contact" className={navLinkClass}>Contact</Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="w-9 h-9 flex items-center justify-center text-[#C9A860] hover:text-[#F7F3E8] border border-transparent hover:border-[#A67C3D] rounded-sm transition-colors"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href={user.role === "admin" ? "/admin" : "/member"}
                className="text-[#C9A860] font-mono text-[11px] tracking-[1px] uppercase hover:underline"
              >
                {user.role === "admin" ? "Dashboard" : user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium cursor-pointer border border-primary text-[#C9A860] bg-transparent hover:bg-[#a67c3d1f] transition-colors rounded-sm"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-sm cursor-pointer border border-primary text-[#C9A860] bg-transparent hover:bg-[#a67c3d1f] transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
