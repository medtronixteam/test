"use client";
import React from "react";
import Layout from "@/components/dashboard/Layout";
import PlanCards from "@/components/dashboard/plansBilling/PlanCards";
import HistoryTable from "@/components/dashboard/plansBilling/HistoryTable";
import BillingForm from "@/components/dashboard/plansBilling/BillingForm";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PlansBillingPage = () => {
  const { isAuthenticated } = useUser(); 
  const router = useRouter();
  
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);


  if (!isAuthenticated) { return null}

  
  return (
    <Layout>
      <PlanCards />
      <HistoryTable />
      <BillingForm />
    </Layout>
  );
};

export default PlansBillingPage;
