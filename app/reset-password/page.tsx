"use client";

import Image from "next/image";
import React, { useState } from "react";
import CustomInput from "../../components/custom-input";
import Spinner from "../../components/spinner";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../api-service/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import Link from "next/link";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
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
    resetPasswordMutation.mutate({ email, password });
  };

  return (
    <section className="bg-mystic-800 min-h-screen flex items-center p-4 justify-center">
      <form
        className="max-w-lg w-full border border-mystic-300 rounded-xl border-dashed p-4 sm:p-8  shadow-lg"
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
            disabled={resetPasswordMutation.isPending}
            className="cursor-pointer w-full text-white hover:opacity-85 transition hover:scale-95 font-bold rounded-lg px-6 py-3 bg-mystic-blue-900 mt-2 flex items-center justify-center"
          >
            {resetPasswordMutation.isPending ? <Spinner /> : "Reset Password"}
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
    </section>
  );
};

export default ResetPassword;
