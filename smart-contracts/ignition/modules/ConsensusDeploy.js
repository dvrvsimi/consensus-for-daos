const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ConsensusDeploy", (m) => {
  const proposal = "Should we adopt the new protocol upgrade?"; // Modify as needed
  const quorum = 5; // Example quorum

  const consensus = m.contract("Consensus", [proposal, quorum]);

  return { consensus };
});
