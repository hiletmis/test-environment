export const CONTRACT_ADDRESS = '0xd9cB76bcAE7219Fb3cB1936401804D7c9F921bCD';
export const ABI = [
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "dapiName",
				type: "bytes32"
			},
			{
				internalType: "bytes",
				name: "metadata",
				type: "bytes"
			}
		],
		name: "deployDapiProxy",
		outputs: [
			{
				internalType: "address",
				name: "proxyAddress",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "dapiName",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "oevBeneficiary",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "metadata",
				type: "bytes"
			}
		],
		name: "deployDapiProxyWithOev",
		outputs: [
			{
				internalType: "address",
				name: "proxyAddress",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "dataFeedId",
				type: "bytes32"
			},
			{
				internalType: "bytes",
				name: "metadata",
				type: "bytes"
			}
		],
		name: "deployDataFeedProxy",
		outputs: [
			{
				internalType: "address",
				name: "proxyAddress",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "dataFeedId",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "oevBeneficiary",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "metadata",
				type: "bytes"
			}
		],
		name: "deployDataFeedProxyWithOev",
		outputs: [
			{
				internalType: "address",
				name: "proxyAddress",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_api3ServerV1",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "proxyAddress",
				type: "address"
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "dapiName",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "metadata",
				type: "bytes"
			}
		],
		name: "DeployedDapiProxy",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "proxyAddress",
				type: "address"
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "dapiName",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "address",
				name: "oevBeneficiary",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "metadata",
				type: "bytes"
			}
		],
		name: "DeployedDapiProxyWithOev",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "proxyAddress",
				type: "address"
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "dataFeedId",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "metadata",
				type: "bytes"
			}
		],
		name: "DeployedDataFeedProxy",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "proxyAddress",
				type: "address"
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "dataFeedId",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "address",
				name: "oevBeneficiary",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "metadata",
				type: "bytes"
			}
		],
		name: "DeployedDataFeedProxyWithOev",
		type: "event"
	},
	{
		inputs: [],
		name: "api3ServerV1",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "dapiName",
				type: "bytes32"
			},
			{
				internalType: "bytes",
				name: "metadata",
				type: "bytes"
			}
		],
		name: "computeDapiProxyAddress",
		outputs: [
			{
				internalType: "address",
				name: "proxyAddress",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "dapiName",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "oevBeneficiary",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "metadata",
				type: "bytes"
			}
		],
		name: "computeDapiProxyWithOevAddress",
		outputs: [
			{
				internalType: "address",
				name: "proxyAddress",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "dataFeedId",
				type: "bytes32"
			},
			{
				internalType: "bytes",
				name: "metadata",
				type: "bytes"
			}
		],
		name: "computeDataFeedProxyAddress",
		outputs: [
			{
				internalType: "address",
				name: "proxyAddress",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "dataFeedId",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "oevBeneficiary",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "metadata",
				type: "bytes"
			}
		],
		name: "computeDataFeedProxyWithOevAddress",
		outputs: [
			{
				internalType: "address",
				name: "proxyAddress",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

export const CONTRACT_ADDRESS_TDF = '0x6d073A6F0b1B41A83aAF5D439EE0F18040879156';
export const ABI_TDF = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { inputs: [], name: 'AmountZero', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'tokenDistributor', type: 'address' },
      { indexed: false, internalType: 'address', name: 'token', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: true, internalType: 'bytes32', name: 'root', type: 'bytes32' },
      { indexed: false, internalType: 'address', name: 'expirationRecipient', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'expirationTimestamp', type: 'uint256' },
    ],
    name: 'DeployedTokenDistributor',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bytes32', name: 'root', type: 'bytes32' },
      { internalType: 'address', name: 'expirationRecipient', type: 'address' },
      { internalType: 'uint256', name: 'expirationTimestamp', type: 'uint256' },
    ],
    name: 'deployTokenDistributor',
    outputs: [{ internalType: 'address', name: 'tokenDistributor', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tokenDistributorImplementation',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const TOKEN_CONTRACT_ADDRESS = "0x03A35484388562E2b4e3d5ce105dc4Db7F57ebC4";
export const TOKEN_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "InvalidShortString", type: "error" },
  {
    inputs: [{ internalType: "string", name: "str", type: "string" }],
    name: "StringTooLong",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  { anonymous: false, inputs: [], name: "EIP712DomainChanged", type: "event" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { internalType: "bytes1", name: "fields", type: "bytes1" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "version", type: "string" },
      { internalType: "uint256", name: "chainId", type: "uint256" },
      { internalType: "address", name: "verifyingContract", type: "address" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      { internalType: "uint256[]", name: "extensions", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "timestamp", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
      { internalType: "bytes", name: "signature", type: "bytes" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

export const PREPAYMENT_DEPOSIT_CONTRACT_ADDRESS = "0x3961C79988F64Dda1EfB7cC72Ed9377A0535097D";
export const PREPAYMENT_DEPOSIT_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "applyPermitAndDeposit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "withdrawalLimit",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_accessControlRegistry",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_adminRoleDescription",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_manager",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_token",
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
				"indexed": false,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "Claimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "withdrawalLimit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "DecreasedUserWithdrawalLimit",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "decreaseUserWithdrawalLimit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "withdrawalLimit",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "withdrawalLimit",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "withdrawalLimit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "Deposited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "withdrawalLimit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "IncreasedUserWithdrawalLimit",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "increaseUserWithdrawalLimit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "withdrawalLimit",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes[]",
				"name": "data",
				"type": "bytes[]"
			}
		],
		"name": "multicall",
		"outputs": [
			{
				"internalType": "bytes[]",
				"name": "returndata",
				"type": "bytes[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "withdrawalDestination",
				"type": "address"
			}
		],
		"name": "setWithdrawalDestination",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "withdrawalDestination",
				"type": "address"
			}
		],
		"name": "SetWithdrawalDestination",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes[]",
				"name": "data",
				"type": "bytes[]"
			}
		],
		"name": "tryMulticall",
		"outputs": [
			{
				"internalType": "bool[]",
				"name": "successes",
				"type": "bool[]"
			},
			{
				"internalType": "bytes[]",
				"name": "returndata",
				"type": "bytes[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expirationTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "withdrawalSigner",
				"type": "address"
			},
			{
				"internalType": "bytes",
				"name": "signature",
				"type": "bytes"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "address",
				"name": "withdrawalDestination",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "withdrawalLimit",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "withdrawalHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "expirationTimestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "withdrawalSigner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "withdrawalDestination",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "withdrawalLimit",
				"type": "uint256"
			}
		],
		"name": "Withdrew",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "accessControlRegistry",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "adminRole",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "adminRoleDescription",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "CLAIMER_ROLE_DESCRIPTION",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimerRole",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "manager",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "USER_WITHDRAWAL_LIMIT_DECREASER_ROLE_DESCRIPTION",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "USER_WITHDRAWAL_LIMIT_INCREASER_ROLE_DESCRIPTION",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
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
		"name": "userToWithdrawalDestination",
		"outputs": [
			{
				"internalType": "address",
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
				"name": "",
				"type": "address"
			}
		],
		"name": "userToWithdrawalLimit",
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
		"inputs": [],
		"name": "userWithdrawalLimitDecreaserRole",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "userWithdrawalLimitIncreaserRole",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "WITHDRAWAL_SIGNER_ROLE_DESCRIPTION",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawalSignerRole",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "withdrawalWithHashIsExecuted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export const OEV_SEARCHER_MULTICALL_V1_BYTECODE = "0x608060405234801561001057600080fd5b5061002d61002261003260201b60201c565b61003a60201b60201c565b6100fe565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b610d378061010d6000396000f3fe6080604052600436106100435760003560e01c806339943ea11461004f578063715018a61461007f5780638da5cb5b14610096578063f2fde38b146100c15761004a565b3661004a57005b600080fd5b610069600480360381019061006491906106a9565b6100ea565b60405161007691906108af565b60405180910390f35b34801561008b57600080fd5b50610094610384565b005b3480156100a257600080fd5b506100ab610398565b6040516100b89190610912565b60405180910390f35b3480156100cd57600080fd5b506100e860048036038101906100e39190610959565b6103c1565b005b60606100f4610444565b6000878790509050858590508114801561011057508383905081145b61014f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610146906109e3565b60405180910390fd5b8067ffffffffffffffff81111561016957610168610a03565b5b60405190808252806020026020018201604052801561019c57816020015b60608152602001906001900390816101875790505b50915060005b818110156103785760008989838181106101bf576101be610a32565b5b90506020020160208101906101d49190610959565b73ffffffffffffffffffffffffffffffffffffffff168686848181106101fd576101fc610a32565b5b9050602002013589898581811061021757610216610a32565b5b90506020028101906102299190610a70565b604051610237929190610b12565b60006040518083038185875af1925050503d8060008114610274576040519150601f19603f3d011682016040523d82523d6000602084013e610279565b606091505b5085848151811061028d5761028c610a32565b5b6020026020010181905281925050508061036a5760008483815181106102b6576102b5610a32565b5b602002602001015190506000815111156102d35780518082602001fd5b8686848181106102e6576102e5610a32565b5b9050602002013547101561032f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161032690610b77565b60405180910390fd5b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161036190610be3565b60405180910390fd5b8180600101925050506101a2565b50509695505050505050565b61038c610444565b61039660006104c2565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6103c9610444565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610438576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161042f90610c75565b60405180910390fd5b610441816104c2565b50565b61044c610586565b73ffffffffffffffffffffffffffffffffffffffff1661046a610398565b73ffffffffffffffffffffffffffffffffffffffff16146104c0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b790610ce1565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f8401126105bd576105bc610598565b5b8235905067ffffffffffffffff8111156105da576105d961059d565b5b6020830191508360208202830111156105f6576105f56105a2565b5b9250929050565b60008083601f84011261061357610612610598565b5b8235905067ffffffffffffffff8111156106305761062f61059d565b5b60208301915083602082028301111561064c5761064b6105a2565b5b9250929050565b60008083601f84011261066957610668610598565b5b8235905067ffffffffffffffff8111156106865761068561059d565b5b6020830191508360208202830111156106a2576106a16105a2565b5b9250929050565b600080600080600080606087890312156106c6576106c561058e565b5b600087013567ffffffffffffffff8111156106e4576106e3610593565b5b6106f089828a016105a7565b9650965050602087013567ffffffffffffffff81111561071357610712610593565b5b61071f89828a016105fd565b9450945050604087013567ffffffffffffffff81111561074257610741610593565b5b61074e89828a01610653565b92509250509295509295509295565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600081519050919050565b600082825260208201905092915050565b60005b838110156107c35780820151818401526020810190506107a8565b60008484015250505050565b6000601f19601f8301169050919050565b60006107eb82610789565b6107f58185610794565b93506108058185602086016107a5565b61080e816107cf565b840191505092915050565b600061082583836107e0565b905092915050565b6000602082019050919050565b60006108458261075d565b61084f8185610768565b93508360208202850161086185610779565b8060005b8581101561089d578484038952815161087e8582610819565b94506108898361082d565b925060208a01995050600181019050610865565b50829750879550505050505092915050565b600060208201905081810360008301526108c9818461083a565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006108fc826108d1565b9050919050565b61090c816108f1565b82525050565b60006020820190506109276000830184610903565b92915050565b610936816108f1565b811461094157600080fd5b50565b6000813590506109538161092d565b92915050565b60006020828403121561096f5761096e61058e565b5b600061097d84828501610944565b91505092915050565b600082825260208201905092915050565b7f506172616d65746572206c656e677468206d69736d6174636800000000000000600082015250565b60006109cd601983610986565b91506109d882610997565b602082019050919050565b600060208201905081810360008301526109fc816109c0565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b600080fd5b600080fd5b60008083356001602003843603038112610a8d57610a8c610a61565b5b80840192508235915067ffffffffffffffff821115610aaf57610aae610a66565b5b602083019250600182023603831315610acb57610aca610a6b565b5b509250929050565b600081905092915050565b82818337600083830152505050565b6000610af98385610ad3565b9350610b06838584610ade565b82840190509392505050565b6000610b1f828486610aed565b91508190509392505050565b7f4d756c746963616c6c3a20496e73756666696369656e742062616c616e636500600082015250565b6000610b61601f83610986565b9150610b6c82610b2b565b602082019050919050565b60006020820190508181036000830152610b9081610b54565b9050919050565b7f4d756c746963616c6c3a204e6f2072657665727420737472696e670000000000600082015250565b6000610bcd601b83610986565b9150610bd882610b97565b602082019050919050565b60006020820190508181036000830152610bfc81610bc0565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000610c5f602683610986565b9150610c6a82610c03565b604082019050919050565b60006020820190508181036000830152610c8e81610c52565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000610ccb602083610986565b9150610cd682610c95565b602082019050919050565b60006020820190508181036000830152610cfa81610cbe565b905091905056fea26469706673582212204acb993fdeea5299c7cf5ad978a4e7b70bf52ed06ad06b9506efcbbd874669a664736f6c63430008110033";
export const OEV_SEARCHER_MULTICALL_V1_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "targets",
				"type": "address[]"
			},
			{
				"internalType": "bytes[]",
				"name": "data",
				"type": "bytes[]"
			},
			{
				"internalType": "uint256[]",
				"name": "values",
				"type": "uint256[]"
			}
		],
		"name": "externalMulticallWithValue",
		"outputs": [
			{
				"internalType": "bytes[]",
				"name": "returndata",
				"type": "bytes[]"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]

export const SIGNTYPEDDATA = {
	Permit: [
	  {
		name: 'owner',
		type: 'address',
	  },
	  {
		name: 'spender',
		type: 'address',
	  },
	  {
		name: 'value',
		type: 'uint256',
	  },
	  {
		name: 'nonce',
		type: 'uint256',
	  },
	  {
		name: 'deadline',
		type: 'uint256',
	  },
	],
  }