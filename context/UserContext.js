import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/supabase";
import { router } from "expo-router";

const GlobalContext = createContext();

export const useUserContext = () => useContext(GlobalContext);

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize as null instead of an empty string
  const [authId, setAuthId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(user ? user : "None");

  useEffect(() => {
    const fetchUser = async () => {
      // Fetch user only if authId is set
      try {
        setIsLoading(true);
        if (authId) {
          const { data, error } = await getCurrentUser(authId);
          if (data) {
            setUser(data);
          } else {
            setUser(error.message);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
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
