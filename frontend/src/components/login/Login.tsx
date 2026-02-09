import { useAuth } from "@/routes/AuthContext";
import { http } from "@/utility/HTTPUtility";
import { XIcon } from "lucide-react";
import { useState } from "react";
import loginImage from "../../assets/loginimg.png";

interface LoginProps {
  onSubmit: () => void;
  onClose: () => void;
}

interface LoginResponse {
  status: number;
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

  const handleSubmit = async () => {
    try {
      const response = await http.post<LoginResponse>(
        "/auth/login",
        { email, password },
        { withCredentials: true }, // 🔴 REQUIRED for cookies
      );

      login({
        id: response.user.id.toString(),
        email: response.user.email,
        name: response.user.name ?? response.user.email,
      });

      onSubmit();
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

  return (
    <div className="relative w-max h-screen bg-white rounded-lg overflow-hidden grid grid-cols-2 border border-gray-200">
      {/* LEFT IMAGE */}
      <div className="relative bg-gradient-to-br rounded-l-lg overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-10 mix-blend-multiply" />
        <img
          src={loginImage}
          alt="Login"
          className="max-h-full max-w-full object-contain relative z-10"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="relative p-8 flex flex-col justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-12 text-gray-400 hover:text-gray-600"
        >
          <XIcon />
        </button>

        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-gray-500">Welcome back</p>

        <div className="mt-6 space-y-4">
          <div>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            />
            <span className="text-xs text-red-600">{errors.email}</span>
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            />
            <span className="text-xs text-red-600">{errors.password}</span>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full rounded-md bg-[#FF7E5F] py-2 text-white"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
