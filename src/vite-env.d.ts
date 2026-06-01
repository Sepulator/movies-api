interface ImportMetaEnv {
  readonly VITE_APP_KEY: string;
  readonly VITE_STALE_TIME: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
