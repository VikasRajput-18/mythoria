"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useState } from "react";
import { FormTypes } from "../types";

export type ContextType = {
  openSidebar: boolean;
  toggleSidebar: () => void;

  formData: FormTypes;
  setFormData: React.Dispatch<React.SetStateAction<FormTypes>>;

  tag: string;
  setTag: React.Dispatch<React.SetStateAction<string>>;

  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

export const AppContext = createContext<ContextType | null>(null);

const queryClient = new QueryClient();

export default function AppProvider({ children }: { children: ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const toggleSidebar = () => setOpenSidebar((prev) => !prev);

  const [formData, setFormData] = useState<FormTypes>({
    title: "",
    description: "",
    genre: "",
    content: "",
    tags: [],
    audience: "",
    status: "draft",
    thumbnail: "",
  });

  const [tag, setTag] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  return (
    <AppContext.Provider
      value={{
        openSidebar,
        toggleSidebar,
        formData,
        setFormData,
        tag,
        setTag,
        files,
        setFiles,
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Context should be inside DOM");
  }
  return context;
};
