import { useAccount } from 'wagmi'

import { Account } from '@/components/Account'
import { Connect } from '@/components/Connect'

export default function App() {
  const { isConnected } = useAccount()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-950 text-white">
      <h1 className="text-3xl font-bold">web3-starter</h1>
      {isConnected ? <Account /> : <Connect />}
    </main>
  )
}
