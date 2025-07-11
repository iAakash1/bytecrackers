/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type {
  ERC721A,
  ERC721AInterface,
} from "../../../../erc721a/contracts/ERC721A.sol/ERC721A";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ApprovalCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "ApprovalQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "BalanceQueryForZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintERC2309QuantityExceedsLimit",
    type: "error",
  },
  {
    inputs: [],
    name: "MintToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintZeroQuantity",
    type: "error",
  },
  {
    inputs: [],
    name: "NotCompatibleWithSpotMints",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnerQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnershipNotInitializedForExtraData",
    type: "error",
  },
  {
    inputs: [],
    name: "SequentialMintExceedsLimit",
    type: "error",
  },
  {
    inputs: [],
    name: "SequentialUpToTooSmall",
    type: "error",
  },
  {
    inputs: [],
    name: "SpotMintTokenIdTooSmall",
    type: "error",
  },
  {
    inputs: [],
    name: "TokenAlreadyExists",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFromIncorrectOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToNonERC721ReceiverImplementer",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "URIQueryForNonexistentToken",
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
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
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
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "toTokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "ConsecutiveTransfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "result",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523461016c576110618038038061001981610187565b92833981019060408183031261016c5780516001600160401b03929083811161016c57816100489184016101ac565b91602091602082015185811161016c5761006292016101ac565b918051938411610167576100808461007b600254610217565b610251565b602091601f85116001146100dc575092806100b6926100be956000926100d1575b50508160011b916000199060031b1c19161790565b6002556102fd565b60008055604051610c8190816103e08239f35b0151905038806100a1565b60026000529190601f1985167f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace936000905b82821061014f5750509160019391866100be979410610136575b505050811b016002556102fd565b015160001960f88460031b161c19169055388080610128565b8060018697829497870151815501960194019061010e565b610171565b600080fd5b634e487b7160e01b600052604160045260246000fd5b6040519190601f01601f191682016001600160401b0381118382101761016757604052565b919080601f8401121561016c5782516001600160401b038111610167576020906101de601f8201601f19168301610187565b9281845282828701011161016c5760005b81811061020457508260009394955001015290565b85810183015184820184015282016101ef565b90600182811c92168015610247575b602083101461023157565b634e487b7160e01b600052602260045260246000fd5b91607f1691610226565b601f811161025d575050565b60009060026000526020600020906020601f850160051c8301941061029d575b601f0160051c01915b82811061029257505050565b818155600101610286565b909250829061027d565b601f81116102b3575050565b60009060036000526020600020906020601f850160051c830194106102f3575b601f0160051c01915b8281106102e857505050565b8181556001016102dc565b90925082906102d3565b80519091906001600160401b038111610167576103248161031f600354610217565b6102a7565b602080601f831160011461035b5750819061035693946000926100d15750508160011b916000199060031b1c19161790565b600355565b6003600052601f198316949091907fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b926000905b8782106103c75750508360019596106103ae575b505050811b01600355565b015160001960f88460031b161c191690553880806103a3565b8060018596829496860151815501950193019061038f56fe6080604052600436101561001257600080fd5b60003560e01c806301ffc9a7146100f757806306fdde03146100f2578063081812fc146100ed578063095ea7b3146100e857806318160ddd146100e357806323b872dd146100de57806342842e0e146100d95780636352211e146100d457806370a08231146100cf57806395d89b41146100ca578063a22cb465146100c5578063b88d4fde146100c0578063c87b56dd146100bb5763e985e9c5146100b657600080fd5b6107e7565b61077f565b6106fb565b6105f8565b610532565b6104d7565b6104a8565b610485565b610471565b610419565b610363565b6102e4565b6101d5565b610113565b6001600160e01b031981160361010e57565b600080fd5b3461010e57602036600319011261010e576020600435610132816100fc565b63ffffffff60e01b166301ffc9a760e01b8114908115610170575b811561015f575b506040519015158152f35b635b5e139f60e01b14905038610154565b6380ac58cd60e01b8114915061014d565b919082519283825260005b8481106101ad575050826000602080949584010152601f8019910116010190565b60208183018101518483018201520161018c565b9060206101d2928181520190610181565b90565b3461010e576000806003193601126102e1576040519080600254906001918060011c92600182169283156102d7575b6020926020861085146102c35785885260208801949081156102a25750600114610249575b61024587610239818903826106bd565b604051918291826101c1565b0390f35b600260005294509192917f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace5b8386106102915750505091019050610239826102453880610229565b805485870152948201948101610275565b60ff191685525050505090151560051b019050610239826102453880610229565b634e487b7160e01b82526022600452602482fd5b93607f1693610204565b80fd5b3461010e57602036600319011261010e5760043561030181610a34565b15610326576000526006602052602060018060a01b0360406000205416604051908152f35b6333d1c03960e21b60005260046000fd5b600435906001600160a01b038216820361010e57565b602435906001600160a01b038216820361010e57565b604036600319011261010e57610377610337565b6001600160a01b0390602435908261038e83610ad2565b168033036103e7575b600093838552600660205260408520921691826bffffffffffffffffffffffff60a01b8254161790557f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258480a480f35b600081815260076020908152604080832033845290915290205460ff16610397576367d9dca160e11b60005260046000fd5b3461010e57600036600319011261010e5760206000546001549003604051908152f35b606090600319011261010e576001600160a01b0390600435828116810361010e5791602435908116810361010e579060443590565b61048361047d3661043c565b91610844565b005b6104836104913661043c565b906040519261049f8461069c565b600084526109f1565b3461010e57602036600319011261010e5760206001600160a01b036104ce600435610ad2565b16604051908152f35b3461010e57602036600319011261010e576001600160a01b036104f8610337565b168015610521576000526005602052602067ffffffffffffffff60406000205416604051908152f35b6323d3ad8160e21b60005260046000fd5b3461010e576000806003193601126102e1576040519080600354906001918060011c92600182169283156105ee575b6020926020861085146102c35785885260208801949081156102a257506001146105955761024587610239818903826106bd565b600360005294509192917fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b5b8386106105dd5750505091019050610239826102453880610229565b8054858701529482019481016105c1565b93607f1693610561565b3461010e57604036600319011261010e57610611610337565b6024359081151580920361010e573360009081526007602090815260408083206001600160a01b0385168452909152902060ff1981541660ff841617905560405191825260018060a01b0316907f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160203392a3005b634e487b7160e01b600052604160045260246000fd5b6020810190811067ffffffffffffffff8211176106b857604052565b610686565b90601f8019910116810190811067ffffffffffffffff8211176106b857604052565b67ffffffffffffffff81116106b857601f01601f191660200190565b608036600319011261010e5761070f610337565b61071761034d565b6064359167ffffffffffffffff831161010e573660238401121561010e57826004013591610744836106df565b9261075260405194856106bd565b808452366024828701011161010e57602081600092602461048398018388013785010152604435916109f1565b3461010e57602036600319011261010e5761079b600435610a34565b156107d65760006040516107ae8161069c565b526102456040516107be8161069c565b60008152604051918291602083526020830190610181565b630a14c4b560e41b60005260046000fd5b3461010e57604036600319011261010e57602060ff610838610807610337565b61080f61034d565b6001600160a01b0391821660009081526007865260408082209290931681526020919091522090565b54166040519015158152f35b91909161085082610ad2565b6001600160a01b0391821693908281168590036109ec57600084815260066020526040902080546108946001600160a01b03881633908114908314171590565b1590565b61099e575b610994575b506001600160a01b038516600090815260056020526040902080546000190190556001600160a01b0382166000908152600560205260409020805460010190556001600160a01b0382164260a01b17600160e11b17610907856000526004602052604060002090565b55600160e11b81161561094a575b501680927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600080a41561094557565b610ab0565b60018401610962816000526004602052604060002090565b541561096f575b50610915565b60005481146109695761098c906000526004602052604060002090565b553880610969565b600090553861089e565b6109e26108906109db336109c48b60018060a01b03166000526007602052604060002090565b9060018060a01b0316600052602052604060002090565b5460ff1690565b1561089957610a9f565b610a8f565b9291906109ff828286610844565b803b610a0c575b50505050565b610a1593610b94565b15610a235738808080610a06565b6368d2bf6b60e11b60005260046000fd5b90600091600080548210610a46575050565b9192505b808252600480602052604083205480610a8157508115610a6e575060001901610a4a565b634e487b7160e01b835260119052602482fd5b600160e01b16159392505050565b62a1148160e81b60005260046000fd5b632ce44b5f60e11b60005260046000fd5b633a954ecd60e21b60005260046000fd5b636f96cda160e11b60005260046000fd5b610ae6816000526004602052604060002090565b54908115610afd5750600160e01b8116610ac15790565b9050600090600054811015610ac1575b60001901600081815260046020526040902054908115610b485750600160e01b811615610b4357636f96cda160e11b8252600482fd5b905090565b9050610b0d565b9081602091031261010e57516101d2816100fc565b3d15610b8f573d90610b75826106df565b91610b8360405193846106bd565b82523d6000602084013e565b606090565b92602091610bdd93600060018060a01b0360405180978196829584630a85bd0160e11b9c8d86523360048701521660248501526044840152608060648401526084830190610181565b0393165af160009181610c1a575b50610c0c57610bf8610b64565b805115610c0757805190602001fd5b610a23565b6001600160e01b0319161490565b610c3d91925060203d602011610c44575b610c3581836106bd565b810190610b4f565b9038610beb565b503d610c2b56fea264697066735822122001ac94e33c1a3d4e7c6f12d596cd503e8c1ae5cb95aa11b22e1f51fc0accb03464736f6c63430008190033";

type ERC721AConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721AConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721A__factory extends ContractFactory {
  constructor(...args: ERC721AConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  override deploy(
    name_: string,
    symbol_: string,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<
      ERC721A & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERC721A__factory {
    return super.connect(runner) as ERC721A__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721AInterface {
    return new Interface(_abi) as ERC721AInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): ERC721A {
    return new Contract(address, _abi, runner) as unknown as ERC721A;
  }
}
