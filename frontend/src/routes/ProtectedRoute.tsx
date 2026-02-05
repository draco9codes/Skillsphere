import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/routes/AuthContext";

type ProtectedRouteProps = {
  navBarPathName: string;
  setShowLoginComponent: (v: boolean) => void;
  setAfterLoginPath: (path: string) => void;
};

export default function ProtectedRoute({
  navBarPathName,
  setShowLoginComponent,
  setAfterLoginPath,
}: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  // When blocked, tell NavBar to open the modal and remember what was clicked
  useEffect(() => {
    if (!user) {
      setShowLoginComponent(true);
      setAfterLoginPath(location.pathname);
    }
  }, [user, location.pathname, setShowLoginComponent, setAfterLoginPath]);

  if (!user) {
    return <Navigate to={navBarPathName} replace />;
  }

  return <Outlet />;
}
