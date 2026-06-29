import { useConnect } from 'wagmi'

export function Connect() {
  const { connectors, connect, status, error } = useConnect()

  return (
    <div className="flex flex-col items-center gap-3">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
        >
          Connect {connector.name}
        </button>
      ))}
      {status === 'pending' && (
        <p className="text-sm text-zinc-400">Connecting…</p>
      )}
      {error && <p className="text-sm text-red-400">{error.message}</p>}
    </div>
  )
}
