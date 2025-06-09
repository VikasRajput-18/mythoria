"use client";

import React, { useState } from "react";
import CustomInput from "../../components/custom-input";
import Image from "next/image";
import Link from "next/link";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add login logic
    console.log("Logging in with:", { email, password });
  };

  return (
    <section className="bg-mystic-800 min-h-screen flex items-center justify-center">
      <form
        className="max-w-lg w-full border border-mystic-300 rounded-xl border-dashed p-8 bg-white shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <Image
            src="/assets/mythoria-logo.png"
            width={80}
            height={80}
            alt="Mythoria Logo"
            className="mx-auto object-contain"
          />
          <h3 className="text-3xl font-bold text-mystic-blue-900 mt-2">Welcome Back</h3>
          <p className="text-mystic-500 text-sm mt-1">
            Log in to continue your creative journey on Mythoria.
          </p>
        </div>

        <div className="space-y-4 mt-6">
          <CustomInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="you@example.com"
            required
          />
          <CustomInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your password"
            required
          />
          <button
            type="submit"
            className="w-full text-white hover:opacity-85 transition hover:scale-95 font-bold rounded-lg px-6 py-3 bg-mystic-blue-900 mt-2"
          >
            Sign In
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center text-sm">
          <p className="text-mystic-500 mr-1">Don’t have an account?</p>
          <Link
            href="/register"
            className="text-mystic-blue-900 hover:underline font-medium"
          >
            Create one
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignIn;
