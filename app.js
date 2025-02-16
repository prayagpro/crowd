// Contract Address and ABI
const contractAddress = "0x69A3776f2ae978c3435896b55168954BFDf804Da";
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "campaignId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "goal",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "CampaignCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_goal",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_duration",
				"type": "uint256"
			}
		],
		"name": "createCampaign",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_campaignId",
				"type": "uint256"
			}
		],
		"name": "donate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "campaignId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "DonationReceived",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "campaignId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundsWithdrawn",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_campaignId",
				"type": "uint256"
			}
		],
		"name": "getRefund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "campaignId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RefundIssued",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_campaignId",
				"type": "uint256"
			}
		],
		"name": "withdrawFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "campaignCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "campaigns",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "goal",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountCollected",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_campaignId",
				"type": "uint256"
			}
		],
		"name": "getCampaignStatus",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let web3;
let crowdfunding;

window.onload = async function() {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            crowdfunding = new web3.eth.Contract(contractABI, contractAddress);
            console.log("Connected to MetaMask");

            // Check if connected to Sepolia
            const networkId = await web3.eth.net.getId();
            if (networkId !== 11155111) { // Sepolia's network ID
                alert("Please switch to the Sepolia network in MetaMask.");
            }
        } catch (error) {
            console.error("MetaMask connection failed:", error);
        }
    } else {
        alert("MetaMask not found. Please install it to use this DApp.");
    }
};

// Create Campaign
async function createCampaign() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const goal = web3.utils.toWei(document.getElementById("goal").value, "ether"); // Convert to wei
    const duration = document.getElementById("duration").value;

    if (!title || !description || !goal || !duration) {
        alert("Please fill all fields.");
        return;
    }

    // New validation to check if the goal is greater than 0
    if (goal <= 0) {
        alert("Goal must be greater than 0");
        return;
    }

    try {
        const accounts = await web3.eth.getAccounts();
        await crowdfunding.methods.createCampaign(title, description, goal, duration)
            .send({ from: accounts[0] });
        alert("Campaign Created!");
    } catch (error) {
        console.error("Campaign creation failed:", error);
    }
}

// Donate to Campaign
async function donate() {
    const campaignId = document.getElementById("campaignId").value;
    const amount = document.getElementById("amount").value;

    if (!campaignId || !amount) {
        alert("Please fill all fields.");
        return;
    }

    try {
        const accounts = await web3.eth.getAccounts();
        const weiAmount = web3.utils.toWei(amount, "ether");
        await crowdfunding.methods.donate(campaignId).send({ from: accounts[0], value: weiAmount });
        // await crowdfunding.methods.donate(campaignId)
        //     .send({ from: accounts[0], value: web3.utils.toWei(amount, "ether") });
        alert("Donation Successful!");
    } catch (error) {
        console.error("Donation failed:", error);
    }

    await crowdfunding.methods.donate(campaignId).send({
        from: accounts[0],
        value: weiAmount,
        gas: 500000  // Increase this value
    });
}

// Withdraw Funds
async function withdrawFunds() {
    const campaignId = document.getElementById("withdrawCampaignId").value;

    if (!campaignId) {
        alert("Please provide a campaign ID.");
        return;
    }

    try {
        const accounts = await web3.eth.getAccounts();
        await crowdfunding.methods.withdrawFunds(campaignId)
            .send({ from: accounts[0] });
        alert("Funds Withdrawn!");
    } catch (error) {
        console.error("Withdrawal failed:", error);
    }
}

// Get Refund
async function getRefund() {
    const campaignId = document.getElementById("refundCampaignId").value;

    if (!campaignId) {
        alert("Please provide a campaign ID.");
        return;
    }

    try {
        const accounts = await web3.eth.getAccounts();
        await crowdfunding.methods.getRefund(campaignId)
            .send({ from: accounts[0] });
        alert("Refund Issued!");
    } catch (error) {
        console.error("Refund failed:", error);
    }
}

// Check Campaign Status
async function getCampaignStatus() {
    const campaignId = document.getElementById("statusCampaignId").value;

    if (!campaignId) {
        alert("Please provide a campaign ID.");
        return;
    }

    try {
        const status = await crowdfunding.methods.getCampaignStatus(campaignId).call();
        document.getElementById("campaignStatus").innerText = `Status: ${status}`;
    } catch (error) {
        console.error("Failed to get campaign status:", error);
    }
}
