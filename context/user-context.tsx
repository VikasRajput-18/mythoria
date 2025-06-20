"use client";

import { createContext, ReactNode, useContext } from "react";
import { getCurrentUser, logout } from "../api-service/api";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

export interface UserTypes {
  id: number;
  name: string;
  email: string;
}

// 2️⃣ Define Context shape
interface ContextType {
  user: UserTypes | null; // allow null for unauthenticated state
  isLoading: boolean;
  logoutMutation: UseMutationResult<
    any,
    AxiosError<
      {
        message: string;
      },
      any
    >,
    void,
    unknown
  >;
}

export const UserContext = createContext<ContextType | null>(null);

export default function UserProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getCurrentUser,
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.clear();
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      if (pathname !== "/") return router.push("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Something went wrong!";
      toast.error(message);
    },
  });

  const user = data?.user || null;

  return (
    <UserContext.Provider value={{ user, isLoading, logoutMutation }}>
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
