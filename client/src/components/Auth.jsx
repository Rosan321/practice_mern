import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  // ✅ Validation
  if (isLogin) {
    if (!email || !password) {
      setMessage("Email and password are required!");
      return;
    }
  } else {
    if (!username || !email || !password) {
      setMessage("All fields are required!");
      return;
    }
  }

  setLoading(true);

  try {
    const endpoint = isLogin ? "/auth/login" : "/auth/register";

    // ✅ Conditional payload
    const payload = isLogin
      ? { email, password }
      : { username, email, password };

    const res = await axiosInstance.post(endpoint, payload);

    setMessage(res.data.message);

    if (isLogin) {
      sessionStorage.setItem("token", res.data.accessToken);
      window.location.reload();
    } else {
      setIsLogin(true);
      setUsername("");
      setEmail("");
      setPassword("");
    }
  } catch (error) {
    if (error.response) {
      setMessage(error.response.data.message || "Something went wrong");
    } else {
      setMessage("Server error. Try again later.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Or create a new account" : "Already have an account?"}{" "}
            <button
              type="button"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>

        {message && (
          <div
            className={`text-center font-medium ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
  <div>
    <label className="block text-sm font-medium text-gray-900">
      Username
    </label>
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2"
    />
  </div>
)}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? isLogin
                  ? "Signing in..."
                  : "Signing up..."
                : isLogin
                  ? "Sign in"
                  : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
