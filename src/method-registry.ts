import axios from "axios";
import * as encUtils from "enc-utils";

import { getChainData } from "./utilities";
import { IMethod } from "./types";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";

function parseSignature(signature: string) {
  let name = "";

  const nameMatches = signature.match(/\w+(?=\()/);

  if (nameMatches && nameMatches.length) {
    name = nameMatches[0];
  }

  name =
    name.charAt(0).toUpperCase() +
    name
      .slice(1)
      .split(/(?=[A-Z])/)
      .join(" ");

  let args: string[] = [];

  const argsMatches = signature.match(/\(.+\)/);

  if (argsMatches && argsMatches.length) {
    args = argsMatches[0].slice(1, -1).split(",");
  }

  const result = {
    name,
    args: args.map((arg: string) => ({ type: arg })),
  };

  return result;
}

const registryMap = {
  "1": "0x44691B39d1a75dC4E0A0346CBB15E310e6ED1E86",
};

export const lookupMethod = async (methodHash: string): Promise<IMethod | null> => {
  let result: any = null;

  const chainId = 1;
  const registryAddress = registryMap[chainId];
  const rpcUrl = getChainData(chainId).rpc_url;

  const functionHash = "0xb46bcdaa";
  const dataString = functionHash + encUtils.padRight(encUtils.removeHexPrefix(methodHash), 64);
  const request = formatJsonRpcRequest("eth_call", [
    {
      to: registryAddress,
      data: dataString,
    },
    "latest",
  ]);

  const response = await axios.post(rpcUrl, request);

  if (response.data && response.data.result) {
    const signature = encUtils.hexToUtf8(response.data.result).trim();
    if (signature) {
      const parsed = parseSignature(signature);

      result = { signature, ...parsed };
    }
  } else {
    const method = encUtils.removeHexPrefix(methodHash);
    const response = await axios.get(
      `https://raw.githubusercontent.com/ethereum-lists/4bytes/master/signatures/${method}`,
    );

    if (response.data) {
      const signature = response.data.trim();
      if (signature) {
        const parsed = parseSignature(signature);

        result = { signature, ...parsed };
      }
    }
  }

  return result;
};
