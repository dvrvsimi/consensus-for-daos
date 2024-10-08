import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import ProposalsPage from "./pages/proposalsPage/ProposalsPage";
import VotePage from "./pages/votePage/VotePage";
import Web3 from "web3";
import consensus from "./smartcontracts/Consensus.json";

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

  const [redirect, setRedirect] = useState(false);
  const [redirect2, setRedirect2] = useState(false); //redirect2 ==== redirect to homepage based on logout
  const [redirect3, setRedirect3] = useState(false);

  // Reset redirect states after they have caused navigation
  useEffect(() => {
    if (redirect) {
      setRedirect(false);
    }
    if (redirect2) {
      setRedirect2(false);
    }
    if (redirect3) {
      setRedirect3(false);
    }
  }, [redirect, redirect2, redirect3]);

  const handleClick = () => {
    setRedirect(true); // Set redirect state to true when button is clicked
  };

  const handleLogout = () => {
    setRedirect2(true);
  };

  const handleVote = () => {
    setRedirect3(true);
  };

  const assumedCardTitle = "The Vote Title";
  const assumedCardDescription = "The description";

  return (
    <div>
      <Router>
        {/* Adding Navbar to be visible on all pages */}
        <Routes>
          <Route
            exact
            path="/vote"
            element={
              redirect2 ? (
                <Navigate to="/" /> // Redirect when state is true
              ) : (
                <VotePage onClick={handleLogout} />
              )
            }
          />

          <Route
            exact
            path="/proposals"
            element={
              redirect3 ? (
                <Navigate to="/vote" /> // Redirect when state is true
              ) : redirect2 ? (
                <Navigate to="/" /> // Redirect when state is true
              ) : (
                <ProposalsPage
                  onClick={handleLogout}
                  onClickVote={handleVote}
                  assumedCardTitle={assumedCardTitle}
                  assumedCardDescription={assumedCardDescription}
                />
              )
            }
          />
          <Route
            exact
            path="/"
            element={
              redirect ? (
                <Navigate to="/proposals" /> // Redirect when state is true
              ) : (
                <LandingPage onClick={handleClick} />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
