# Development

## Fork workflow

Most development happens against an Anvil fork, not a blank chain.

1. Set `FORK_RPC_URL` in `.env` (e.g. a mainnet or Sepolia RPC).
2. Start Anvil:

```shell
anvil --fork-url $FORK_RPC_URL
```

3. Deploy contracts to the fork:

```shell
pnpm contracts:deploy
```

This runs `forge script` against the `anvil` RPC endpoint (`http://127.0.0.1:8545` by default). Broadcast data is written to `contracts/broadcast/` (gitignored).

4. Regenerate the frontend bindings:

```shell
pnpm generate
```

Run this after contract changes or deploys — not on every `pnpm dev`.

5. Start the app:

```shell
pnpm dev
```

6. Connect your wallet to `http://127.0.0.1:8545`, chain ID **31337**.

Use `pnpm generate:watch` in a separate terminal if you want regeneration while editing contracts.

### Chain ID

Anvil defaults to chain ID `31337`. The wagmi config expects this. If you start Anvil with a different chain ID (e.g. `anvil --fork-url $FORK_RPC_URL --chain-id 1`), update `src/wagmi.ts` to match.

## Generated contracts

`pnpm generate` writes `src/generated/contracts.ts` with typed ABIs and addresses from Foundry broadcasts. When you add or change contracts in `contracts/src/`, re-run generate — no wagmi config changes needed.

After a deploy, the file exports addresses keyed by chain ID:

```typescript
import { counterAbi, counterAddress } from '@/generated/contracts'
import { useReadContract } from 'wagmi'

useReadContract({
  abi: counterAbi,
  address: counterAddress[31337],
  functionName: 'number',
})
```

If a contract hasn't been deployed yet, its address export won't exist until you deploy and regenerate.

## Testnet deploy

For Sepolia (or another network) without a fork:

```shell
forge script contracts/script/Counter.s.sol:CounterScript \
  --rpc-url sepolia \
  --broadcast \
  --verify
```

Then run `pnpm generate` to pick up the new addresses. Add the network to `src/wagmi.ts` if it isn't there already.

## Environment variables

See [`.env.example`](../.env.example). Copy to `.env` and fill in values. Never commit `.env`.

| Variable | Used by |
|----------|---------|
| `FORK_RPC_URL` | `anvil --fork-url` |
| `ETH_PRIVATE_KEY` | Foundry deploy scripts (`--broadcast`) |
| `ANVIL_RPC_URL` | `pnpm contracts:deploy`, Foundry `anvil` RPC alias |
| `SEPOLIA_RPC_URL` | Foundry `sepolia` RPC alias |
| `VITE_ANVIL_RPC_URL` | Frontend wallet RPC |
| `VITE_SEPOLIA_RPC_URL` | Frontend wallet RPC |
