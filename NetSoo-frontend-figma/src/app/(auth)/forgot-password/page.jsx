"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/custom-input";
import { forgotPassword } from "@/api/auth";

import Link from "next/link";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      forgotPassword(email);
      console.debug("Password reset requested for:", email);
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
            Reset your password
          </h2>
        </div>

        {!emailSent ? (
          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address..."
                required
                icon={<Mail className="h-5 w-5 text-[#D4D4D5]" />}
              />
            </div>

            <div className="text-gray-400 text-sm">
              We'll send you an email with instructions to reset your password.
            </div>

            <div>
              <CustomButton
                type="submit"
                className="w-full"
                isLoading={isLoading}
              >
                Send Reset Link
              </CustomButton>
            </div>
          </form>
        ) : (
          <div className="mt-10 space-y-6">
            <div className="p-4 bg-green-900/20 border border-green-800 rounded-md text-green-400">
              Reset link sent! Please check your email.
            </div>
            <div className="text-gray-400 text-sm">
              If you don't see the email in your inbox, please check your spam
              folder.
            </div>
            <CustomButton
              onClick={() => setEmailSent(false)}
              variant="outline"
              className="w-full"
            >
              Try again
            </CustomButton>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-gray-400">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-medium text-[#3570BC] hover:text-blue-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
