import '@nomicfoundation/hardhat-toolbox-viem'
import '@nomicfoundation/hardhat-verify'
import 'dotenv/config'
import { HardhatUserConfig } from 'hardhat/config'

const DEPLOYER_KEY = process.env.DEPLOYER_KEY
const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY

if (!DEPLOYER_KEY) throw new Error('DEPLOYER_KEY must be set')
if (!BASESCAN_API_KEY) throw new Error('BASESCAN_API_KEY must be set')

const config: HardhatUserConfig = {
  networks: {
    base: {
      url: 'https://mainnet.base.org',
      accounts: [DEPLOYER_KEY],
    },
    baseSepolia: {
      url: 'https://sepolia.base.org',
      accounts: [DEPLOYER_KEY],
    },
    localhost: {
      accounts: [DEPLOYER_KEY],
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.21',
        settings: {
          optimizer: {
            enabled: true,
            runs: 100000,
          },
        },
      },
    ],
  },
  etherscan: {
    apiKey: {
      base: BASESCAN_API_KEY,
      baseSepolia: BASESCAN_API_KEY,
    },
  },
  paths: {
    sources: './src',
  },
}

export default config
