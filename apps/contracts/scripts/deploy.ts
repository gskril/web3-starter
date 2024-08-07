import hre from 'hardhat'
import { encodeAbiParameters } from 'viem/utils'

import { generateSaltAndDeploy } from './lib/create2'

async function main() {
  const contractName = 'Contract'

  const constructorArguments = [
    'Contract', // _name
  ] as const

  const encodedArgs = encodeAbiParameters(
    [{ type: 'string' }],
    constructorArguments
  )

  const { address } = await generateSaltAndDeploy({
    vanity: '0x000',
    encodedArgs,
    contractName,
    caseSensitive: false,
    startingIteration: 0,
  })

  console.log(`Deployed ${contractName} to ${address}`)

  try {
    // Wait 30 seconds for block explorers to index the deployment
    await new Promise((resolve) => setTimeout(resolve, 30_000))
    await hre.run('verify:verify', { address, constructorArguments })
  } catch (error) {
    console.error(error)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
