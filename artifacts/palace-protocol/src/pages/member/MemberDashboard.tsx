import { useAuth } from "../../context/AuthContext";
import { Link } from "wouter";
import { SealLogo } from "../../components/SealLogo";
import { initialSessions } from "../../data/sessions";
import { SITE_CONFIG } from "../../data/config";
import { useState, useEffect } from "react";
import { Enrollment } from "../../types";

export default function MemberDashboard() {
  const { user, logout } = useAuth();
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);

  useEffect(() => {
    const existingStr = localStorage.getItem("pp_enrollments");
    if (existingStr) {
      try {
        const enrollments: Enrollment[] = JSON.parse(existingStr);
        // Find latest enrollment request for this user (matching by name loosely)
        const myEnrollments = enrollments.filter(e => e.name.toLowerCase() === user?.name.toLowerCase());
        if (myEnrollments.length > 0) {
          // sort by date desc
          myEnrollments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setEnrollment(myEnrollments[0]);
        }
      } catch(e) {}
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-parchment flex flex-col">
      <nav className="bg-ink border-b border-line">
        <div className="max-w-[900px] mx-auto px-6 flex items-center justify-between h-[76px]">
          <Link href="/" className="flex items-center gap-3">
            <SealLogo size={32} color="brass" />
            <div className="text-bone font-serif text-[18px] font-semibold tracking-[0.3px]">
              Palace Protocol
            </div>
          </Link>
          <button 
            onClick={() => logout()}
            className="text-parchment text-sm font-medium hover:text-[#C9A860] transition-colors"
          >
            Sign out
          </button>
        </div>
      </nav>

      <main className="flex-1 py-12 px-6">
        <div className="max-w-[900px] mx-auto space-y-8">
          <div>
            <h1 className="text-[32px] font-serif text-ink">Welcome, {user?.name}</h1>
            <p className="text-ink opacity-70 mt-2">Access your academy schedule and resources.</p>
          </div>

          {enrollment && enrollment.status === "pending" && (
            <div className="bg-[#A67C3D]/10 border border-[#A67C3D] p-6">
              <h3 className="font-serif text-xl text-ink mb-2">Application Pending</h3>
              <p className="text-sm text-ink opacity-80">
                Your request to join the academy is currently under review by our administrative team. We will contact you soon.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-bone border border-line p-8 flex flex-col items-start text-left h-full">
              <h3 className="text-[22px] font-serif text-ink mb-4">Your Enrolled Sessions</h3>
              
              <div className="flex flex-col gap-4 w-full">
                {initialSessions.slice(0, 2).map(session => (
                  <div key={session.id} className="border-b border-line pb-4 last:border-0 last:pb-0">
                    <div className="font-medium text-ink mb-1">{session.title}</div>
                    <div className="text-xs font-mono text-ink opacity-70 mb-1">{new Date(session.date).toLocaleDateString()} • {session.time}</div>
                    <div className="text-sm text-ink opacity-60">{session.location}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-ink text-bone border border-line p-8 flex flex-col justify-center gap-5">
              <h3 className="text-[22px] font-serif">Academy Contact</h3>
              <p className="text-sm text-parchment opacity-85">
                For urgent matters regarding your attendance or protocol questions, reach out directly to the academy.
              </p>
              <div>
                <p className="eyebrow mb-1">Direct Line</p>
                <p className="text-sm">{SITE_CONFIG.whatsappNumber}</p>
              </div>
              <a 
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-sm cursor-pointer border border-transparent bg-primary text-ink hover:bg-[#C9A860] transition-colors mt-2 self-start"
              >
                Contact Academy
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
