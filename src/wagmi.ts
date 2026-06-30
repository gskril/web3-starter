import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

const anvil = {
  id: 31337,
  name: 'Anvil',
  nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
  rpcUrls: {
    default: {
      http: [import.meta.env.VITE_ANVIL_RPC_URL ?? 'http://127.0.0.1:8545'],
    },
  },
} as const

export const config = createConfig({
  chains: [anvil, sepolia],
  connectors: [injected()],
  transports: {
    [anvil.id]: http(),
    [sepolia.id]: http(import.meta.env.VITE_SEPOLIA_RPC_URL),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
