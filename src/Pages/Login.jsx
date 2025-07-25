import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";
import { auth } from "../Firebase/Firebase";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const showAlert = (type, message) => {
    Swal.fire({
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 1800,
      toast: true,
      position: "top-end",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showAlert("success", "Logged in Successfully");
      navigate("/");
    } catch (err) {
      showAlert("error", "Invalid email or password");
      setError("Invalid email or password");
      console.error("login error", err);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      showAlert("success", "Logged in Successfully");
      navigate("/");
    } catch (err) {
      showAlert("error", "Google Sign-In Failed");
      setError("Google Sign-In Failed");
      console.error("login error", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[var(--base-100)] text-[var(--text)] px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-3xl shadow-xl bg-[var(--secondary)] text-[var(--text)]"
      >
        <h2 className="text-center text-3xl font-bold mb-6 text-blue-600">
          Welcome Back 👋
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* Email */}
        <label className="block mb-2 text-sm font-semibold">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded-lg bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <label className="block mb-2 text-sm font-semibold">Password</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-5">
          <Link
            to="/forgot-password"
            state={{ email }}
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="my-4 text-center text-sm opacity-70">or</div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 rounded-lg transition"
        >
          Sign in with Google
        </button>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
