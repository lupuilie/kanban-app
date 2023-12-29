'use client';

import { createContext, useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';

type DashboardContextType = {
  sidebarVisible: boolean;
  selectedBoardId?: string;
  isBoardEmpty?: boolean;
  setIsBoardEmpty: (value: boolean) => void;
  toggleSidebar: () => void;
  setSelectedBoardId: (id: string) => void;
};

const initialState = {
  sidebarVisible: true,
  selectedBoardId: undefined,
  isBoardEmpty: undefined,
  setIsBoardEmpty: () => {},
  toggleSidebar: () => {},
  setSelectedBoardId: () => {},
} satisfies DashboardContextType;

export const DashboardContext = createContext<DashboardContextType>(initialState);

export const DashboardContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { width } = useWindowSize();

  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [selectedBoardId, setSelectedBoardId] = useState<string | undefined>();
  const [isBoardEmpty, setIsBoardEmpty] = useState<boolean>(false);

  const toggleSidebar = () => setSidebarVisible((prev) => !prev);

  useEffect(() => {
    handleSidebarVisibility(width, isInitialLoad);
  }, [width, isInitialLoad]);

  return (
    <DashboardContext.Provider
      value={{
        sidebarVisible,
        toggleSidebar,
        selectedBoardId,
        setSelectedBoardId,
        isBoardEmpty,
        setIsBoardEmpty,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );

  function handleSidebarVisibility(width: number | null, isInitialLoad: boolean) {
    if (width == null) {
      return;
    }
    const canShowSidebar = width >= 768;

    if (isInitialLoad) {
      setIsInitialLoad(false);
      if (canShowSidebar) {
        setSidebarVisible(true);
      }
      return;
    }

    if (!canShowSidebar) {
      setSidebarVisible(false);
    }
  }
};
