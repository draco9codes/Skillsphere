import Login from "@/components/login/Login";
import type { AuthRouteState } from "@/routes/authRouteState";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginModalRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as AuthRouteState | null;

  const fromPath = state?.fromPath ?? "/home";
  const bgPath = state?.backgroundPath ?? "/home";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <Login
        onClose={() => navigate(bgPath, { replace: true })}
        onSubmit={() => navigate(fromPath, { replace: true })}
      />
    </div>
  );
}
