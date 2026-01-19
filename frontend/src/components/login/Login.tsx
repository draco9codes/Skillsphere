interface loginProp {
  onSubmit: () => void;
}

const Login = ({ onSubmit }: loginProp) => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
        <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white text-center">
            Welcome back
          </h2>
          <p className="text-gray-400 text-center mt-2">Sign in to continue</p>

          <div className="mt-6 space-y-4">
            <input
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5b8db0]"
            />

            <input
              placeholder="Password"
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5b8db0]"
            />

            <button
              onSubmit={onSubmit}
              className="w-full py-3 rounded-lg bg-[#5b8db0] text-white font-medium hover:brightness-110 transition"
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
