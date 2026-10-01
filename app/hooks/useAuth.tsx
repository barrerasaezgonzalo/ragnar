"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../providers/AuthProvider";

export function useAuth() {
  const context = useContext(AuthContext);
  const router = useRouter();

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  const { logout } = context;
  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return { ...context, handleLogout };
}
