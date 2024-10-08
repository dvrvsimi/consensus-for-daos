const { ethers } = require("hardhat");

async function main() {
  const Consensus = await ethers.getContractFactory("Consensus");

  const proposal = "Should we adopt the new protocol upgrade?"; // Example proposal
  const quorum = 5; // Example quorum value

  const consensus = await Consensus.deploy(proposal, quorum);

  // await consensus.deployed();

  console.log("Consensus contract deployed to:", consensus.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
