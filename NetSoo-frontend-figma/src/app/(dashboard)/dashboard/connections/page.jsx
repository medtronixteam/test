"use client";

import Layout from "@/components/dashboard/Layout";
import SocialNetworkScreen1 from "@/components/auth/socialNetworks/SocialNetworkScreen1";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ConnectionsPage = () => {
    const { user, fetchUser,  isAuthenticated, isAuthChecked, setUser } = useUser(); 
    const router = useRouter();


    useEffect(() => {
    if (!isAuthenticated) {
        router.push("/login");
    }
    }, [isAuthenticated, router]);


    if (!isAuthenticated) { return null}
    
  return (
    <Layout>
        <SocialNetworkScreen1>
        </SocialNetworkScreen1>
    </Layout>
  );
};

export default ConnectionsPage;
