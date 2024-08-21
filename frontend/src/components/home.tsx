import { useState } from "react";
import { Client } from "../types/client";
import { useAuth } from "../hooks/useAuth";
import { getClients } from "../api/services";
import { logoutService } from "../api/services";

export const Home = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const handleRefreshClients = async () => {
    const clients = await getClients();
    if (clients) {
      setClients(clients);
    }
  };

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    const success = await logoutService();

    if (!success) return;

    logout();
  };

  if (!user) return null;

  return (
    <div className="home min-h-screen bg-indigo-200 grid place-content-center">
      <h1 className="text-xl font-bold">{user.email}</h1>
      <button
        type="button"
        className="border bg-indigo-600 text-white mt-4 rounded-md p-1"
        onClick={handleRefreshClients}
      >
        Listar clientes
      </button>
      {clients &&
        clients.map((client) => {
          return <div key={client.id}>{client.name}</div>;
        })}
      <button
        type="button"
        className="border bg-indigo-600 text-white p-2 rounded-lg mt-10"
        onClick={handleLogout}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};
