
---

# Consensus-for-DAOs Hardhat Project

This project demonstrates the basic setup for deploying and testing a smart contract for DAO governance. The smart contract enables DAO members to vote on proposals securely. The project includes sample tests, deployment scripts, and a Hardhat Ignition module for deploying the contract.

## Features:
- **Smart Contract**: A secure voting mechanism built on Ethereum.
- **Deployment**: Automated deployment using Hardhat Ignition.
- **Testing**: Sample tests for the voting contract.

## How to Use:
1. Clone the repository.
2. Install dependencies using:
   ```shell
   npm install
   ```
3. Compile the contract:
   ```shell
   npx hardhat compile
   ```
4. Deploy the contract:
   ```shell
   npx hardhat ignition deploy ./ignition/modules/Lock.js
   ```
5. Run tests:
   ```shell
   npx hardhat test
   ```

## Available Tasks:
- **Help**: Get an overview of available tasks:
   ```shell
   npx hardhat help
   ```
- **Test**: Run the contract tests:
   ```shell
   npx hardhat test
   ```
- **Gas Report**: Run tests with gas usage reporting:
   ```shell
   REPORT_GAS=true npx hardhat test
   ```
- **Start Local Node**: Run a local Hardhat node:
   ```shell
   npx hardhat node
   ```

---