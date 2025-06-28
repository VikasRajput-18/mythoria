"use client";

import React, { useState } from "react";
import CustomInput from "../../components/custom-input";
import Image from "next/image";
import Link from "next/link";
import { register } from "../../api-service/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Spinner from "../../components/spinner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import OtpScreen from "../../components/otp";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const [showDialog, setShowDialog] = useState(true);

  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/sign-in");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Something went wrong!";
      toast.error(message);
    },
  });
  const sendOtpMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/sign-in");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Something went wrong!";
      toast.error(message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    registerMutation.mutate({ email, password, name: fullName });
  };

  return (
    <section className="bg-mystic-800 min-h-screen flex items-center justify-center p-4">
      {/* <OtpScreen
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        onVerify={(otp) => {
          console.log("Verified OTP:", otp);
          // ✅ Continue registration here
        }}
      /> */}
      <form
        className="max-w-lg w-full border border-mystic-300 rounded-xl border-dashed p-4 sm:p-8 shadow-lg"
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
          <h3 className="text-3xl font-bold text-mystic-blue-900 mt-2">
            Mythoria
          </h3>
          <p className="text-mystic-500 text-sm mt-1">
            Create your account to begin writing your story.
          </p>
        </div>

        <div className="space-y-4 mt-6">
          <CustomInput
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Enter Name"
            placeholder="Pablo Escobar"
            required
          />
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
            placeholder="Create a strong password"
            required
          />
          <CustomInput
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm Password"
            placeholder="Re-enter your password"
            required
          />
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="cursor-pointer w-full text-white hover:opacity-85 transition hover:scale-95 font-bold rounded-lg px-6 py-3 bg-mystic-blue-900 mt-2 flex items-center justify-center"
          >
            {registerMutation.isPending ? <Spinner /> : "Create Account"}
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center text-sm">
          <p className="text-mystic-500 mr-1">Already have an account?</p>
          <Link
            href="/sign-in"
            className="text-mystic-blue-900 hover:underline font-medium"
          >
            Sign In
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
