/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_AMAP_SECURITY: string;
  readonly VITE_AMAP_KEY: string;
  readonly VITE_BASE_API: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  _AMapSecurityConfig: {
    securityJsCode: string;
  };
}