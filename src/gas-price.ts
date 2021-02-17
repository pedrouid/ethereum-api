import axios, { AxiosInstance } from "axios";
import * as encUtils from "enc-utils";

import { IGasPrices, IGasGuzzlerRaw, IGasGuzzler } from "./types";
import { divide, multiply } from "./utilities";

const api: AxiosInstance = axios.create({
  baseURL: "https://ethgasstation.info/",
  timeout: 30000, // 30 secs
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const apiGetGasPrices = async (): Promise<IGasPrices> => {
  const { data } = await api.get(`/json/ethgasAPI.json`);
  const result: IGasPrices = {
    timestamp: Date.now(),
    slow: {
      time: encUtils.utf8ToNumber(multiply(data.safeLowWait, 60)),
      price: encUtils.utf8ToNumber(divide(data.safeLow, 10)),
    },
    average: {
      time: encUtils.utf8ToNumber(multiply(data.avgWait, 60)),
      price: encUtils.utf8ToNumber(divide(data.average, 10)),
    },
    fast: {
      time: encUtils.utf8ToNumber(multiply(data.fastestWait, 60)),
      price: encUtils.utf8ToNumber(divide(data.fastest, 10)),
    },
  };
  return result;
};

export const apiGetGasGuzzlers = async (): Promise<IGasGuzzler[]> => {
  const { data } = await api.get(`/json/gasguzz.json`);
  const result = data.map((guzzlerRaw: IGasGuzzlerRaw) => ({
    address: guzzlerRaw.to_address,
    pct: encUtils.utf8ToNumber(`${guzzlerRaw.pcttot}`).toFixed(2),
    gasused: encUtils.utf8ToNumber(String(guzzlerRaw.gasused)),
    id: guzzlerRaw.ID,
  }));
  return result;
};
