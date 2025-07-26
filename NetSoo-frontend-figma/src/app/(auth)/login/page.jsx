"use client";

import { useState, useEffect } from "react";

import { Mail, Lock } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/custom-input";
import { Checkbox } from "@/components/ui/custom-checkbox";
import { loginUser } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const { fetchUser,  isAuthenticated, setUser } = useUser(); 
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const result = await loginUser(email, password); // Await the loginUser function
        localStorage.setItem("accessToken", result.auth_token);
        localStorage.setItem("isAuthenticated", "true");

        await fetchUser(result.auth_token);
        setLoginError(null);
        router.push("/dashboard");
        // router.push("/dashboard");
    } catch (error) {
        setLoginError("Login Failed: Email or password incorrect.");
        console.error("Login failed:", error);
        // You might want to display an error message to the user here
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-8">
      <div className="w-full max-w-lg md:p-10 space-y-8 rounded-lg md:bg-[url('/images/loginBg.png')] md:bg-cover md:bg-center">
        <div className="flex justify-center">
          <div className="w-16 h-16  flex items-center justify-center">
            <img src="/images/logo.svg" alt="" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-[#3570BC]">Welcome Back!</p>
          <h2 className="mt-2 text-3xl font-bold text-white">
            Login with your email
          </h2>
        </div>

        <form className="mt-10 space-y-8" onSubmit={handleLogin}>
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
          </div>

          {loginError && (
            <div className="text-red-500 text-sm text-center">
              {loginError}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <Checkbox
                id="remember-me"
                name="remember-me"
                label="Remember me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </div>
            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-[#3570BC] underline hover:text-blue-600"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <div>
            <CustomButton
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              Login
            </CustomButton>
          </div>

          <div className="text-[#A8A8AA] text-center">Or Login with</div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <CustomButton variant="outline" className="w-full ">
              <img src="/images/google.svg" alt="" className="mr-2" />
              Continue with Google
            </CustomButton>

            <CustomButton variant="outline" className="w-full ">
              <img src="/images/facebook.svg" alt="" className="mr-2" />
              Continue with Facebook
            </CustomButton>

            <CustomButton variant="outline" className="w-full ">
              <img src="/images/apple.svg" alt="" className="mr-2" />
              Continue with Apple
            </CustomButton>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          Don't Have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-[#3570BC]  hover:text-blue-600"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
