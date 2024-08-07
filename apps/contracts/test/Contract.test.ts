import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'

const deploy = async () => {
  const contract = await hre.viem.deployContract('Contract', [
    'Contract', // _name
  ])

  return { contract }
}

describe('Tests', function () {
  it('should return the contract name', async function () {
    const { contract } = await loadFixture(deploy)

    const contractName = await contract.read.name()
    expect(contractName).to.equal('Contract')
  })
})
