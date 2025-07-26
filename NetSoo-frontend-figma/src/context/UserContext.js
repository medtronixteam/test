"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAuthenticated");
    setUser(null);
  }, []);

  const fetchUser = useCallback(async (tokenParam) => {
    const token = tokenParam || localStorage.getItem("accessToken");

    if (!token) {
      logout();
      setIsLoadingUser(false);
      setIsAuthChecked(true);
      return;
    }

    setIsLoadingUser(true);

    try {
      console.log("Getting User Data");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log("User data fetched successfully:", data);
        setUser(data);
      } else {
        console.error("Failed to fetch user data:", res.status);
        logout();
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      logout();
    } finally {
      setIsLoadingUser(false);
      setIsAuthChecked(true);
    }
  }, [logout]);

  const updateUser = useCallback(async (updatedFields) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update-profile/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: updatedFields,
        }
      );

      if (!res.ok) throw new Error("Failed to update user");

      const updatedUser = await res.json();
      setUser(updatedUser);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const isAuthenticated = !!user;

  // if (!isAuthChecked) {
  //   return <div>Loading application...</div>;
  // }

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingUser,
        isAuthChecked,
        fetchUser,
        updateUser,
        logout,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
