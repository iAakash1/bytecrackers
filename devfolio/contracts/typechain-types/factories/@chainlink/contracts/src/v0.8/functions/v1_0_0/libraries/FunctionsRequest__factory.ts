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
import type { NonPayableOverrides } from "../../../../../../../../common";
import type {
  FunctionsRequest,
  FunctionsRequestInterface,
} from "../../../../../../../../@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest";

const _abi = [
  {
    inputs: [],
    name: "EmptyArgs",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptySecrets",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptySource",
    type: "error",
  },
  {
    inputs: [],
    name: "NoInlineSecrets",
    type: "error",
  },
  {
    inputs: [],
    name: "REQUEST_DATA_VERSION",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080806040523460175760759081601d823930815050f35b600080fdfe6080806040526004361015601257600080fd5b60003560e01c635d641dfc14602657600080fd5b6000366003190112603a5780600160209252f35b600080fdfea2646970667358221220cda3ef2126951d16a0f96e298d8a0fb837d242f3defdd992ae4232f814716b3c64736f6c63430008190033";

type FunctionsRequestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FunctionsRequestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FunctionsRequest__factory extends ContractFactory {
  constructor(...args: FunctionsRequestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      FunctionsRequest & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): FunctionsRequest__factory {
    return super.connect(runner) as FunctionsRequest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FunctionsRequestInterface {
    return new Interface(_abi) as FunctionsRequestInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): FunctionsRequest {
    return new Contract(address, _abi, runner) as unknown as FunctionsRequest;
  }
}
