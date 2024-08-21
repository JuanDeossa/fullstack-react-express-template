import axios from "axios";
import { paths } from "../paths";

export const publicAxios = axios.create({
  baseURL: paths.base, // Puedes configurar variables de entorno en Vite
  withCredentials: false, // No envía cookies por defecto
});
