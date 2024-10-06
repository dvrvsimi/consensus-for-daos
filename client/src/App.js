import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import consensus from './consensus.json';  // ABI file, not set up yet, would do that after finishing the smart contract

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

  return (
    <div>
      <h1>Voting DApp</h1>
      <p><strong>Proposal:</strong> {proposal}</p>
      <p><strong>Your Account:</strong> {account}</p>
      <button onClick={() => vote(true)}>Vote Yes</button>
      <button onClick={() => vote(false)}>Vote No</button>
      <button onClick={() => vote(false)}>I want to sit this one out</button> // how do we implement this? with vote(false) or with a new function?
      <h2>Results:</h2>
      <p>Yes Votes: {yesVotes}</p>
      <p>No Votes: {noVotes}</p>
    </div>
  );
};

export default App;
