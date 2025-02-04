# Web3 Monorepo Template

This is an opinionated monorepo template for web3 projects. It uses Hardhat for [smart contracts](./apps/contracts/README.md) and Next.js for the [web app](./apps/web/README.md).

## Contract Deployments

When contracts are deployed, their deployment data (address, ABI, constructor arguments) is automatically saved to the `apps/contracts/deployments/{chainId}/` directory. This data can be accessed from the web app using the `getDeployment` helper function:

```typescript
import { getDeployment } from '@/lib/getDeployment'

// Get deployment data for a contract on a specific chain
const { address, abi } = getDeployment(chainId, 'Contract')
```
