import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createClient } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_ID || ''

export const { chains, provider } = configureChains(
  [mainnet, goerli],
  [alchemyProvider({ apiKey: ALCHEMY_ID }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Web3 Starter',
  chains,
})

export const wagmiClientConfig = {
  autoConnect: true,
  connectors,
  provider,
}

export const wagmiClient = createClient(wagmiClientConfig)
