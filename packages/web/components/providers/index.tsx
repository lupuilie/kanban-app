import { DashboardContextProvider } from './dashboard-context';
import { QueryClientProvider } from './query-client-provider';
import { ThemeProvider } from './theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider>
        <QueryClientProvider>
          <DashboardContextProvider>{children}</DashboardContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
