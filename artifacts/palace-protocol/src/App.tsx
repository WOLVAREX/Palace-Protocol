import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AdminLayout } from "./components/AdminLayout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Books from "./pages/Books";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Terms from "./pages/Terms";
import Policies from "./pages/Policies";

// Admin
import Dashboard from "./pages/admin/Dashboard";
import AdminEnrollments from "./pages/admin/AdminEnrollments";
import AdminSessions from "./pages/admin/AdminSessions";
import AdminMembers from "./pages/admin/AdminMembers";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminContent from "./pages/admin/AdminContent";
import AdminTerms from "./pages/admin/AdminTerms";
import AdminPolicies from "./pages/admin/AdminPolicies";

// Member
import MemberDashboard from "./pages/member/MemberDashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute role="admin">
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}

function Router() {
  return (
    <Switch>
      {/* Public */}
      <Route path="/">
        <PublicLayout><Home /></PublicLayout>
      </Route>
      <Route path="/about">
        <PublicLayout><About /></PublicLayout>
      </Route>
      <Route path="/books">
        <PublicLayout><Books /></PublicLayout>
      </Route>
      <Route path="/contact">
        <PublicLayout><Contact /></PublicLayout>
      </Route>
      <Route path="/terms">
        <PublicLayout><Terms /></PublicLayout>
      </Route>
      <Route path="/policies">
        <PublicLayout><Policies /></PublicLayout>
      </Route>
      <Route path="/login">
        <Navbar />
        <Login />
      </Route>

      {/* Admin */}
      <Route path="/admin">
        <AdminRoute><Dashboard /></AdminRoute>
      </Route>
      <Route path="/admin/enrollments">
        <AdminRoute><AdminEnrollments /></AdminRoute>
      </Route>
      <Route path="/admin/sessions">
        <AdminRoute><AdminSessions /></AdminRoute>
      </Route>
      <Route path="/admin/members">
        <AdminRoute><AdminMembers /></AdminRoute>
      </Route>
      <Route path="/admin/books">
        <AdminRoute><AdminBooks /></AdminRoute>
      </Route>
      <Route path="/admin/content">
        <AdminRoute><AdminContent /></AdminRoute>
      </Route>
      <Route path="/admin/terms">
        <AdminRoute><AdminTerms /></AdminRoute>
      </Route>
      <Route path="/admin/policies">
        <AdminRoute><AdminPolicies /></AdminRoute>
      </Route>
      <Route path="/admin/settings">
        <AdminRoute><AdminSettings /></AdminRoute>
      </Route>

      {/* Member */}
      <Route path="/member">
        <ProtectedRoute role="member">
          <MemberDashboard />
        </ProtectedRoute>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
