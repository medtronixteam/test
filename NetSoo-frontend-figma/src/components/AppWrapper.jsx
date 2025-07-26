"use client";
import { useUser } from "@/context/UserContext";

export default function AppWrapper({ children }) {
  const { isLoadingUser, isAuthChecked } = useUser();

  if (!isAuthChecked || isLoadingUser) {
    console.log("NOT AUTH CHECKED");
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading application...
      </div>
    );
  }

  return children;
}
