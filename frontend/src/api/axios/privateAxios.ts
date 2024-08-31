import axios from "axios";
import { baseUrl } from "../paths";

export const privateAxios = axios.create({
  baseURL: baseUrl, // Puedes configurar variables de entorno en Vite
  withCredentials: true, // Para enviar cookies en solicitudes
});
