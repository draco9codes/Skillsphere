import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
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

  const wasAuthedRef = useRef<boolean>(!!user);

  useEffect(() => {
    const isAuthedNow = !!user;

    if (!isAuthedNow && !wasAuthedRef.current) {
      setShowLoginComponent(true);
      setAfterLoginPath(location.pathname);
    }

    wasAuthedRef.current = isAuthedNow;
  }, [user, location.pathname, setShowLoginComponent, setAfterLoginPath]); // useEffect runs on dependency changes [web:14]

  if (!user) {
    return <Navigate to={navBarPathName} replace />;
  }

  return <Outlet />;
}
