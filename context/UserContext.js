import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/supabase";
import { router } from "expo-router";

const GlobalContext = createContext();

export const useUserContext = () => useContext(GlobalContext);

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize as null instead of an empty string
  const [authId, setAuthId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      // Fetch user only if authId is set
      try {
        if (authId) {
          const response = await getCurrentUser(authId);
          if (response) {
            setUser(response);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    };
    fetchUser();
  }, [authId]);

  return (
    <GlobalContext.Provider
      value={{ user, setUser, authId, setAuthId, isLoading, setIsLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default UserContext;
