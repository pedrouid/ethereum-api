import BN from "bn.js";
import * as encUtils from "enc-utils";

import { IChainData } from "./types";
import config from "./config";
import supportedChains from "./chains";

export const debounceRequest = (
  request: Function,
  params: Array<any>,
  timeout: number,
): Promise<any> => {
  return new Promise((resolve, reject) =>
    setTimeout(
      () =>
        request(...params)
          .then((res: any) => resolve(res))
          .catch((err: Error) => reject(err)),
      timeout,
    ),
  );
};

export const capitalize = (value: string): string =>
  value
    .split(" ")
    .map((word: string): string => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

export const getDataString = (func: string, arrVals: Array<any>): string => {
  let val = "";
  for (let i = 0; i < arrVals.length; i++) val += encUtils.padLeft(arrVals[i], 64);
  const data = func + val;
  return data;
};

export function getChainData(chainId: number, noInfuraKeys?: boolean): IChainData {
  const chainData = supportedChains.filter((chain: any) => chain.chain_id === chainId)[0];

  if (!chainData) {
    throw new Error("ChainId missing or not supported");
  }

  if (!noInfuraKeys) {
    const INFURA_ID = config.infura.id;

    if (
      INFURA_ID &&
      chainData.rpc_url.includes("infura.io") &&
      chainData.rpc_url.includes("INFURA_ID")
    ) {
      chainData.rpc_url = chainData.rpc_url.replace("INFURA_ID", INFURA_ID);
    }
  }

  return chainData;
}

export const multiply = (a: number | string, b: number | string): string => {
  return new BN(a).mul(new BN(b)).toString();
};

export const divide = (a: number | string, b: number | string): string => {
  return new BN(a).div(new BN(b)).toString();
};

export const isNumber = (value: string | number): boolean => {
  if (typeof value === "string") {
    try {
      const bn = new BN(value, value.startsWith("0x") ? "hex" : undefined);
      return typeof bn.toNumber() !== "undefined";
    } catch (e) {
      return false;
    }
  }
  return true;
};

export const isHexStrict = (hex: string) => {
  return (typeof hex === "string" || isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex);
};

export function isSuccessful(response: any) {
  return response.data && response.data.status !== "0";
}
