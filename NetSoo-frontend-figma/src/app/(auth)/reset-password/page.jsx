"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/custom-input";
import Link from "next/link";
export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setResetComplete(true);
      console.log("Password reset completed with new password");
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-8">
      <div className="w-full max-w-lg md:p-10 space-y-8 rounded-lg md:bg-[url('/images/loginBg.png')] md:bg-cover md:bg-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 flex items-center justify-center">
            <img src="/images/logo.svg" alt="NetSoo" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-[#3570BC]">Reset password</p>
          <h2 className="mt-2 text-3xl font-bold text-white">
            {resetComplete ? "Password Reset Complete" : "Add New Password"}
          </h2>
        </div>

        {!resetComplete ? (
          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-900/20 border border-red-800 rounded-md text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <Input
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                required
                showPasswordToggle
                icon={<Lock className="h-5 w-5 text-[#D4D4D5]" />}
              />

              <Input
                label="Confirm password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password..."
                required
                showPasswordToggle
                icon={<Lock className="h-5 w-5 text-[#D4D4D5]" />}
              />
            </div>

            <div>
              <CustomButton
                type="submit"
                className="w-full"
                isLoading={isLoading}
              >
                Continue
              </CustomButton>
            </div>
          </form>
        ) : (
          <div className="mt-10 space-y-6">
            <div className="p-4 bg-green-900/20 border border-green-800 rounded-md text-green-400">
              Your password has been reset successfully!
            </div>
            <Link href="/login">
              <CustomButton className="w-full">Back to Login</CustomButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
