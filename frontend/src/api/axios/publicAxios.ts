import axios from "axios";
import { baseUrl } from "../paths";

export const publicAxios = axios.create({
  baseURL: baseUrl, // Puedes configurar variables de entorno en Vite
  withCredentials: false, // No envía cookies por defecto
});
