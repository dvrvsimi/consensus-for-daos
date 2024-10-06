// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


// Consensus is a contract that allows governing members of a DAO to vote on a proposal.
contract Consensus {
    string public proposal; // The proposal that is being voted on, has to be a polar question.
    mapping(address => bool) public hasVoted;
    uint public yesVotes;
    uint public noVotes;

    constructor(string memory _proposal) {
        proposal = _proposal;
    }

    function vote(bool _voteYes) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        hasVoted[msg.sender] = true;

        if (_voteYes) {
            yesVotes++;
        } else {
            noVotes++;
        }
    }

    function getResults() public view returns (uint _yesVotes, uint _noVotes) {
        return (yesVotes, noVotes);
    }
}
