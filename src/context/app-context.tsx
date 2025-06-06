"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export type ContextType = {
  openSidebar: boolean;
  toggleSidebar: () => void;
};

export const AppContext = createContext<ContextType | null>(null);

export default function AppProvider({ children }: { children: ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  return (
    <AppContext.Provider value={{ openSidebar, toggleSidebar }}>
      {children}
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
