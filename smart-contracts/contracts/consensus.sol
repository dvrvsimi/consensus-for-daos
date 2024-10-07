// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


// Consensus is a contract that allows governing members of a DAO to vote on a proposal.
contract Consensus {
    string public proposal; // the proposal that is being voted on, has to be a polar question.
    uint public quorum; // the minimum number of votes required to reach a decision
    mapping(address => bool) public hasVoted;
    mapping(address => bool) public eligibleVoters;
    uint public voteYes;
    uint public voteNo;
    uint public voteNull;
    uint public totalVotes;
    

    uint constant MIN_BALANCE = 1 ether; // minimum balance required to vote, can always be changed

    constructor(string memory _proposal, uint _quorum) {
        proposal = _proposal;
        quorum = _quorum;
    }


    modifier onlyEligibleVoters() {
        require(msg.sender.balance >= 1 ether, "You must have at least 1 ETH to vote.");
        require(!hasVoted[msg.sender], "You have already voted.");
        _;
    }


    function updateEligibility() public {
        if (msg.sender.balance >= 1 ether) { // restrict voting to members who have contributed to the do, replace 1 eth with dao token
            eligibleVoters[msg.sender] = true; 
        } else {
            eligibleVoters[msg.sender] = false;
        }
    }



    function vote(bool _voteYes) public onlyEligibleVoters{
        require(!hasVoted[msg.sender], "You have already voted.");
        require(eligibleVoters[msg.sender], "You are not allowed to vote.");

        hasVoted[msg.sender] = true;
        totalVotes++;

        if (_voteYes) {
            voteYes++;
        } else {
            voteNo++;
        }
    }

    // Function for participants who wish to abstain from voting, there should be a way to integrate this into the if-else statement in vote()
    function voteNullify() public {
        require(!hasVoted[msg.sender], "You have already voted.");
        hasVoted[msg.sender] = true;
        voteNull++; // we actuaally need to know the number of abstainers, changing it in app.js too
    }


    
    function getResults() public view returns (uint _voteYes, uint _voteNo) {
        return (voteYes, voteNo);
    }

    function finalizeVote() public view returns (string memory) {
        require(voteYes + voteNo + voteNull >= quorum, "Quorum not reached.");
        if (voteYes > voteNo) {
            return "Proposal approved.";
        } else if (voteYes == voteNo) {
            return "Proposal tied.";
        } else if (voteNull > voteYes) { // obviously not a good poll if this happens
            return "Proposal invalid.";
        } else {
            return "Proposal rejected.";
        }
    }
}
