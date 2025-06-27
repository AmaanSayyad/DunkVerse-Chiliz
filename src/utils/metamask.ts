import { ethers } from 'ethers';

// Connect to MetaMask
export async function connectMetaMask() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            return signer;
        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        console.error('MetaMask not installed');
    }
}

// Define network IDs as a type
type NetworkId = 88882 | 5003 | 43113 | 5611 | 137 | 80001 | 1301;

// Define contract addresses interface
interface ContractAddresses {
    token: string;
    invite: string;
}

// Contract addresses for different networks
const contractAddresses: Record<NetworkId, ContractAddresses> = {
    88882: { token: '0xfA224De740979215a51162d27C0Db1621A4712A9', invite: '0x8bC6CdDAD9346F3F0BA9FA2C66DF4940b2efB376' }, // Chiliz Spicy Testnet
    5003: { token: '0xaF1968db67Dd7161D2AF04917b03240DE638ec15', invite: '0xaD488Cd332034434240828F987d6E6B991D48125' }, // Mantle Sepolia Testnet
    43113: { token: '0xC24A824A3e1636247deA0E427b849d8Fa05dB022', invite: '0x9434F069F57CD2084e3864C4DB5598835b6F6F18' }, // Avalanche Testnet
    5611: { token: '0x8ee64A53C83C52c4eCDDB4cE946ED37928D9Ab61', invite: '0x6a07aEBE95e24b3c16862741dbCe13B14546860D' }, // OPBNB Testnet
    137: { token: '0xPolygonTokenAddress', invite: '0xPolygonBettingPoolAddress' }, // Polygon Mainnet
    80001: { token: '0xBaseSepoliaTokenAddress', invite: '0xBaseSepoliaBettingPoolAddress' }, // Base Sepolia
    1301: { token: '0xUnichainSepoliaTokenAddress', invite: '0xUnichainSepoliaBettingPoolAddress' }, // Unichain Sepolia
};

// Get the current network ID
async function getCurrentNetworkId(): Promise<NetworkId | null> {
    if (window.ethereum) {
        try {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            return parseInt(chainId, 16) as NetworkId;
        } catch (error) {
            console.error('Error getting network ID:', error);
            return null;
        }
    }
    return null;
}

// Get contract addresses for the current network
async function getContractAddresses(): Promise<ContractAddresses> {
    const networkId = await getCurrentNetworkId();
    if (networkId && networkId in contractAddresses) {
        return contractAddresses[networkId];
    }
    // Default to Chiliz if network not supported
    console.warn(`Network ${networkId} not supported, using Chiliz Spicy Testnet addresses`);
    return contractAddresses[88882];
}

// Contract ABI
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_dunkVerseToken",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "invitee",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "InvitationAccepted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "inviter",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "invitee",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "InvitationSent",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "acceptInvitation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dunkVerseToken",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "invitee",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "invite",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "invited",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "tokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// Token ABI for approval
const tokenAbi = [
    // Function to approve spending of tokens
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    // Function to check token balance
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Simplified mock invitation function that doesn't interact with the blockchain
export async function inviteFriend(invitee: string, amount: number) {
    if (!invitee || !ethers.utils.isAddress(invitee)) {
        alert('Please enter a valid Ethereum address');
        return;
    }

    if (amount <= 0) {
        alert('Please enter an amount greater than 0');
        return;
    }

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(`[MOCK] Invitation sent to ${invitee} for ${amount} tokens`);
    alert(`Invitation successfully sent to ${invitee} for ${amount} tokens!`);
    
    // Return a mock receipt
    return {
        status: 1,
        events: [{
            event: 'InvitationSent',
            args: {
                inviter: '0xYourAddress',
                invitee: invitee,
                amount: ethers.utils.parseUnits(amount.toString(), 18)
            }
        }]
    };
}

// Mock function to check token balance - always returns a fixed amount
export async function checkTokenBalance(): Promise<string> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return a fixed balance of 1000 tokens
    return "1000.0";
}

// Accept invitation
export async function acceptInvitation() {
    const signer = await connectMetaMask();
    if (!signer) {
        alert('Please connect your wallet first');
        return;
    }

    try {
        const addresses = await getContractAddresses();
        const contractAddress = addresses.invite;
        
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const tx = await contract.acceptInvitation();
        await tx.wait();
        
        alert('Invitation accepted successfully!');
        // Redirect to your application
        window.location.href = 'http://localhost:3000/';
    } catch (error) {
        console.error('An error occurred while accepting the invitation:', error);
        if (error instanceof Error) {
            alert(`An error occurred while accepting the invitation: ${error.message}`);
        } else {
            alert('An unknown error occurred while accepting the invitation.');
        }
    }
}

// Mock function for listening to invitation events - doesn't actually connect to blockchain
export function listenToInvitationSent() {
    console.log('[MOCK] Setting up invitation event listener');
    // This function doesn't do anything in the mock version
    // In a real implementation, it would set up an event listener
}