import axios from "axios";
import { paths } from "../paths";

export const privateAxios = axios.create({
  baseURL: paths.base, // Puedes configurar variables de entorno en Vite
  withCredentials: true, // Para enviar cookies en solicitudes
});
