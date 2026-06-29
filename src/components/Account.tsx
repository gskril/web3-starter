import { useAccount, useDisconnect, useEnsName } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-mono text-sm text-zinc-300">{ensName ?? address}</p>
      <button
        onClick={() => disconnect()}
        className="rounded-md bg-zinc-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-600"
      >
        Disconnect
      </button>
    </div>
  )
}
