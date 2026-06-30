import { defineConfig } from '@wagmi/cli'
import { foundry, foundryDefaultExcludes } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/generated/contracts.ts',
  contracts: [],
  plugins: [
    foundry({
      project: '.',
      artifacts: 'contracts/out',
      includeBroadcasts: true,
      exclude: [...foundryDefaultExcludes, 'IMulticall3.sol/**'],
      forge: {
        build: true,
      },
    }),
  ],
})
