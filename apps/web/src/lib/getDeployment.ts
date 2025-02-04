import fs from 'fs'
import path from 'path'

export interface DeploymentData {
  address: string
  abi: any
  constructorArguments?: any[]
  chainId: number
  deploymentDate: string
}

export function getDeployment(chainId: number, contractName: string): DeploymentData {
  const deploymentsPath = path.join(process.cwd(), '../contracts/deployments', chainId.toString(), `${contractName}.json`)
  
  if (!fs.existsSync(deploymentsPath)) {
    throw new Error(`No deployment found for contract ${contractName} on chain ${chainId}`)
  }

  const deploymentData = JSON.parse(fs.readFileSync(deploymentsPath, 'utf-8'))
  return deploymentData
}