import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [yesVotes, setYesVotes] = useState(0);
  const [noVotes, setNoVotes] = useState(0);
  const [proposal, setProposal] = useState("");
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(""); // error state

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    try {
      setLoading(true);
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const networkId = await web3.eth.net.getId();
      const networkData = consensus.networks[networkId];

      if (networkData) {
        const contract = new web3.eth.Contract(
          consensus.abi,
          networkData.address
        );
        setContract(contract);

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const proposal = await contract.methods.proposal().call();
        setProposal(proposal);

        const results = await contract.methods.getResults().call();
        setYesVotes(results[0]);
        setNoVotes(results[1]);
      } else {
        setError("smart contract not deployed to detected network.");
      }
    } catch (err) {
      console.error(err);
      setError("failed to load blockchain data.");
    } finally {
      setLoading(false); // end loading
    }
  };

  const vote = async (voteYes) => {
    try {
      setLoading(true);
      await contract.methods.vote(voteYes).send({ from: account });
      loadBlockchainData();
    } catch (err) {
      console.error(err);
      setError("voting unsuccessful, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // define abstain function
  const abstain = async () => {
    try {
      setLoading(true);
      // Add logic to handle abstainers that want to sit the proposal round out
      await contract.methods.voteNull().send({ from: account });
      loadBlockchainData(); // to reload the data after a vote
    } catch (err) {
      console.error(err);
      setError("abstaining unsuccessful, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Router>
        {/* Adding Navbar to be visible on all pages */}
        <Routes>
          <Route path="/" element={<LandingPage onClick={handleClick} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
