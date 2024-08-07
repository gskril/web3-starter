import hre from 'hardhat'
import { Hex } from 'viem'
import { encodePacked, keccak256 } from 'viem/utils'

export async function getInitCode(name: string, encodedArgs: Hex) {
  const { bytecode } = await hre.artifacts.readArtifact(name)

  const initCode = encodePacked(
    ['bytes', 'bytes'],
    [bytecode as Hex, encodedArgs]
  )
  const initCodeHash = keccak256(initCode)

  return { initCode, initCodeHash }
}
