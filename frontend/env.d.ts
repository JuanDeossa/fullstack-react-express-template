interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // Agrega aquí otras variables de entorno que estés usando.
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
