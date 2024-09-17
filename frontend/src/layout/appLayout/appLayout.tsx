import { AppHeader } from "@/components";
import { ThemeProvider } from "@/context/theme-provider";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  //
  return (
    <div className="AppLayout">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppHeader />
        <section className="pt-20 px-10">{children}</section>
      </ThemeProvider>
    </div>
  );
};
