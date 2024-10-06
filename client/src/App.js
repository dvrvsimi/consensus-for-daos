import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import consensus from '.artifacts/contracts/consensus.sol/Consensus.json';  // from running npx hardhat compile

const App = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [yesVotes, setYesVotes] = useState(0);
  const [noVotes, setNoVotes] = useState(0);
  const [proposal, setProposal] = useState('');

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    const networkId = await web3.eth.net.getId();
    const networkData = consensus.networks[networkId];

    if (networkData) {
      const contract = new web3.eth.Contract(consensus.abi, networkData.address);
      setContract(contract);

      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const proposal = await contract.methods.proposal().call();
      setProposal(proposal);

      const results = await contract.methods.getResults().call();
      setYesVotes(results[0]);
      setNoVotes(results[1]);
    } else {
      alert('Smart contract not deployed to detected network.');
    }
  };

  const vote = async (voteYes) => {
    await contract.methods.vote(voteYes).send({ from: account });
    loadBlockchainData(); // Update vote counts after transaction
  };
  // define abstain function
  const abstain = async () => {
    // Add logic to handle abstainers that want to sit the proposal round out
    await contract.methods.voteNull().send({ from: account }); // Assuming you have a method for abstaining in your smart contract
    loadBlockchainData();
  };

  return (
    <div>
      <h1>Voting DApp</h1>
      <p><strong>Proposal:</strong> {proposal}</p>
      <p><strong>Your Account:</strong> {account}</p>
      <button onClick={() => vote(true)}>Vote Yes</button>
      <button onClick={() => vote(false)}>Vote No</button>
      <button onClick={abstain}>Abstain</button>

      <h2>Results:</h2>
      <p>Yes Votes: {yesVotes}</p>
      <p>No Votes: {noVotes}</p>
      <p>No Votes: {noVotes}</p>
    </div>
  );
};

export default App;
