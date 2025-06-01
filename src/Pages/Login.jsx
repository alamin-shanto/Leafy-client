import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in Successfully");
      navigate("/");
    } catch (err) {
      toast.error("Invalid email or Password");
      setError("Invalid email or Password");
      console.error("login error", err);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      toast.success("Logged in Successfully");
      navigate("/");
    } catch (err) {
      toast.error("Google Sign In Failed");
      setError("Google Sign In Failed");
      console.error("login error", err);
    }
  };

  return (
    <div className="flex justify-center items-center m-5 lg:my-20">
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--secondary)] p-5 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-center font-extrabold text-2xl my-5">Login Page</h2>
        {error && <p className="text-red-500 mb-5 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="bg-white w-full mb-5 p-3 rounded-2xl text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative mb-5">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="bg-white w-full p-3 rounded-2xl text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
            aria-level="Toggle password visibility"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        <div className="flex justify-between mb-5">
          <p></p>
          <Link
            to="/forgot-password"
            state={{ email }}
            className="hover:text-blue-400"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 rounded-2xl hover:bg-blue-700 font-bold"
        >
          Sign In
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full hover:text-blue-700 font-bold mt-5"
        >
          Sign In With Google
        </button>

        <p className="text-center mt-2">
          Don't have an Account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-700 font-bold"
          >
            Sign up here
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default LogIn;
