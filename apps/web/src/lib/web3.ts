import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { createConfig, http } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'

const WALLETCONNECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_ID

if (!WALLETCONNECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_WALLETCONNECT_ID')
}

const { connectors } = getDefaultWallets({
  appName: '',
  projectId: WALLETCONNECT_ID,
})

const chains = [base, mainnet] as const

export const wagmiConfig = createConfig({
  chains,
  connectors,
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
  },
})
