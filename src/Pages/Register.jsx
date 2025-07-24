import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db } from "../Firebase/Firebase";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredentials.user, {
        displayName: `${firstname} ${lastname}`,
        photoURL: photoURL,
      });

      await setDoc(doc(db, "users", userCredentials.user.uid), {
        uid: userCredentials.user.uid,
        displayName: `${firstname} ${lastname}`,
        photoURL: photoURL,
        email: email,
        createdAt: serverTimestamp(),
      });

      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Sign up failed, try again.");
      console.error("Signup error", error);
      setError("Sign up failed. Please try again.");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        createdAt: serverTimestamp(),
      });

      toast.success("Signed up with Google!");
      navigate("/");
    } catch (error) {
      toast.error("Google sign up failed.");
      console.error("Google sign up error", error);
      setError("Google Sign Up Failed. Try Again");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[var(--base-100)] text-[var(--text)] px-4 py-10">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-[var(--secondary)] text-[var(--text)] p-8 rounded-3xl shadow-xl"
      >
        <h2 className="text-center text-3xl font-bold mb-6 text-blue-600">
          Create Account
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* First Name */}
        <label className="block mb-2 text-sm font-medium">First Name</label>
        <input
          type="text"
          placeholder="John"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded-lg bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Last Name */}
        <label className="block mb-2 text-sm font-medium">Last Name</label>
        <input
          type="text"
          placeholder="Doe"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded-lg bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Photo URL */}
        <label className="block mb-2 text-sm font-medium">Photo URL</label>
        <input
          type="text"
          placeholder="https://example.com/photo.jpg"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded-lg bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email */}
        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded-lg bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 p-3 rounded-lg bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Sign Up
        </button>

        {/* Divider */}
        <div className="my-4 text-center text-sm opacity-70">or</div>

        {/* Google Signup */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 rounded-lg transition"
        >
          Sign up with Google
        </button>

        {/* Already have an account */}
        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
