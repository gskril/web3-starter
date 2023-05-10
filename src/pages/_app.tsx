import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import PlausibleProvider from 'next-plausible'
import type { AppProps } from 'next/app'
import { WagmiConfig } from 'wagmi'

import { chains, wagmiConfig } from '@/providers'
import '@/styles/style.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="example.com" trackOutboundLinks>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} modalSize="compact">
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </PlausibleProvider>
  )
}
