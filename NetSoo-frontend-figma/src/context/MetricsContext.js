'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from "@/context/UserContext";

const MetricsContext = createContext();


export const useMetrics = () => useContext(MetricsContext);

export const MetricsProvider = ({ children }) => {
  const [insightMetrics, setInsightMetrics] = useState({ instagram: [], tiktok: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, isAuthenticated } = useUser();

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://api.appnetsoo.com/api/v1/metrics/all', {
        headers: {
          Authorization: `Token ${localStorage.getItem('accessToken')}`, // Adjust if you use cookies or other method
        },
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setInsightMetrics(data);
    } catch (err) {
      console.error('Failed to fetch metrics:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      if (isAuthenticated && user) {
        fetchMetrics();
      }
    }, [isAuthenticated, user]);

  return (
    <MetricsContext.Provider value={{ insightMetrics, loading, error, refreshMetrics: fetchMetrics }}>
      {children}
    </MetricsContext.Provider>
  );
};
