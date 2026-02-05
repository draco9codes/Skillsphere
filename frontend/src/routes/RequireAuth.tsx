import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/routes/AuthContext";
import type { AuthRouteState } from "./AuthRouteState";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    const state: AuthRouteState = { fromPath: location.pathname };
    return <Navigate to="/login" replace state={state} />;
  }

  return <>{children}</>;
}
