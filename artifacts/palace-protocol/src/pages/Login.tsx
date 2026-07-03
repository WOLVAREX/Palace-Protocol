import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "wouter";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login(username, password);
    setLoading(false);
    if (res.success) {
      setLocation("/admin");
    } else {
      setError(res.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-6 relative overflow-hidden">
      <svg className="absolute -left-[90px] top-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-[0.04] pointer-events-none" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="none" stroke="#A67C3D" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="#A67C3D" strokeWidth="0.6" />
        <text x="50" y="58" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="30" fill="#A67C3D">PP</text>
      </svg>

      <div className="bg-bone w-full max-w-[400px] border border-primary p-9 relative z-10">
        <div className="mb-6">
          <p className="eyebrow mb-1">Academy access</p>
          <h3 className="text-[22px] font-serif text-ink">Sign in</h3>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#8B3550] text-bone text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[12px] text-ink opacity-70 mb-1.5">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full p-3 border border-line bg-parchment font-sans text-sm text-ink focus:outline-none focus:border-primary transition-colors"
              placeholder="Briton"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-[12px] text-ink opacity-70 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 border border-line bg-parchment font-sans text-sm text-ink focus:outline-none focus:border-primary transition-colors"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium rounded-sm cursor-pointer border border-transparent bg-primary text-ink hover:bg-[#C9A860] transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
