"use client";

import { useState, useEffect } from "react";
import { Mail, Lock, User } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/custom-input";
import { Checkbox } from "@/components/ui/custom-checkbox";
import { registerUser } from "@/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const { fetchUser,  isAuthenticated, setUser } = useUser(); 
  

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      await registerUser(email, password, firstName, lastName);
      setRegisterError(null);
      router.push("/register-success")
    }
    catch (error)
    {
      setRegisterError(error.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-8">
      <div className="w-full max-w-lg md:p-10 space-y-8 rounded-lg md:bg-[url('/images/loginBg.png')] md:bg-cover md:bg-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 flex items-center justify-center">
            <img src="/images/logo.svg" alt="" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-[#3570BC]">Get started with NetSoo</p>
          <h2 className="mt-2 text-3xl font-bold text-white">
            Sign up your account
          </h2>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleRegister}>
        <div className="space-y-4">
        <Input
              label="First Name"
              type="text"
              id="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name..."
              required
              icon={<User className="h-5 w-5 text-[#D4D4D5]" />}
            />

            <Input
              label="Last Name"
              type="text"
              id="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name..."
              required
              icon={<User className="h-5 w-5 text-[#D4D4D5]" />}
            />

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
            <Checkbox
              id="accept-terms"
              name="accept-terms"
              label={
                <span>
                  I accept the{" "}
                  <a href="#" className="text-white hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-white hover:underline">
                    Privacy Policy
                  </a>
                </span>
              }
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              required
            />
          </div>

          <div>
            <CustomButton
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={!acceptTerms}
            >
              Sign up
            </CustomButton>
          </div>


          {registerError && (
            <div className="text-red-500 text-sm text-center">
              {registerError}
            </div>
          )}

          <div className="text-[#A8A8AA] text-center">Or Sign up with</div>

          <div className="grid grid-cols-1 gap-3">
            <CustomButton variant="outline" className="w-full">
              <img src="/images/google.svg" alt="" className="mr-2" />
              Continue with Google
            </CustomButton>

            <CustomButton variant="outline" className="w-full">
              <img src="/images/facebook.svg" alt="" className="mr-2" />
              Continue with Facebook
            </CustomButton>

            <CustomButton variant="outline" className="w-full">
              <img src="/images/apple.svg" alt="" className="mr-2" />
              Continue with Apple
            </CustomButton>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
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
