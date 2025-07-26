"use client";

import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from "@/components/ui/custom-input";
import Link from "next/link";
import { activateUser } from "@/api/auth";



export default function AccountActivation() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [activated, setActivated] = useState(false);
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');


  useEffect(() => {
    const userActivation = async () => {
      if (!uid || !token) {
        setActivated(false);
        return;
      }
  
      try {
        console.log("Activating user...");
        await activateUser(uid, token);
        setActivated(true);
      } catch (err) {
        console.error("Activation failed:", err.message);
        setActivated(false);
      }
    };
  
    // userActivation();
    activateUser(uid, token);

  }, [uid, token]);
  

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
            Account Activation
          </h2>
        </div>

        {!activated ? (
          <div className="mt-10 space-y-6">
            <div className="p-4 bg-green-900/20 border border-red-800 rounded-md text-red-400">
              Something went wrong, account could not be activated.
            </div>
            {/* <CustomButton
            onClick={() => setActivated(false)}
            variant="outline"
            className="w-full"
            >
            Resend Activation Email
            </CustomButton> */}
          </div>

        
        ) : (
          <div className="mt-10 space-y-6">
            <div className="p-4 bg-green-900/20 border border-green-800 rounded-md text-green-400">
              Account successfully activated.
            </div>
          </div>
        )}

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
