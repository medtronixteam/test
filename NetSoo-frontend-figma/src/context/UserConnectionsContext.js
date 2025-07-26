'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getAllConnections } from '@/api/connections';
import { useUser } from './UserContext';

const UserConnectionsContext = createContext();

export function UserConnectionsProvider({ children }) {
  const [userConnections, setUserConnections] = useState([]);
  const [userConnectionsLoading, setUserConnectionsLoading] = useState(true);
  const [userConnectionsChecked, setUserConnectionsChecked] = useState(false);
  const [userConnectionsError, setUserConnectionsError] = useState(null);

  const { user, isAuthChecked } = useUser();

  const fetchConnections = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      setUserConnectionsLoading(true);
      const data = await getAllConnections(token);
      setUserConnections(data);
      setUserConnectionsChecked(true);
    } catch (err) {
      setUserConnectionsError(err);
    } finally {
      setUserConnectionsLoading(false);
      setUserConnectionsChecked(true);
    }
  };

  useEffect(() => {
    // ✅ Only fetch when auth is checked AND user exists
    if (isAuthChecked && user) {
      setUserConnectionsChecked(false);
      fetchConnections();
    }
  }, [isAuthChecked, user]);

  return (
    <UserConnectionsContext.Provider
      value={{
        userConnections,
        userConnectionsLoading,
        userConnectionsError,
        userConnectionsChecked,
        refreshConnections: fetchConnections,
      }}
    >
      {children}
    </UserConnectionsContext.Provider>
  );
}

export function useUserConnections() {
  const context = useContext(UserConnectionsContext);
  if (!context) {
    throw new Error('useUserConnections must be used within a UserConnectionsProvider');
  }
  return context;
}
