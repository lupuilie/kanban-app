'use client';

import { createContext, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';

type DashboardContextType = {
  sidebarVisible: boolean;
  toggleSidebar: () => void;
};

const initialState = {
  sidebarVisible: true,
  toggleSidebar: () => {},
} satisfies DashboardContextType;

export const DashboardContext = createContext<DashboardContextType>(initialState);

export const DashboardContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { width } = useWindowSize();
  const [sidebarVisible, setSidebarVisible] = useState(true);

  if (width && sidebarVisible && width < 768) {
    setSidebarVisible(false);
  }

  const toggleSidebar = () => setSidebarVisible((prev) => !prev);

  return (
    <DashboardContext.Provider value={{ sidebarVisible, toggleSidebar }}>
      {children}
    </DashboardContext.Provider>
  );
};
