import '../styles/globals.scss'
import PlausibleProvider from 'next-plausible'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="example.com" trackOutboundLinks>
      <Component {...pageProps} />
    </PlausibleProvider>
  )
}
