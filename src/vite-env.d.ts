/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANVIL_RPC_URL?: string
  readonly VITE_SEPOLIA_RPC_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
