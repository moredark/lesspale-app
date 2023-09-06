/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLIENT_ID: string;
  readonly VITE_REDIRECT_URL: string;
  readonly VITE_CLIENT_SECRET: string;
  readonly VITE_BACKEND_URL: string;
  readonly VITE_CLIENT_ID_BACKEND: string;
  readonly VITE_CLIENT_SECRET_BACKEND: string;
  readonly VITE_WEBSOCKET_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
