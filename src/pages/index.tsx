import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import { useAccount, useEnsAddress, useEnsName } from 'wagmi'

import { Footer } from '@/components/Footer'
import { Nav } from '@/components/Nav'
import { Container, Layout } from '@/components/atoms'
import { useIsMounted } from '@/hooks/useIsMounted'

export default function Home() {
  const isMounted = useIsMounted() // Prevent Next.js hydration errors
  const { address } = useAccount() // Get the user's connected wallet address

  const { data: ensName } = useEnsName({
    address,
    chainId: 1, // We always want to use ETH mainnet for ENS lookups
  })

  return (
    <>
      <Head>
        <title>Web3 Starter</title>
        <meta name="description" content="" />

        <meta property="og:image" content="" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
      </Head>

      <Layout>
        <Nav />

        <Container
          as="main"
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <h1>Web3 Starter</h1>
          <p>
            This template lays the groundwork needed to build a website that
            interacts with EVM-compatible blockchains like Ethereum.
          </p>

          {/* If the page is hydrated and the user is connected, show their address */}
          {isMounted && address ? (
            <p>Connected with {ensName ?? address}</p>
          ) : (
            <ConnectButton />
          )}
        </Container>

        <Footer />
      </Layout>
    </>
  )
}
