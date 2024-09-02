import { privateAxios } from "../axios";
import { refreshTokenService } from "../services";

let currentToken: string | null = null;

const setToken_ = (token: string | null) => {
  currentToken = token;
};

const getToken_ = () => {
  return currentToken;
};

// Esta función configura los interceptores de Axios
export const setupInterceptors = (
  getToken: () => string | null,
  updateToken: (token: string | null) => void
) => {
  privateAxios.interceptors.request.use((config) => {
    const token1 = getToken_();
    const token2 = getToken();

    const token = token1 || token2;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  });

  privateAxios.interceptors.response.use(
    (response) => {
      if (response.status === 200 && response.data.code === "LOGOUT_SUCCESS") {
        setToken_(null);
        updateToken(null);
        window.location.href = "/";
      }

      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response.status === 401 &&
        error.response.data.code !== "INVALID_REFRESH_TOKEN" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        const user = await refreshTokenService();

        if (!user) {
          // Limpiar el token y redirigir al login si el refresh token falla
          setToken_(null);
          updateToken(null); // Actualiza el estado en tu aplicación

          // Redirigir al usuario al login o manejar el error
          window.location.href = "/"; // Redirige al login o maneja de otra forma
          return Promise.reject();
        }

        const { token } = user;

        originalRequest.headers["Authorization"] = `Bearer ${token}`;

        // Actualiza el estado del contexto y el token global
        updateToken(token);
        setToken_(token);

        // Reintenta la solicitud original con el nuevo token
        return privateAxios(originalRequest);
      }

      return Promise.reject(error);
    }
  );
};
