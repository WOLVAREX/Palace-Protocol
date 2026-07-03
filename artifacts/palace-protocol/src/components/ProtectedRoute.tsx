import { useAuth } from "../context/AuthContext";
import { useLocation } from "wouter";
import { useEffect } from "react";

interface ProtectedRouteProps {
  role: "admin" | "member";
  children: React.ReactNode;
}

export function ProtectedRoute({ role, children }: ProtectedRouteProps) {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!user) {
      setLocation("/login");
    } else if (user.role !== role) {
      setLocation(user.role === "admin" ? "/admin" : "/member");
    }
  }, [user, role, setLocation]);

  if (!user || user.role !== role) {
    return null;
  }

  return <>{children}</>;
}
