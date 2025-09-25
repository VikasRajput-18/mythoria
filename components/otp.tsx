"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import React, { Dispatch, SetStateAction, useState } from "react";
import Spinner from "./spinner";

interface OtpScreenProps {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  onVerify: (otp: string) => void; // 🔐 optional callback
  loading?: boolean;
}

const OtpScreen = ({
  showDialog,
  setShowDialog,
  onVerify,
  loading,
}: OtpScreenProps) => {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp.length < 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }
    onVerify?.(otp); // Optional callback to parent
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog} modal>
      <DialogOverlay className="backdrop-blur-2xl" />
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()} // optional: prevent ESC from closing
        className="bg-mystic-800 text-white border-0"
      >
        <DialogHeader>
          <DialogTitle className="text-white text-lg sm:text-xl">
            Verify your email
          </DialogTitle>
          <DialogDescription className="text-mystic-500">
            We’ve sent a 6-digit OTP to your email. Enter it below to continue.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex items-center justify-center">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="w-14 h-14 text-2xl  border-mystic-500 focus:ring-2 focus:ring-mystic-blue-800"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="mt-4 w-full bg-mystic-700 border border-mystic-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-mystic-blue-800 transition duration-200 ease-in-out flex items-center justify-center"
        >
          {loading ? <Spinner /> : "Verify OTP"}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default OtpScreen;
