import { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/images/image.png";
import { s } from "framer-motion/client";

export default function Auth() {
  const [mode, setMode] = useState("login"); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Signup failed. Please try again.");
    }
  };

  const handleForgot = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setError("");
      setMode("login");
    } catch (err) {
      console.error(err);
      setError("Request failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96 relative">
        <div className="flex flex-col items-center justify-center">
          <img src={image} alt="Dashboard" className="w-[276px] h-[146px]" />
          <h1 className="text-xl text-[#868686] mb-3 font-semibold">
            Welcome to Digitalflake admin
          </h1>
        </div>

        {mode === "login" && (
          <>
            <input
              className="w-full border p-2 mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full border p-2 mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-between items-center text-sm">
              <button
                onClick={() => setMode("signup")}
                className="text-[#662671]"
              >
                Sign Up
              </button>
              <button
                onClick={() => setMode("forgot")}
                className="text-[#662671]"
              >
                Forgot Password?
              </button>
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-[#662671] text-white py-2 rounded mt-4"
            >
              Log In
            </button>
            {error && <p className="text-red-600 text-center text-sm mt-2">{error}</p>}
          </>
        )}

        {mode === "signup" && (
          <>
            <input
              className="w-full border p-2 mb-3"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full border p-2 mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full border p-2 mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-between items-center text-sm">
              <button
                onClick={() => setMode("login")}
                className="text-[#662671]"
              >
                Back to Login
              </button>
            </div>
            <button
              onClick={handleSignup}
              className="w-full bg-[#662671] text-white py-2 rounded mt-4"
            >
              Sign Up
            </button>
            {error && <p className="text-red-600 text-center text-sm mt-2">{error}</p>}
          </>
        )}
      </div>

      {mode === "forgot" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white w-[440px] rounded shadow-lg p-8">
            <h2 className="text-lg font-semibold text-center text-[#662671] mb-1">
              Did you forget password?
            </h2>
            <p className="text-xs text-center text-gray-800 mb-6">
              Enter your email address and we&apos;ll send you a link to restore
              password.
            </p>

            <label className="block text-xs text-gray-600 mb-1">
              Email Address
            </label>
            <input
              className="w-full border rounded px-3 py-2 mb-5 text-sm"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleForgot}
              className="w-full bg-[#662671] text-white py-2 rounded text-sm mb-3"
            >
              Request reset link
            </button>

            <button
              onClick={() => setMode("login")}
              className="w-full text-[11px] text-gray-500 underline"
            >
              Back to log in
            </button>
            {error && <p className="text-red-600 text-center text-sm mt-2">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
