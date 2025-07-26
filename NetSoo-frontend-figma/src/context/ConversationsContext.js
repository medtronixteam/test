'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from "@/context/UserContext";

const ConversationsContext = createContext();


export const useConversations = () => useContext(ConversationsContext);

export const ConversationsProvider = ({ children }) => {
  const [userConversations, setUserConversations] = useState([]);
  const [conversationsLoading, setConversationsLoading] = useState(true);
  const [conversationsError, setConversationsError] = useState(null);

  const { user, isAuthenticated } = useUser();

  const fetchConversations = async () => {
    try {
      setConversationsLoading(true);
      const res = await fetch('https://api.appnetsoo.com/api/v1/message-inbox/get-all-conversations/', {
        headers: {
          Authorization: `Token ${localStorage.getItem('accessToken')}`, // Adjust if you use cookies or other method
        },
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setUserConversations(data);
    } catch (err) {
      console.error('Failed to fetch conversations:', err);
      setConversationsError(err.message);
    } finally {
      setConversationsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchConversations();
    }
  }, [isAuthenticated, user]);

  return (
    <ConversationsContext.Provider value={{ userConversations, conversationsLoading, conversationsError, refreshConversations: fetchConversations }}>
      {children}
    </ConversationsContext.Provider>
  );
};
