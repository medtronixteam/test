"use client";

import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from "@/components/ui/custom-input";
import Link from "next/link";
import { activateUser } from "@/api/auth";



export default function AccountActivation() {

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-8">
      <div className="w-full max-w-lg md:p-10 space-y-8 rounded-lg md:bg-[url('/images/loginBg.png')] md:bg-cover md:bg-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 flex items-center justify-center">
            <img src="/images/logo.svg" alt="NetSoo" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold text-white">
            Account Registration
          </h2>
        </div>

          <div className="mt-10 space-y-6">
            <div className="p-4 bg-green-900/20 border border-green-800 rounded-md text-green-400">
                A verification email has been sent to your email address. Complete the verification process to access your NetSoo account.
            </div>
          </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          <Link
            href="/login"
            className="font-medium text-[#3570BC] hover:text-blue-600"
          >
            Login
          </Link>
            {" "}to use NetSoo
        </p>
      </div>
    </div>
  );
}
