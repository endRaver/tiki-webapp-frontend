import { createContext, useContext, useMemo, useState } from "react";

const SidebarContext = createContext({ isSidebarOpen: false,
    toggleSidebar: () => {},});

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const value = useMemo(() => ({
    isSidebarOpen,
    toggleSidebar,
  }), [isSidebarOpen]);
  
  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
