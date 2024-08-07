import hre from 'hardhat'
import { Hex, getContractAddress, parseAbi, toHex } from 'viem'

import { getInitCode } from './initcode'

type GenerateSaltProps = {
  vanity: Hex
  initCode: Hex
  caseSensitive?: boolean
  startingIteration?: number
}

// https://github.com/pcaversaccio/create2deployer
const create2Factory = {
  address: '0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2',
  abi: parseAbi([
    'event Deployed(address addr)',
    'function deploy(uint256 value, bytes32 salt, bytes memory code) public',
    'function computeAddress(bytes32 salt, bytes32 codeHash) public view returns (address)',
  ]),
} as const

/**
 * Generate a salt that will deploy a smart contract with a vanity address using CREATE2.
 *
 * @param vanity The first few characters of the address you want to generate.
 * @param initCode The bytecode of the smart contract you want to deploy, including the constructor arguments.
 * @param initCodeHash The keccak256 hash of the initCode.
 * @param caseSensitive Whether the vanity part of the address is case sensitive.
 * @param startingIteration The starting iteration to generate the salt from. Useful for resuming a previous search.
 */
async function generateCreate2Salt({
  vanity,
  initCode,
  caseSensitive = false,
  startingIteration = 0,
}: GenerateSaltProps) {
  let tries = startingIteration

  while (true) {
    const salt = toHex(tries, { size: 32 })

    const expectedAddress = getContractAddress({
      bytecode: initCode,
      from: create2Factory.address,
      opcode: 'CREATE2',
      salt,
    })

    if (caseSensitive) {
      if (expectedAddress.startsWith(vanity)) {
        return { salt, expectedAddress }
      }
    } else {
      if (expectedAddress.toLowerCase().startsWith(vanity)) {
        return { salt, expectedAddress }
      }
    }

    if (tries % 1000 === 0) {
      console.log(`Tries: ${tries}`)
    }

    tries++
  }
}

export async function generateSaltAndDeploy({
  vanity,
  contractName,
  encodedArgs,
  caseSensitive,
  startingIteration,
}: Omit<GenerateSaltProps, 'initCode'> & {
  contractName: string
  encodedArgs: Hex
}) {
  const publicClient = await hre.viem.getPublicClient()
  const walletClients = await hre.viem.getWalletClients()
  const walletClient = walletClients[0]

  const { initCode } = await getInitCode(contractName, encodedArgs)

  const { salt, expectedAddress } = await generateCreate2Salt({
    vanity,
    initCode,
    caseSensitive,
    startingIteration,
  })

  const deployTx = await walletClient.writeContract({
    ...create2Factory,
    functionName: 'deploy',
    args: [0n, salt, initCode],
  })

  await publicClient.waitForTransactionReceipt({ hash: deployTx })

  return { salt, address: expectedAddress }
}
