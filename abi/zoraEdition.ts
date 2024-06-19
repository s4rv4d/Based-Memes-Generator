import { supportedChains } from "../chains/supportedChains";

export const PSNFTDropABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_zoraERC721TransferHelper",
        type: "address",
        internalType: "address",
      },
      {
        name: "_factoryUpgradeGate",
        type: "address",
        internalType: "contract IFactoryUpgradeGate",
      },
      { name: "_mintFeeAmount", type: "uint256", internalType: "uint256" },
      {
        name: "_mintFeeRecipient",
        type: "address",
        internalType: "address payable",
      },
      { name: "_protocolRewards", type: "address", internalType: "address" },
    ],
    stateMutability: "nonpayable",
  },
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    name: "DEFAULT_ADMIN_ROLE",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MINTER_ROLE",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "SALES_MANAGER_ROLE",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "adminMint",
    inputs: [
      { name: "recipient", type: "address", internalType: "address" },
      { name: "quantity", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "adminMintAirdrop",
    inputs: [
      { name: "recipients", type: "address[]", internalType: "address[]" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "burn",
    inputs: [{ name: "tokenId", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "callMetadataRenderer",
    inputs: [{ name: "data", type: "bytes", internalType: "bytes" }],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "computeFreeMintRewards",
    inputs: [{ name: "numTokens", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct RewardsSettings",
        components: [
          { name: "creatorReward", type: "uint256", internalType: "uint256" },
          {
            name: "createReferralReward",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "stickerReferralReward",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "mintReferralReward",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "computeTotalReward",
    inputs: [{ name: "numTokens", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "config",
    inputs: [],
    outputs: [
      {
        name: "metadataRenderer",
        type: "address",
        internalType: "contract IMetadataRenderer",
      },
      { name: "editionSize", type: "uint64", internalType: "uint64" },
      { name: "royaltyBPS", type: "uint16", internalType: "uint16" },
      {
        name: "fundsRecipient",
        type: "address",
        internalType: "address payable",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "contractURI",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "contractVersion",
    inputs: [],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createReferral",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "factoryUpgradeGate",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IFactoryUpgradeGate",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "finalizeOpenEdition",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getApproved",
    inputs: [{ name: "tokenId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRoleAdmin",
    inputs: [{ name: "role", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "grantRole",
    inputs: [
      { name: "role", type: "bytes32", internalType: "bytes32" },
      { name: "account", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "hasRole",
    inputs: [
      { name: "role", type: "bytes32", internalType: "bytes32" },
      { name: "account", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      { name: "_contractName", type: "string", internalType: "string" },
      { name: "_contractSymbol", type: "string", internalType: "string" },
      { name: "_initialOwner", type: "address", internalType: "address" },
      {
        name: "_fundsRecipient",
        type: "address",
        internalType: "address payable",
      },
      { name: "_editionSize", type: "uint64", internalType: "uint64" },
      { name: "_royaltyBPS", type: "uint16", internalType: "uint16" },
      { name: "_setupCalls", type: "bytes[]", internalType: "bytes[]" },
      {
        name: "_metadataRenderer",
        type: "address",
        internalType: "contract IMetadataRenderer",
      },
      { name: "_metadataRendererInit", type: "bytes", internalType: "bytes" },
      { name: "_createReferral", type: "address", internalType: "address" },
      {
        name: "_stickerCreators",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isAdmin",
    inputs: [{ name: "user", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isApprovedForAll",
    inputs: [
      { name: "nftOwner", type: "address", internalType: "address" },
      { name: "operator", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "metadataRenderer",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract IMetadataRenderer" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mintWithRewards",
    inputs: [
      { name: "recipient", type: "address", internalType: "address" },
      { name: "quantity", type: "uint256", internalType: "uint256" },
      { name: "comment", type: "string", internalType: "string" },
      { name: "mintReferral", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "mintedPerAddress",
    inputs: [{ name: "minter", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IERC721Drop.AddressMintDetails",
        components: [
          { name: "totalMints", type: "uint256", internalType: "uint256" },
          { name: "presaleMints", type: "uint256", internalType: "uint256" },
          { name: "publicMints", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "multicall",
    inputs: [{ name: "data", type: "bytes[]", internalType: "bytes[]" }],
    outputs: [{ name: "results", type: "bytes[]", internalType: "bytes[]" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ownerOf",
    inputs: [{ name: "tokenId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "presaleMintsByAddress",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "proxiableUUID",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "purchase",
    inputs: [{ name: "quantity", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "purchasePresale",
    inputs: [
      { name: "quantity", type: "uint256", internalType: "uint256" },
      { name: "maxQuantity", type: "uint256", internalType: "uint256" },
      { name: "pricePerToken", type: "uint256", internalType: "uint256" },
      { name: "merkleProof", type: "bytes32[]", internalType: "bytes32[]" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "purchasePresaleWithComment",
    inputs: [
      { name: "quantity", type: "uint256", internalType: "uint256" },
      { name: "maxQuantity", type: "uint256", internalType: "uint256" },
      { name: "pricePerToken", type: "uint256", internalType: "uint256" },
      { name: "merkleProof", type: "bytes32[]", internalType: "bytes32[]" },
      { name: "comment", type: "string", internalType: "string" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "purchasePresaleWithRewards",
    inputs: [
      { name: "quantity", type: "uint256", internalType: "uint256" },
      { name: "maxQuantity", type: "uint256", internalType: "uint256" },
      { name: "pricePerToken", type: "uint256", internalType: "uint256" },
      { name: "merkleProof", type: "bytes32[]", internalType: "bytes32[]" },
      { name: "comment", type: "string", internalType: "string" },
      { name: "mintReferral", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "purchaseWithComment",
    inputs: [
      { name: "quantity", type: "uint256", internalType: "uint256" },
      { name: "comment", type: "string", internalType: "string" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "purchaseWithRecipient",
    inputs: [
      { name: "recipient", type: "address", internalType: "address" },
      { name: "quantity", type: "uint256", internalType: "uint256" },
      { name: "comment", type: "string", internalType: "string" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "renounceRole",
    inputs: [
      { name: "role", type: "bytes32", internalType: "bytes32" },
      { name: "account", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "revokeRole",
    inputs: [
      { name: "role", type: "bytes32", internalType: "bytes32" },
      { name: "account", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "royaltyInfo",
    inputs: [
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "_salePrice", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "receiver", type: "address", internalType: "address" },
      { name: "royaltyAmount", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "royaltyMintSchedule",
    inputs: [],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "safeTransferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "safeTransferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
      { name: "_data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "saleDetails",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IERC721Drop.SaleDetails",
        components: [
          { name: "publicSaleActive", type: "bool", internalType: "bool" },
          { name: "presaleActive", type: "bool", internalType: "bool" },
          { name: "publicSalePrice", type: "uint256", internalType: "uint256" },
          { name: "publicSaleStart", type: "uint64", internalType: "uint64" },
          { name: "publicSaleEnd", type: "uint64", internalType: "uint64" },
          { name: "presaleStart", type: "uint64", internalType: "uint64" },
          { name: "presaleEnd", type: "uint64", internalType: "uint64" },
          {
            name: "presaleMerkleRoot",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "maxSalePurchasePerAddress",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "totalMinted", type: "uint256", internalType: "uint256" },
          { name: "maxSupply", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "salesConfig",
    inputs: [],
    outputs: [
      { name: "publicSalePrice", type: "uint104", internalType: "uint104" },
      {
        name: "maxSalePurchasePerAddress",
        type: "uint32",
        internalType: "uint32",
      },
      { name: "publicSaleStart", type: "uint64", internalType: "uint64" },
      { name: "publicSaleEnd", type: "uint64", internalType: "uint64" },
      { name: "presaleStart", type: "uint64", internalType: "uint64" },
      { name: "presaleEnd", type: "uint64", internalType: "uint64" },
      { name: "presaleMerkleRoot", type: "bytes32", internalType: "bytes32" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setApprovalForAll",
    inputs: [
      { name: "operator", type: "address", internalType: "address" },
      { name: "approved", type: "bool", internalType: "bool" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setFundsRecipient",
    inputs: [
      {
        name: "newRecipientAddress",
        type: "address",
        internalType: "address payable",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMetadataRenderer",
    inputs: [
      {
        name: "newRenderer",
        type: "address",
        internalType: "contract IMetadataRenderer",
      },
      { name: "setupRenderer", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setOwner",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setSaleConfiguration",
    inputs: [
      { name: "publicSalePrice", type: "uint104", internalType: "uint104" },
      {
        name: "maxSalePurchasePerAddress",
        type: "uint32",
        internalType: "uint32",
      },
      { name: "publicSaleStart", type: "uint64", internalType: "uint64" },
      { name: "publicSaleEnd", type: "uint64", internalType: "uint64" },
      { name: "presaleStart", type: "uint64", internalType: "uint64" },
      { name: "presaleEnd", type: "uint64", internalType: "uint64" },
      { name: "presaleMerkleRoot", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "stickerCreators",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [{ name: "interfaceId", type: "bytes4", internalType: "bytes4" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "tokenURI",
    inputs: [{ name: "tokenId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateCreateReferral",
    inputs: [{ name: "recipient", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateRoyaltyMintSchedule",
    inputs: [{ name: "newSchedule", type: "uint32", internalType: "uint32" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "upgradeTo",
    inputs: [
      { name: "newImplementation", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "upgradeToAndCall",
    inputs: [
      { name: "newImplementation", type: "address", internalType: "address" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawRewards",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "zoraERC721TransferHelper",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "zoraFeeForAmount",
    inputs: [{ name: "quantity", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "recipient", type: "address", internalType: "address payable" },
      { name: "fee", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "AdminChanged",
    inputs: [
      {
        name: "previousAdmin",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "newAdmin",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "approved",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ApprovalForAll",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      { name: "approved", type: "bool", indexed: false, internalType: "bool" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BatchMetadataUpdate",
    inputs: [
      {
        name: "_fromTokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "_toTokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BeaconUpgraded",
    inputs: [
      {
        name: "beacon",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FundsReceived",
    inputs: [
      {
        name: "source",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FundsRecipientChanged",
    inputs: [
      {
        name: "newAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "changedBy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FundsWithdrawn",
    inputs: [
      {
        name: "withdrawnBy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "withdrawnTo",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "feeRecipient",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "feeAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MetadataUpdate",
    inputs: [
      {
        name: "_tokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MintComment",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenContract",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "quantity",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "comment",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MintFeePayout",
    inputs: [
      {
        name: "mintFeeAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "mintFeeRecipient",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      { name: "success", type: "bool", indexed: false, internalType: "bool" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OpenMintFinalized",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "numberOfMints",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnerCanceled",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "potentialNewOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnerPending",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "potentialNewOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleAdminChanged",
    inputs: [
      { name: "role", type: "bytes32", indexed: true, internalType: "bytes32" },
      {
        name: "previousAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "newAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleGranted",
    inputs: [
      { name: "role", type: "bytes32", indexed: true, internalType: "bytes32" },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleRevoked",
    inputs: [
      { name: "role", type: "bytes32", indexed: true, internalType: "bytes32" },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Sale",
    inputs: [
      { name: "to", type: "address", indexed: true, internalType: "address" },
      {
        name: "quantity",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "pricePerToken",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "firstPurchasedTokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SalesConfigChanged",
    inputs: [
      {
        name: "changedBy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      { name: "from", type: "address", indexed: true, internalType: "address" },
      { name: "to", type: "address", indexed: true, internalType: "address" },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UpdatedMetadataRenderer",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "renderer",
        type: "address",
        indexed: false,
        internalType: "contract IMetadataRenderer",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Upgraded",
    inputs: [
      {
        name: "implementation",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "Access_MissingRoleOrAdmin",
    inputs: [{ name: "role", type: "bytes32", internalType: "bytes32" }],
  },
  { type: "error", name: "Access_OnlyAdmin", inputs: [] },
  { type: "error", name: "Access_WithdrawNotAllowed", inputs: [] },
  {
    type: "error",
    name: "Admin_InvalidUpgradeAddress",
    inputs: [
      { name: "proposedAddress", type: "address", internalType: "address" },
    ],
  },
  { type: "error", name: "Admin_UnableToFinalizeNotOpenEdition", inputs: [] },
  { type: "error", name: "ApprovalCallerNotOwnerNorApproved", inputs: [] },
  { type: "error", name: "ApprovalQueryForNonexistentToken", inputs: [] },
  { type: "error", name: "ApprovalToCurrentOwner", inputs: [] },
  { type: "error", name: "ApproveToCaller", inputs: [] },
  { type: "error", name: "BalanceQueryForZeroAddress", inputs: [] },
  { type: "error", name: "CREATOR_FUNDS_RECIPIENT_NOT_SET", inputs: [] },
  { type: "error", name: "ExternalMetadataRenderer_CallFailed", inputs: [] },
  { type: "error", name: "INVALID_ADDRESS_ZERO", inputs: [] },
  { type: "error", name: "INVALID_ETH_AMOUNT", inputs: [] },
  { type: "error", name: "InvalidMintSchedule", inputs: [] },
  {
    type: "error",
    name: "MarketFilterDAOAddressNotSupportedForChain",
    inputs: [],
  },
  { type: "error", name: "MintFee_FundsSendFailure", inputs: [] },
  { type: "error", name: "MintToZeroAddress", inputs: [] },
  { type: "error", name: "MintZeroQuantity", inputs: [] },
  { type: "error", name: "Mint_SoldOut", inputs: [] },
  { type: "error", name: "ONLY_CREATE_REFERRAL", inputs: [] },
  { type: "error", name: "ONLY_OWNER", inputs: [] },
  { type: "error", name: "ONLY_PENDING_OWNER", inputs: [] },
  {
    type: "error",
    name: "OperatorNotAllowed",
    inputs: [{ name: "operator", type: "address", internalType: "address" }],
  },
  { type: "error", name: "OwnerQueryForNonexistentToken", inputs: [] },
  { type: "error", name: "Presale_Inactive", inputs: [] },
  { type: "error", name: "Presale_MerkleNotApproved", inputs: [] },
  { type: "error", name: "Presale_TooManyForAddress", inputs: [] },
  { type: "error", name: "ProtocolRewards_WithdrawSendFailure", inputs: [] },
  { type: "error", name: "Purchase_TooManyForAddress", inputs: [] },
  {
    type: "error",
    name: "Purchase_WrongPrice",
    inputs: [
      { name: "correctPrice", type: "uint256", internalType: "uint256" },
    ],
  },
  { type: "error", name: "RemoteOperatorFilterRegistryCallFailed", inputs: [] },
  { type: "error", name: "Sale_Inactive", inputs: [] },
  {
    type: "error",
    name: "Setup_RoyaltyPercentageTooHigh",
    inputs: [{ name: "maxRoyaltyBPS", type: "uint16", internalType: "uint16" }],
  },
  { type: "error", name: "TransferCallerNotOwnerNorApproved", inputs: [] },
  { type: "error", name: "TransferFromIncorrectOwner", inputs: [] },
  { type: "error", name: "TransferToNonERC721ReceiverImplementer", inputs: [] },
  { type: "error", name: "TransferToZeroAddress", inputs: [] },
  { type: "error", name: "URIQueryForNonexistentToken", inputs: [] },
  { type: "error", name: "Withdraw_FundsSendFailure", inputs: [] },
] as const;

export const ZoraAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_implementation", type: "address", internalType: "address" },
      {
        name: "_editionMetadataRenderer",
        type: "address",
        internalType: "contract EditionMetadataRenderer",
      },
      {
        name: "_dropMetadataRenderer",
        type: "address",
        internalType: "contract DropMetadataRenderer",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "contractName",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "contractURI",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "contractVersion",
    inputs: [],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createAndConfigureDrop",
    inputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "symbol", type: "string", internalType: "string" },
      { name: "defaultAdmin", type: "address", internalType: "address" },
      { name: "editionSize", type: "uint64", internalType: "uint64" },
      { name: "royaltyBPS", type: "uint16", internalType: "uint16" },
      {
        name: "fundsRecipient",
        type: "address",
        internalType: "address payable",
      },
      { name: "setupCalls", type: "bytes[]", internalType: "bytes[]" },
      {
        name: "metadataRenderer",
        type: "address",
        internalType: "contract IMetadataRenderer",
      },
      { name: "metadataInitializer", type: "bytes", internalType: "bytes" },
      { name: "createReferral", type: "address", internalType: "address" },
      { name: "stickerCreators", type: "address[]", internalType: "address[]" },
    ],
    outputs: [
      {
        name: "newDropAddress",
        type: "address",
        internalType: "address payable",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createEditionWithReferral",
    inputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "symbol", type: "string", internalType: "string" },
      { name: "editionSize", type: "uint64", internalType: "uint64" },
      { name: "royaltyBPS", type: "uint16", internalType: "uint16" },
      {
        name: "fundsRecipient",
        type: "address",
        internalType: "address payable",
      },
      { name: "defaultAdmin", type: "address", internalType: "address" },
      {
        name: "saleConfig",
        type: "tuple",
        internalType: "struct IERC721Drop.SalesConfiguration",
        components: [
          { name: "publicSalePrice", type: "uint104", internalType: "uint104" },
          {
            name: "maxSalePurchasePerAddress",
            type: "uint32",
            internalType: "uint32",
          },
          { name: "publicSaleStart", type: "uint64", internalType: "uint64" },
          { name: "publicSaleEnd", type: "uint64", internalType: "uint64" },
          { name: "presaleStart", type: "uint64", internalType: "uint64" },
          { name: "presaleEnd", type: "uint64", internalType: "uint64" },
          {
            name: "presaleMerkleRoot",
            type: "bytes32",
            internalType: "bytes32",
          },
        ],
      },
      { name: "description", type: "string", internalType: "string" },
      { name: "animationURI", type: "string", internalType: "string" },
      { name: "imageURI", type: "string", internalType: "string" },
      { name: "createReferral", type: "address", internalType: "address" },
      { name: "stickerCreators", type: "address[]", internalType: "address[]" },
    ],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "dropMetadataRenderer",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract DropMetadataRenderer",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "editionMetadataRenderer",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract EditionMetadataRenderer",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "implementation",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "proxiableUUID",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setupDropsContract",
    inputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "symbol", type: "string", internalType: "string" },
      { name: "defaultAdmin", type: "address", internalType: "address" },
      { name: "editionSize", type: "uint64", internalType: "uint64" },
      { name: "royaltyBPS", type: "uint16", internalType: "uint16" },
      {
        name: "fundsRecipient",
        type: "address",
        internalType: "address payable",
      },
      {
        name: "saleConfig",
        type: "tuple",
        internalType: "struct IERC721Drop.SalesConfiguration",
        components: [
          { name: "publicSalePrice", type: "uint104", internalType: "uint104" },
          {
            name: "maxSalePurchasePerAddress",
            type: "uint32",
            internalType: "uint32",
          },
          { name: "publicSaleStart", type: "uint64", internalType: "uint64" },
          { name: "publicSaleEnd", type: "uint64", internalType: "uint64" },
          { name: "presaleStart", type: "uint64", internalType: "uint64" },
          { name: "presaleEnd", type: "uint64", internalType: "uint64" },
          {
            name: "presaleMerkleRoot",
            type: "bytes32",
            internalType: "bytes32",
          },
        ],
      },
      {
        name: "metadataRenderer",
        type: "address",
        internalType: "contract IMetadataRenderer",
      },
      { name: "metadataInitializer", type: "bytes", internalType: "bytes" },
      { name: "createReferral", type: "address", internalType: "address" },
      { name: "stickerCreators", type: "address[]", internalType: "address[]" },
    ],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "upgradeTo",
    inputs: [
      { name: "newImplementation", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "upgradeToAndCall",
    inputs: [
      { name: "newImplementation", type: "address", internalType: "address" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "event",
    name: "AdminChanged",
    inputs: [
      {
        name: "previousAdmin",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "newAdmin",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BeaconUpgraded",
    inputs: [
      {
        name: "beacon",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CreatedDrop",
    inputs: [
      {
        name: "creator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "editionContractAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "editionSize",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Upgraded",
    inputs: [
      {
        name: "implementation",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "UpgradeToMismatchedContractName",
    inputs: [
      { name: "expected", type: "string", internalType: "string" },
      { name: "actual", type: "string", internalType: "string" },
    ],
  },
] as const;

export const RewardsAbi = [
  { type: "constructor", inputs: [], stateMutability: "payable" },
  {
    type: "function",
    name: "WITHDRAW_TYPEHASH",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "deposit",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "reason", type: "bytes4", internalType: "bytes4" },
      { name: "comment", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "depositBatch",
    inputs: [
      { name: "recipients", type: "address[]", internalType: "address[]" },
      { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
      { name: "reasons", type: "bytes4[]", internalType: "bytes4[]" },
      { name: "comment", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "depositRewards",
    inputs: [
      { name: "creator", type: "address", internalType: "address" },
      { name: "creatorReward", type: "uint256", internalType: "uint256" },
      { name: "createReferral", type: "address", internalType: "address" },
      {
        name: "createReferralReward",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "stickerReferral", type: "address[]", internalType: "address[]" },
      {
        name: "stickerReferralReward",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "mintReferral", type: "address", internalType: "address" },
      { name: "mintReferralReward", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "eip712Domain",
    inputs: [],
    outputs: [
      { name: "fields", type: "bytes1", internalType: "bytes1" },
      { name: "name", type: "string", internalType: "string" },
      { name: "version", type: "string", internalType: "string" },
      { name: "chainId", type: "uint256", internalType: "uint256" },
      { name: "verifyingContract", type: "address", internalType: "address" },
      { name: "salt", type: "bytes32", internalType: "bytes32" },
      { name: "extensions", type: "uint256[]", internalType: "uint256[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "nonces",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{ name: "balance", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawFor",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawWithSig",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
      { name: "v", type: "uint8", internalType: "uint8" },
      { name: "r", type: "bytes32", internalType: "bytes32" },
      { name: "s", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Deposit",
    inputs: [
      { name: "from", type: "address", indexed: true, internalType: "address" },
      { name: "to", type: "address", indexed: true, internalType: "address" },
      { name: "reason", type: "bytes4", indexed: true, internalType: "bytes4" },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "comment",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  { type: "event", name: "EIP712DomainChanged", inputs: [], anonymous: false },
  {
    type: "event",
    name: "RewardsDeposit",
    inputs: [
      {
        name: "creator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "createReferral",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "stickerReferral",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "mintReferral",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "from",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "creatorReward",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "createReferralReward",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "stickerReferralReward",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "mintReferralReward",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Withdraw",
    inputs: [
      { name: "from", type: "address", indexed: true, internalType: "address" },
      { name: "to", type: "address", indexed: true, internalType: "address" },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "ADDRESS_ZERO", inputs: [] },
  { type: "error", name: "ARRAY_LENGTH_MISMATCH", inputs: [] },
  { type: "error", name: "INVALID_DEPOSIT", inputs: [] },
  { type: "error", name: "INVALID_SIGNATURE", inputs: [] },
  { type: "error", name: "INVALID_WITHDRAW", inputs: [] },
  { type: "error", name: "InvalidShortString", inputs: [] },
  { type: "error", name: "SIGNATURE_DEADLINE_EXPIRED", inputs: [] },
  {
    type: "error",
    name: "StringTooLong",
    inputs: [{ name: "str", type: "string", internalType: "string" }],
  },
  { type: "error", name: "TRANSFER_FAILED", inputs: [] },
] as const;

// creator mainnet
const ZORA_NFT_CREATOR_PROXY_MAINNET =
  "0xf74b146ce44cc162b601dec3be331784db111dc1";
const ZORA_NFT_CREATOR_PROXY_BASE =
  "0x58C3ccB2dcb9384E5AB9111CD1a5DEA916B0f33c";
const ZORA_NFT_CREATOR_PROXY_OP = "0x7d1a46c6e614A0091c39E102F2798C27c1fA8892";
const ZORA_NFT_CREATOR_PROXY_ZORA =
  "0xA2c2A96A232113Dd4993E8b048EEbc3371AE8d85";

// rewards mainnet
const ZORA_PROTOCOL_REWARDS_MAINNET =
  "0x7777777F279eba3d3Ad8F4E708545291A6fDBA8B";
const ZORA_PROTOCOL_REWARDS_BASE = "0x7777777F279eba3d3Ad8F4E708545291A6fDBA8B";
const ZORA_PROTOCOL_REWARDS_OP = "0x7777777F279eba3d3Ad8F4E708545291A6fDBA8B";
const ZORA_PROTOCOL_REWARDS_ZORA = "0x7777777F279eba3d3Ad8F4E708545291A6fDBA8B";

// creator testnet
const ZORA_NFT_CREATOR_PROXY_BASE_TESTNET =
  "0x377FE7E2c509Ea61D81f732de811Ff16587e76ad";
const ZORA_NFT_CREATOR_PROXY_OP_TESTNET =
  "0x3C1ebcF36Ca9DD9371c9aA99c274e4988906c6E3";
const ZORA_NFT_CREATOR_PROXY_ZORA_TESTNET =
  "0xeB29A4e5b84fef428c072debA2444e93c080CE87";
const ZORA_NFT_CREATOR_PROXY_GOERLI_TESTNET =
  "0x97547Fe40fC56B8469d34B71d8Fb7779b73733f3";

// rewards testnet
const ZORA_PROTOCOL_REWARDS_BASE_TESTNET =
  "0xE41C5006772Ac41B4BDe250D0C82652629e8dBA3";
const ZORA_PROTOCOL_REWARDS_OP_TESTNET =
  "0x7777777F279eba3d3Ad8F4E708545291A6fDBA8B";
const ZORA_PROTOCOL_REWARDS_ZORA_TESTNET =
  "0x7777777F279eba3d3Ad8F4E708545291A6fDBA8B";
const ZORA_PROTOCOL_REWARDS_GOERLI_TESTNET =
  "0x7777777F279eba3d3Ad8F4E708545291A6fDBA8B";

export const computeEthToSpend = (
  publicSalePrice: string,
  numEditions: string
) => {
  if (numEditions === "")
    return {
      creatorReward: BigInt(0),
      createReward: BigInt(0),
      mintReferral: BigInt(0),
      zoraFee: BigInt(0),
      firstMinterReward: BigInt(0),
      total: BigInt(0),
    };

  const bigNumEditions = BigInt(numEditions);

  // defaults
  const creatorReward = BigInt("333000000000000") * bigNumEditions;
  const createReward = BigInt("111000000000000") * bigNumEditions;
  const mintReferral = BigInt("111000000000000") * bigNumEditions;
  const zoraFee = BigInt("111000000000000") * bigNumEditions;
  const firstMinterReward = BigInt("111000000000000") * bigNumEditions;

  if (publicSalePrice === "0") {
    // free mint

    return {
      creatorReward,
      createReward,
      mintReferral,
      zoraFee,
      firstMinterReward,
      total:
        creatorReward +
        createReward +
        mintReferral +
        zoraFee +
        firstMinterReward,
    };
  } else {
    // paid mint
    const editionPrice = BigInt(publicSalePrice) * bigNumEditions;
    const p_createReward = createReward * BigInt(2);
    const p_mintReferral = mintReferral * BigInt(2);
    const p_zoraFee = zoraFee * BigInt(2);
    const p_firstMinterReward = firstMinterReward;
    return {
      editionPrice,
      createReward: p_createReward,
      mintReferral: p_mintReferral,
      zoraFee: p_zoraFee,
      firstMinterReward,
      total:
        editionPrice +
        p_createReward +
        p_mintReferral +
        p_zoraFee +
        p_firstMinterReward,
    };
  }
};

export const getContractFromChainId = (chainId: number) => {
  if (!supportedChains.map((chain) => chain.id).includes(chainId))
    throw new Error("Chain not supported");

  switch (chainId) {
    case 1:
      return {
        creator_contract: ZORA_NFT_CREATOR_PROXY_MAINNET,
        rewards_contract: ZORA_PROTOCOL_REWARDS_MAINNET,
        explorer: "https://etherscan.io",
        bridge: "https://app.uniswap.org/swap",
        chainId: 1,
      };
    case 5:
      return {
        creator_contract: ZORA_NFT_CREATOR_PROXY_GOERLI_TESTNET,
        rewards_contract: ZORA_PROTOCOL_REWARDS_GOERLI_TESTNET,
        explorer: "https://goerli.etherscan.io",
        bridge: "https://app.uniswap.org/swap",
        chainId: 5,
      };
    case 8453:
      return {
        creator_contract: ZORA_NFT_CREATOR_PROXY_BASE,
        rewards_contract: ZORA_PROTOCOL_REWARDS_BASE,
        explorer: "https://basescan.org",
        bridge: "https://bridge.base.org/deposit",
        chainId: 8453,
      };
    case 10:
      return {
        creator_contract: ZORA_NFT_CREATOR_PROXY_OP,
        rewards_contract: ZORA_PROTOCOL_REWARDS_OP,
        explorer: "https://optimistic.etherscan.io",
        bridge: "https://app.optimism.io/bridge/deposit",
        chainId: 10,
      };
    case 7777777:
      return {
        creator_contract: ZORA_NFT_CREATOR_PROXY_ZORA,
        rewards_contract: ZORA_PROTOCOL_REWARDS_ZORA,
        explorer: "https://explorer.zora.energy",
        bridge: "https://bridge.zora.energy/",
        chainId: 7777777,
      };
    case 84532:
      return {
        creator_contract: ZORA_NFT_CREATOR_PROXY_BASE_TESTNET,
        rewards_contract: ZORA_PROTOCOL_REWARDS_BASE_TESTNET,
        explorer: "https://sepolia.basescan.org",
        bridge: "https://sepolia-bridge.base.org/deposit",
        chainId: 84532,
      };
    case 420:
      return {
        creator_contract: ZORA_NFT_CREATOR_PROXY_OP_TESTNET,
        rewards_contract: ZORA_PROTOCOL_REWARDS_OP_TESTNET,
        explorer: "https://goerli-optimism.etherscan.io",
        bridge: "https://app.optimism.io/bridge/deposit",
        chainId: 420,
      };
    case 999:
      return {
        creator_contract: ZORA_NFT_CREATOR_PROXY_ZORA_TESTNET,
        rewards_contract: ZORA_PROTOCOL_REWARDS_ZORA_TESTNET,
        explorer: "https://testnet.explorer.zora.energy",
        bridge: "https://testnet.bridge.zora.energy",
        chainId: 999,
      };
    default:
      return {
        creator_contract: ZORA_NFT_CREATOR_PROXY_MAINNET,
        rewards_contract: ZORA_PROTOCOL_REWARDS_MAINNET,
        explorer: "https://etherscan.io",
        bridge: "https://app.uniswap.org/swap",
        chainId: 1,
      };
  }
};
