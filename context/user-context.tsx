"use client";

import { createContext, ReactNode, useContext } from "react";
import { getCurrentUser } from "../api-service/api";
import { useQuery } from "@tanstack/react-query";

export interface UserTypes {
  id: number;
  name: string;
  email: string;
}

// 2️⃣ Define Context shape
interface ContextType {
  user: UserTypes | null; // allow null for unauthenticated state
  isLoading: boolean;
}

export const UserContext = createContext<ContextType | null>(null);

export default function UserProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getCurrentUser,
  });

  const user = data?.user || null;

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Context should be inside DOM");
  }
  return context;
};
