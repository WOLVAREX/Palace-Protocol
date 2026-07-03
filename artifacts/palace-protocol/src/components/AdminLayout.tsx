import { Link, useLocation } from "wouter";
import { SealLogo } from "./SealLogo";
import { useAuth } from "../context/AuthContext";
import {
  Menu, X, LayoutDashboard, BookOpen, Calendar, Users,
  Settings, Inbox, LogOut, FileText, Shield, Pencil, ExternalLink
} from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/enrollments", label: "Enrollments", icon: Inbox },
  { href: "/admin/sessions", label: "Sessions", icon: Calendar },
  { href: "/admin/members", label: "Members", icon: Users },
  { href: "/admin/books", label: "Library", icon: BookOpen },
  { href: "/admin/content", label: "Site Content", icon: Pencil },
  { href: "/admin/terms", label: "Terms", icon: FileText },
  { href: "/admin/policies", label: "Policies", icon: Shield },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? location === "/admin" : location.startsWith(href);

  return (
    <div className="min-h-screen bg-parchment flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-ink text-bone p-4 flex justify-between items-center border-b border-line">
        <div className="flex items-center gap-3">
          <SealLogo size={32} color="brass" />
          <span className="font-serif text-lg">Palace Protocol</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#A67C3D]" data-testid="button-mobile-menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${isMobileMenuOpen ? "flex" : "hidden"} md:flex flex-col w-full md:w-60 bg-ink text-bone border-r border-line md:min-h-screen shrink-0`}>
        <div className="p-5 hidden md:flex items-center gap-3 border-b border-line">
          <SealLogo size={36} color="brass" />
          <div className="font-serif text-lg leading-tight">
            Palace Protocol
            <br />
            <span className="font-mono text-[9px] text-[#C9A860] uppercase tracking-widest">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 py-4 flex flex-col gap-0.5 px-2 overflow-y-auto">
          {links.map(link => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`nav-${link.href.replace(/\//g, "-")}`}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors border-l-2
                  ${active
                    ? "bg-[#1C2B3C] text-[#C9A860] border-[#A67C3D]"
                    : "text-parchment/80 hover:text-parchment hover:bg-[#1C2B3C] border-transparent"}`}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-line space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-parchment/60 hover:text-parchment hover:bg-[#1C2B3C] transition-colors w-full"
          >
            <ExternalLink size={16} />
            View Public Site
          </a>
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-parchment/60 hover:text-parchment hover:bg-[#1C2B3C] w-full text-left transition-colors"
            data-testid="button-logout"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 max-w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
