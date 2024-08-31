import { logoutService } from "../../api/services";
import { useAuth } from "../../hooks/useAuth";

export const AppHeader = () => {
  //
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    const success = await logoutService();

    if (!success) return;

    logout();
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-indigo-400 h-16 flex items-center justify-between px-3">
      <h1 className="text-xl font-bold">{user?.email}</h1>
      <button
        type="button"
        className="font-semibold underline"
        onClick={handleLogout}
      >
        Cerrar Sesión
      </button>
    </header>
  );
};
