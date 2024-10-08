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
import { ethers } from "ethers";

// Import your contract's ABI
import contractABI from "./utils/ContractABI.json"; // Update this path
const contractAddress = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";

const App = () => {
  const [redirect, setRedirect] = useState(false);
  const [redirect2, setRedirect2] = useState(false); //redirect2 ==== redirect to homepage based on logout
  const [redirect3, setRedirect3] = useState(false);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [proposals, setProposals] = useState(null);

  useEffect(() => {
    const init = async () => {
      // Connect to MetaMask
      if (window.ethereum) {
        const _provider = new ethers.BrowserProvider(window.ethereum);
        const _signer = _provider.getSigner();
        const _contract = new ethers.Contract(
          contractAddress,
          contractABI,
          _signer
        );

        setProvider(_provider);
        setSigner(_signer);
        setContract(_contract);
      } else {
        alert("Please install MetaMask!");
      }
    };

    init();
  }, []);

  // console.log("cont", contract);

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

  const handleClick = async () => {
    // Connect to MetaMask
    if (window.ethereum) {
      const _provider = new ethers.BrowserProvider(window.ethereum);
      const _signer = _provider.getSigner();
      const _contract = new ethers.Contract(
        contractAddress,
        contractABI,
        _signer
      );

      setProvider(_provider);
      setSigner(_signer);
      setContract(_contract);
      setRedirect(true);
      console.log("ee", contract);
    } else {
      alert("Please install MetaMask!");
    }
    // Set redirect state to true when button is clicked
  };

  const handleLogout = () => {
    setRedirect2(true);
  };

  // Fetch proposals from the contract
  const fetchProposals = async () => {
    if (contract) {
      const proposalsData = await contract.eligibleVoters(); // Replace with your method to fetch proposals

      console.log("pro", proposalsData);
      setProposals(proposalsData);
    }
  };

  // Call this when navigating to ProposalsPage
  useEffect(() => {
    if (redirect) {
      fetchProposals();
    }
  }, [redirect, contract]);

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
