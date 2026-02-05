import Login from "@/components/login/Login";
import { useLocation, useNavigate } from "react-router-dom";
import type { AuthRouteState } from "@/routes/AuthRouteState";

export default function LoginModalRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  // state can be undefined if user visits /login directly
  const state = location.state as AuthRouteState | null;

  const fromPath = state?.from?.pathname ?? "/home";
  const bgPath = state?.backgroundLocation?.pathname ?? "/home";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <Login
        onClose={() => navigate(bgPath, { replace: true })}
        onSubmit={() => navigate(fromPath, { replace: true })}
      />
    </div>
  );
}
