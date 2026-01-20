import { http } from "@/utility/HTTPUtility";
import { XIcon } from "lucide-react";
import { useState } from "react";
import loginImage from "../../assets/loginimg.png";

interface LoginProps {
  onSubmit: () => void;
  onClose: () => void; // for the close button
}

const Login = ({ onSubmit, onClose }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  interface LoginResponse {
    token: string;
  }
  const handleSubmit = async () => {
    try {
      console.log("Submitting login with", { email, password });
      const response = await http.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      console.log("Login response:", response);
      localStorage.setItem("token", response.token);
      onSubmit();
    } catch (err: any) {
      console.error("Login error details:", err);
      console.error("Response:", err.response?.data);
      console.error("Status:", err.response?.status);
      alert(
        err.response?.data?.message ||
          "Login failed. Check console for details.",
      );
    }
  };

  return (
    <div className="relative w-max h-screen bg-white rounded-lg overflow-hidden grid grid-cols-2 border border-gray-200">
      {/* LEFT – IMAGE */}
      <div className="relative bg-gradient-to-br rounded-l-lg overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-10 mix-blend-multiply"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#FF7E5F] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-12 w-40 h-40 bg-white rounded-full opacity-30 animate-ping"></div>
        <img
          src={loginImage}
          alt="Login visual"
          className="max-h-full max-w-full object-contain relative z-10 image-blend-multiply"
        />
      </div>

      <div className="relative p-8 flex flex-col justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-400 hover:text-gray-600 text-xl leading-none"
          aria-label="Close"
        >
          <XIcon name="close" />
        </button>

        <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back</p>

        <div className="mt-6 ml-2 space-y-4">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-9/10 rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF7E5F] focus:ring-1 focus:ring-[#FF7E5F]"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-9/10 rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF7E5F] focus:ring-1 focus:ring-[#FF7E5F]"
          />

          <button
            onClick={handleSubmit}
            className="mt-2 w-9/10 rounded-md bg-[#FF7E5F] py-2.5 text-sm font-medium text-white hover:brightness-110 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
