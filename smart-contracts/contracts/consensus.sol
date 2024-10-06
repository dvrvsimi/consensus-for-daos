// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


// Consensus is a contract that allows governing members of a DAO to vote on a proposal.
contract Consensus {
    string public proposal; // The proposal that is being voted on, has to be a polar question.
    mapping(address => bool) public hasVoted;
    uint public voteYes;
    uint public voteNo;
    uint public voteNull;

    constructor(string memory _proposal) {
        proposal = _proposal;
    }

    function vote(bool _voteYes) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        hasVoted[msg.sender] = true;

        if (_voteYes) {
            voteYes++;
        } else {
            voteNo++;
        }
    }

    // Function for participants who wish to abstain from voting
    function voteNullify() public {
        require(!hasVoted[msg.sender], "You have already voted.");
        hasVoted[msg.sender] = true;
        voteNull++; // we actuaally need to know the number of abstainers, changing it in app.js too
    }

    function getResults() public view returns (uint _voteYes, uint _voteNo) {
        return (voteYes, voteNo);
    }
}
