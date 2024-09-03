import { AppHeader } from "@/components";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  //
  return (
    <div className="AppLayout">
      <AppHeader />
      <section className="pt-16">{children}</section>
    </div>
  );
};
