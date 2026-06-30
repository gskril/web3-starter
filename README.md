# Web3 Starter

Foundry for contracts, Vite + React + [wagmi](https://wagmi.sh/) for the frontend. Contract ABIs and deployment addresses are generated into `src/generated/contracts.ts` via [@wagmi/cli](https://wagmi.sh/cli).

## Prerequisites

- [Node.js](https://nodejs.org/) 22+
- [pnpm](https://pnpm.io/) 10+
- [Foundry](https://book.getfoundry.sh/getting-started/installation)

## Setup

```shell
git clone --recurse-submodules https://github.com/gskril/web3-starter
cd web3-starter
pnpm install
cp .env.example .env
forge build
```

If you already cloned without submodules: `git submodule update --init --recursive`

## Development

Typical flow when working against a fork:

```shell
# Terminal 1 — fork (set FORK_RPC_URL in .env first)
anvil --fork-url $FORK_RPC_URL

# Terminal 2 — deploy, generate ABIs/addresses, run app
pnpm contracts:deploy
pnpm dev
```

`pnpm dev` runs `wagmi generate` first, which reads Foundry artifacts and the latest broadcast addresses. Import from `@/generated/contracts` in your components — see [docs/development.md](docs/development.md).

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Generate contracts + start Vite |
| `pnpm build` | Generate contracts + production build |
| `pnpm generate` | Regenerate `src/generated/contracts.ts` |
| `pnpm generate:watch` | Regenerate on contract/broadcast changes |
| `forge test` | Run contract tests |
| `forge fmt` | Format Solidity |

## Layout

```
contracts/src/     Solidity source
contracts/script/  Deploy scripts
contracts/out/     Build artifacts (gitignored)
contracts/broadcast/  Deploy records (gitignored)
src/generated/     Generated ABIs + addresses (gitignored)
src/               React app
wagmi.config.ts    wagmi CLI config
```
