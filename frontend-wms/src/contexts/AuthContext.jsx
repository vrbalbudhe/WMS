import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshLoginContext = async () => {
    await fetchUser();
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/auth/isToken",
        {
          withCredentials: true,
        }
      );

      const userInfo = response?.data?.payload;
      if (userInfo) {
        if (userInfo.role !== "ADMIN") {
          const response1 = await axios.get(
            `http://localhost:8000/api/user/${userInfo?.email}`
          );
          setCurrentUser(response1?.data?.userInfo);
        } else {
          const response2 = await axios.get(
            `http://localhost:8000/api/admin/fetch/${userInfo?.email}`
          );
          setCurrentUser(response2?.data?.userInfo);
        }
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center backdrop-blur-md">
        <AiOutlineLoading3Quarters className="animate-spin text-blue-600 text-5xl" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        fetchUser,
        setLoading,
        loading,
        refreshLoginContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
