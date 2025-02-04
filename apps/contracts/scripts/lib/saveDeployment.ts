import fs from 'fs'
import path from 'path'
import { Contract } from 'ethers'

export interface DeploymentData {
  address: string
  abi: any
  constructorArguments?: any[]
  chainId: number
  deploymentDate: string
}

export async function saveDeployment(
  contract: Contract,
  chainId: number,
  constructorArguments?: any[]
) {
  const deploymentData: DeploymentData = {
    address: await contract.getAddress(),
    abi: contract.interface.format(),
    constructorArguments,
    chainId,
    deploymentDate: new Date().toISOString(),
  }

  const deploymentsDir = path.join(__dirname, '../../deployments')
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true })
  }

  const chainDir = path.join(deploymentsDir, chainId.toString())
  if (!fs.existsSync(chainDir)) {
    fs.mkdirSync(chainDir, { recursive: true })
  }

  const contractName = await contract.name?.() || 'Contract'
  const filePath = path.join(chainDir, `${contractName}.json`)

  fs.writeFileSync(filePath, JSON.stringify(deploymentData, null, 2))
  console.log(`Deployment data saved to ${filePath}`)
}