import { useAuth } from "@/routes/AuthContext";
import { http } from "@/utility/HTTPUtility";
import { XIcon } from "lucide-react";
import { useState } from "react";
import loginImage from "../../assets/loginimg.png";
import { WelcomeAnimation } from "./WelcomeAnimation";

interface LoginProps {
  onSubmit: () => void;
  onClose: () => void;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name?: string;
  };
}

const Login = ({ onSubmit, onClose }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Welcome animation state
  const [showWelcome, setShowWelcome] = useState(false);
  const [userName, setUserName] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await http.post<LoginResponse>(
        "/auth/login",
        { email, password },
        { withCredentials: true },
      );

      // Save to auth context
      login({
        id: response.user.id.toString(),
        email: response.user.email,
        name: response.user.name ?? response.user.email,
      });

      // Trigger welcome animation
      setUserName(response.user.name ?? response.user.email);
      setShowWelcome(true);

      // DON'T call onSubmit yet - wait for animation to complete
    } catch (err: any) {
      if (
        err.response?.status === 400 &&
        typeof err.response.data === "object"
      ) {
        setErrors(err.response.data);
      } else {
        setErrors({});
        alert(err.response?.data?.message || "Login failed");
      }
    }
  };

  const handleWelcomeComplete = () => {
    // Animation finished, now close modal and proceed
    onSubmit();
  };

  return (
    <>
      {/* Welcome Animation Overlay */}
      {showWelcome && (
        <WelcomeAnimation
          userName={userName}
          onComplete={handleWelcomeComplete}
        />
      )}

      {/* Login Form */}
      <div className="relative w-max h-screen bg-white dark:bg-neutral-800 rounded-lg overflow-hidden grid grid-cols-2 border border-neutral-200 dark:border-neutral-700">
        {/* LEFT IMAGE */}
        <div className="relative bg-gradient-to-br from-[#5B8DB0] to-[#4F9EAF] rounded-l-lg overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-10 mix-blend-multiply"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#FF7E5F] rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-12 w-40 h-40 bg-white rounded-full opacity-30 animate-ping"></div>
          <img
            src={loginImage}
            alt="Login visual"
            className="max-h-full max-w-full object-contain relative z-10 image-blend-multiply"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="relative p-8 flex flex-col justify-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-12 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition"
          >
            <XIcon />
          </button>

          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white font-space-grotesk">
            Sign in
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Welcome back
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5B8DB0] dark:focus:ring-[#7DA8C3]"
              />
              <span className="text-xs text-red-600">{errors.email}</span>
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5B8DB0] dark:focus:ring-[#7DA8C3]"
              />
              <span className="text-xs text-red-600">{errors.password}</span>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full rounded-md bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] hover:from-[#4A748E] hover:to-[#3F7E8C] py-2 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
