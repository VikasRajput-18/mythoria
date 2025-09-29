"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { register, sendSignUpOtp } from "../../api-service/api";
import CustomInput from "../../components/custom-input";
import OtpScreen from "../../components/otp";
import Spinner from "../../components/spinner";
import { Vortex } from "@/components/ui/vortex";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOtpDialog, setShowOtpDialog] = useState(false);

  const router = useRouter();

  // 1️⃣ Send OTP Mutation
  const sendOtpMutation = useMutation({
    mutationFn: sendSignUpOtp,
    onSuccess: () => {
      toast.success("OTP sent to your email!");
      setShowOtpDialog(true);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    },
  });

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

  const handleVerifyOtp = async (otp: string) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    registerMutation.mutate({ email, password, name: fullName, otp });
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      toast.error("Please enter name, email and password!");
      return;
    }
    sendOtpMutation.mutate({ email, name: fullName, password });
  };

  return (
    <section className="bg-mystic-800 min-h-screen flex items-center justify-center p-4 overflow-x-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={600}
        particleCount={400}
        baseHue={520}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <form
          className="max-w-lg w-full p-4 sm:p-8  shadow-lg
        [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-2xl border border-transparent animate-border
        "
          onSubmit={handleSendOtp}
        >
          <div className="text-center">
            <h3 className="text-3xl font-bold text-mystic-blue-900 ">
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
              disabled={sendOtpMutation.isPending}
              className="cursor-pointer w-full text-white hover:opacity-85 transition hover:scale-95 font-bold rounded-lg px-6 py-3 bg-mystic-blue-900 mt-2 flex items-center justify-center"
            >
              {sendOtpMutation.isPending ? <Spinner /> : "Create Account"}
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

        <OtpScreen
          showDialog={showOtpDialog}
          setShowDialog={setShowOtpDialog}
          onVerify={handleVerifyOtp}
          loading={registerMutation.isPending}
        />
      </Vortex>
    </section>
  );
};

export default SignUp;
