import BN from "bn.js";
import * as encUtils from "enc-utils";
import { formatJsonRpcRequest, JsonRpcRequest, RequestArguments } from "@json-rpc-tools/utils";
import axios, { AxiosResponse } from "axios";

import { getChainData } from "./utilities";

export const rpcGetAccountBalance = async (address: string, chainId: number): Promise<number> => {
  const rpcUrl = getChainData(chainId).rpc_url;

  if (!rpcUrl && typeof rpcUrl !== "string") {
    throw new Error("Invalid or missing rpc url");
  }
  const request = formatJsonRpcRequest("eth_getBalance", [address, "latest"]);
  const response = await axios.post(rpcUrl, request);

  const balance = new BN(
    encUtils.removeHexPrefix(encUtils.sanitizeHex(response.data.result)),
    "hex",
  ).toNumber();
  return balance;
};

export const rpcGetAccountNonce = async (address: string, chainId: number): Promise<number> => {
  const rpcUrl = getChainData(chainId).rpc_url;

  if (!rpcUrl && typeof rpcUrl !== "string") {
    throw new Error("Invalid or missing rpc url");
  }
  const request = formatJsonRpcRequest("eth_getTransactionCount", [address, "pending"]);
  const response = await axios.post(rpcUrl, request);

  const nonce = encUtils.hexToNumber(response.data.result);
  return nonce;
};

export const rpcGetGasLimit = async (contractAddress: string, data: string): Promise<number> => {
  const chainId = 1;

  const rpcUrl = getChainData(chainId).rpc_url;

  const request = formatJsonRpcRequest("eth_estimateGas", [{ to: contractAddress, data }]);
  const response = await axios.post(rpcUrl, request);
  const gasLimit = encUtils.hexToNumber(response.data.result);
  return gasLimit;
};

export const rpcGetBlockNumber = async (chainId: number): Promise<number> => {
  const rpcUrl = getChainData(chainId).rpc_url;

  if (!rpcUrl && typeof rpcUrl !== "string") {
    throw new Error("Invalid or missing rpc url");
  }
  const request = formatJsonRpcRequest("eth_blockNumber", []);

  const response = await axios.post(rpcUrl, request);
  const blockNumber = encUtils.hexToNumber(response.data.result);
  return blockNumber;
};

export const rpcPostCustomRequest = async (
  chainId: number,
  customRpc: RequestArguments & { id?: number },
): Promise<any> => {
  const rpcUrl = getChainData(chainId).rpc_url;

  if (!rpcUrl && typeof rpcUrl !== "string") {
    throw new Error("Invalid or missing rpc url");
  }

  const request = formatJsonRpcRequest(customRpc.method, customRpc.params, customRpc.id);
  const response = await axios.post(rpcUrl, request);

  return response.data.result;
};

export const rpcPostRequest = async (
  chainId: number,
  request: JsonRpcRequest,
): Promise<AxiosResponse> => {
  const rpcUrl = getChainData(chainId).rpc_url;

  if (!rpcUrl && typeof rpcUrl !== "string") {
    throw new Error("Invalid or missing rpc url");
  }

  const response = await axios.post(rpcUrl, request);

  return response;
};
