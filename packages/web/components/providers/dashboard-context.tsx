'use client';

import { createContext, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';

type DashboardContextType = {
  sidebarVisible: boolean;
  selectedBoardId?: string;
  toggleSidebar: () => void;
  setSelectedBoardId: (id: string) => void;
};

const initialState = {
  sidebarVisible: true,
  selectedBoardId: undefined,
  toggleSidebar: () => {},
  setSelectedBoardId: () => {},
} satisfies DashboardContextType;

export const DashboardContext = createContext<DashboardContextType>(initialState);

export const DashboardContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { width } = useWindowSize();

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedBoardId, setSelectedBoardId] = useState<string | undefined>();

  if (width && sidebarVisible && width < 768) {
    setSidebarVisible(false);
  }

  const toggleSidebar = () => setSidebarVisible((prev) => !prev);

  return (
    <DashboardContext.Provider
      value={{ sidebarVisible, toggleSidebar, selectedBoardId, setSelectedBoardId }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
