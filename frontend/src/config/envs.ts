export const envs = {
  EMAIL: import.meta.env.VITE_EMAIL || "",
  PASSWORD: import.meta.env.VITE_PASSWORD || "",
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "",
  DEVTOOL_CREATE_USERS_RATE_LIMIT:
    import.meta.env.VITE_DEVTOOL_CREATE_USERS_RATE_LIMIT || 100,
  ALLOW_DEVTOOLS: import.meta.env.VITE_ALLOW_DEVTOOLS === "true" || false,
};
