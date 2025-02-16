// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18; //Use this 

contract Crowdfunding {
    struct Campaign {
        address payable creator;
        string title;
        string description;
        uint goal;
        uint deadline;
        uint amountCollected;
        bool completed;
        mapping(address => uint) donations;
    }

    uint public campaignCount;
    mapping(uint => Campaign) public campaigns;

    event CampaignCreated(uint campaignId, address creator, string title, uint goal, uint deadline);
    event DonationReceived(uint campaignId, address donor, uint amount);
    event FundsWithdrawn(uint campaignId, uint amount);
    event RefundIssued(uint campaignId, address donor, uint amount);

    // Create a new campaign
    function createCampaign(string memory _title, string memory _description, uint _goal, uint _duration) public {
        require(_goal >= 1000, "Goal must be at least 1000 Wei"); // Allowing very small goals
        // require(_goal > 0, "Goal must be greater than 0.");
        require(_duration > 0, "Duration must be greater than 0.");

        campaignCount++;
        Campaign storage newCampaign = campaigns[campaignCount];
        newCampaign.creator = payable(msg.sender);
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.goal = _goal;
        newCampaign.deadline = block.timestamp + _duration;
        newCampaign.amountCollected = 0;
        newCampaign.completed = false;

        emit CampaignCreated(campaignCount, msg.sender, _title, _goal, newCampaign.deadline);
    }

    // Donate to a campaign
    function donate(uint _campaignId) public payable {
        require(_campaignId > 0 && _campaignId <= campaignCount, "Invalid campaign.");
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp < campaign.deadline, "Campaign has ended.");
        require(msg.value > 0, "Donation must be greater than 0.");

        campaign.donations[msg.sender] += msg.value;
        campaign.amountCollected += msg.value;

        emit DonationReceived(_campaignId, msg.sender, msg.value);
    }

    // Withdraw funds if the campaign is successful
    function withdrawFunds(uint _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.creator, "Only the creator can withdraw funds.");
        require(block.timestamp >= campaign.deadline, "Campaign is still active.");
        require(campaign.amountCollected >= campaign.goal, "Campaign did not reach the goal.");
        require(!campaign.completed, "Funds already withdrawn.");

        campaign.completed = true;
        campaign.creator.transfer(campaign.amountCollected);

        emit FundsWithdrawn(_campaignId, campaign.amountCollected);
    }

    // Refund donors if the campaign failed
    function getRefund(uint _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp >= campaign.deadline, "Campaign is still active.");
        require(campaign.amountCollected < campaign.goal, "Campaign was successful.");
        require(campaign.donations[msg.sender] > 0, "No donations to refund.");

        uint donatedAmount = campaign.donations[msg.sender];
        campaign.donations[msg.sender] = 0;
        payable(msg.sender).transfer(donatedAmount);

        emit RefundIssued(_campaignId, msg.sender, donatedAmount);
    }

    // Get the status of a campaign
    function getCampaignStatus(uint _campaignId) public view returns (string memory) {
        Campaign storage campaign = campaigns[_campaignId];
        if (block.timestamp < campaign.deadline) {
            return "Active";
        } else if (campaign.amountCollected >= campaign.goal) {
            return "Completed";
        } else {
            return "Failed";
        }
    }
}
