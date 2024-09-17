import { logoutService } from "../../api/services";
import { useAuth } from "../../hooks/useAuth";
import { ThemeToggle } from "../themeToggle/themeToggle";

export const AppHeader = () => {
  //
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    const success = await logoutService();

    if (!success) return;

    logout();
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-10 border-b border-b-gray-400">
      <h1 className="text-xl font-bold">{user?.email}</h1>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          type="button"
          className="font-semibold underline"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};
