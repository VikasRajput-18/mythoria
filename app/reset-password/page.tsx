"use client";

import Image from "next/image";
import React, { useState } from "react";
import CustomInput from "../../components/custom-input";
import Spinner from "../../components/spinner";
import { useMutation } from "@tanstack/react-query";
import { resetPassword, sendOtp } from "../../api-service/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import Link from "next/link";
import OtpScreen from "../../components/otp";
import { Vortex } from "@/components/ui/vortex";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showOtpDialog, setShowOtpDialog] = useState(false);

  // 1️⃣ Send OTP Mutation
  const sendOtpMutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      toast.success("OTP sent to your email!");
      setShowOtpDialog(true);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success(data.message);
      setShowOtpDialog(false);
      router.push("/sign-in");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Something went wrong!";
      toast.error(message);
    },
  });

  const handleVerifyOtp = async (otp: string) => {
    verifyOtpMutation.mutate({ email, password, otp });
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and new password!");
      return;
    }
    sendOtpMutation.mutate({ email });
  };

  return (
    <section className="bg-mystic-800 min-h-screen flex items-center p-4 justify-center overflow-x-hidden">
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
            <h3 className="text-3xl font-bold text-mystic-blue-900">
              Mythoria
            </h3>
            <p className="text-mystic-500 text-sm mt-1">
              Set a new password and get back to your adventure.
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
              label="New Password"
              placeholder="Create a strong new password"
              required
            />

            <button
              type="submit"
              disabled={sendOtpMutation.isPending}
              className="cursor-pointer w-full text-white hover:opacity-85 transition hover:scale-95 font-bold rounded-lg px-6 py-3 bg-mystic-blue-900 mt-2 flex items-center justify-center"
            >
              {sendOtpMutation.isPending ? <Spinner /> : "Reset Password"}
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center text-sm">
            <p className="text-mystic-500 mr-1">New to Mythoria?</p>
            <Link
              href="/sign-up"
              className="text-mystic-blue-900 hover:underline font-medium"
            >
              Create an account
            </Link>
          </div>
        </form>
        <OtpScreen
          showDialog={showOtpDialog}
          setShowDialog={setShowOtpDialog}
          onVerify={handleVerifyOtp}
          loading={verifyOtpMutation.isPending}
        />
      </Vortex>
    </section>
  );
};

export default ResetPassword;
