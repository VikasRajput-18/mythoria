"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { login } from "../../api-service/api";
import CustomInput from "../../components/custom-input";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Spinner from "../../components/spinner";

const SignIn = () => {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      router.push("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Something went wrong!";
      toast.error(message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <section className="bg-mystic-800 min-h-screen flex items-center p-4 justify-center">
      <form
        className="max-w-lg w-full p-4 sm:p-8  shadow-lg
        [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-2xl border border-transparent animate-border
        "
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <h3 className="text-3xl font-bold text-mystic-blue-900 ">
            Mythoria
          </h3>
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

          <div className="w-full flex items-center justify-end">
            <Link
              href={"/reset-password"}
              className="text-sm no-underline text-mystic-500 hover:text-mystic-500"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="cursor-pointer w-full text-white hover:opacity-85 transition hover:scale-95 font-bold rounded-lg px-6 py-3 bg-mystic-blue-900 mt-2 flex items-center justify-center"
          >
            {loginMutation.isPending ? <Spinner /> : "Sign In"}
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center text-sm">
          <p className="text-mystic-500 mr-1">Don’t have an account?</p>
          <Link
            href="/sign-up"
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
