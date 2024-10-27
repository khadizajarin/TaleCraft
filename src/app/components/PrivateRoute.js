/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/firebase/AuthProvider";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Ensure `useRouter` only runs on the client side
  if (typeof window === "undefined") {
    return null; // Prevents `useRouter` from running server-side
  }

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <span className="loading loading-ball loading-lg"></span>
      </div>
    );
  }

  return user ? children : null;
};

export default PrivateRoute;

