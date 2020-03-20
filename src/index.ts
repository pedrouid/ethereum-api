import fastify from "fastify";
import helmet from "fastify-helmet";
import cors from "fastify-cors";
import config from "./config";
import {
  apiGetAccountAssets,
  apiGetAccountTransactions,
  apiGetAccountNativeCurrency,
  apiGetAccountTokenAsset,
} from "./blockscout";
import { apiGetGasPrices, apiGetGasGuzzlers } from "./gas-price";
import {
  rpcGetAccountNonce,
  rpcGetGasLimit,
  rpcGetBlockNumber,
  rpcPostCustomRequest,
  rpcPostRequest,
} from "./rpc";
import { getChainData } from "./utilities";
import { convertStringToNumber } from "./bignumber";
import supportedChains from "./chains";
import { apiGetAccountCollectibles } from "./opensea";
import { apiGetEthPrices, apiGetDaiPrices } from "./cryptocompare";
import { verifyAddress, verifyChainId, verifyContractAddress, verifyData } from "./verifiers";
import { sendErrorMessage } from "./errors";

const app = fastify({ logger: config.debug });

app.register(helmet);
app.register(cors);

app.get("/health", (_, res) => {
  res.status(204).send();
});

app.get("/hello", (req, res) => {
  res.status(200).send(`Hello World`);
});

app.get("/account-balance", async (req, res) => {
  const address = verifyAddress(req, res);
  const chainId = verifyChainId(req, res);

  try {
    const nativeCurrency = await apiGetAccountNativeCurrency(address, chainId);

    res.status(200).send({
      success: true,
      result: nativeCurrency,
    });
  } catch (error) {
    console.error(error);
    sendErrorMessage(res, error);
  }
});

app.get("/account-assets", async (req, res) => {
  const address = verifyAddress(req, res);
  const chainId = verifyChainId(req, res);

  try {
    const assets = await apiGetAccountAssets(address, chainId);

    res.status(200).send({
      success: true,
      result: assets,
    });
  } catch (error) {
    console.error(error);
    sendErrorMessage(res, error);
  }
});

app.get("/account-transactions", async (req, res) => {
  const address = verifyAddress(req, res);
  const chainId = verifyChainId(req, res);

  try {
    const transactions = await apiGetAccountTransactions(address, chainId);

    res.status(200).send({
      success: true,
      result: transactions,
    });
  } catch (error) {
    console.error(error);
    sendErrorMessage(res, error);
  }
});

app.get("/account-nonce", async (req, res) => {
  const address = verifyAddress(req, res);
  const chainId = verifyChainId(req, res);

  try {
    const nonce = await rpcGetAccountNonce(address, chainId);

    res.status(200).send({
      success: true,
      result: nonce,
    });
  } catch (error) {
    console.error(error);
    sendErrorMessage(res, error);
  }
});

app.get("/account-collectibles", async (req, res) => {
  const address = verifyAddress(req, res);

  try {
    const collectibles = await apiGetAccountCollectibles(address);

    res.status(200).send({
      success: true,
      result: collectibles,
    });
  } catch (error) {
    console.error(error);
    sendErrorMessage(res, error);
  }
});

app.get("/token-balance", async (req, res) => {
  const contractAddress = verifyContractAddress(req, res);
  const address = verifyAddress(req, res);
  const chainId = verifyChainId(req, res);

  try {
    const tokenAsset = await apiGetAccountTokenAsset(address, chainId, contractAddress);

    res.status(200).send({
      success: true,
      result: tokenAsset,
    });
  } catch (error) {
    console.error(error);
    sendErrorMessage(res, error);
  }
});

app.get("/gas-limit", async (req, res) => {
  const contractAddress = verifyContractAddress(req, res);
  const data = verifyData(req, res);
  verifyChainId(req, res);

  try {
    const gasLimit = await rpcGetGasLimit(contractAddress, data);

    res.status(200).send({
      success: true,
      result: gasLimit,
    });
  } catch (error) {
    console.error(error);
    sendErrorMessage(res, error);
  }
});

app.get("/gas-prices", async (req, res) => {
  try {
    const gasPrices = await apiGetGasPrices();

    res.status(200).send({
      success: true,
      result: gasPrices,
    });
  } catch (error) {
    console.error(error);
    sendErrorMessage(res, error);
  }
});

app.get("/gas-guzzlers", async (req, res) => {
  try {
    const gasGuzzlers = await apiGetGasGuzzlers();

    res.status(200).send({
      success: true,
      result: gasGuzzlers,
    });
  } catch (error) {
    console.error(error);
    sendErrorMessage(res, error);
  }
});

app.get("/eth-prices", async (req, res) => {
  let fiat = req.query.fiat;

  if (!fiat || typeof fiat !== "string") {
    fiat = "USD,EUR,GBP";
  }

  try {
    const ethPrices = await apiGetEthPrices(fiat);

    res.status(200).send({
      success: true,
      result: ethPrices,
    });
  } catch (error) {
    console.error(error);
    sendErrorMessage(res, error);
  }
});

app.get("/dai-prices", async (req, res) => {
  let fiat = req.query.fiat;

  if (!fiat || typeof fiat !== "string") {
    fiat = "USD,EUR,GBP";
  }

  try {
    const daiPrices = await apiGetDaiPrices(fiat);

    res.status(200).send({
      success: true,
      result: daiPrices,
    });
  } catch (error) {
    console.error(error);
    sendErrorMessage(res, error);
  }
});

app.get("/block-number", async (req, res) => {
  const chainId = verifyChainId(req, res);

  try {
    const blockNumber = await rpcGetBlockNumber(chainId);

    res.status(200).send({
      success: true,
      result: blockNumber,
    });
  } catch (error) {
    console.error(error);
    sendErrorMessage(res, error);
  }
});

app.post("/custom-request", async (req, res) => {
  const chainId = verifyChainId(req, res);

  try {
    const result = await rpcPostCustomRequest(chainId, req.body);

    res.status(200).send({
      success: true,
      result: result,
    });
  } catch (error) {
    console.error(error);
    sendErrorMessage(res, error);
  }
});

app.post("/rpc", async (req, res) => {
  const chainId = convertStringToNumber(req.query.chainId);

  // tslint:disable-next-line:strict-type-predicates
  if (!chainId || typeof chainId !== "number") {
    res.status(200).send({
      id: req.body.id,
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Missing or invalid chainId parameter",
      },
    });
  }

  try {
    const response = await rpcPostRequest(chainId, req.body);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(200).send({
      id: req.body.id,
      jsonrpc: "2.0",
      error: {
        code: -32603,
        message: "Internal error",
      },
    });
  }
});

app.get("/chain-data", async (req, res) => {
  const chainId = verifyChainId(req, res);

  try {
    const chainData = getChainData(chainId, true);

    res.status(200).send({
      success: true,
      result: chainData,
    });
  } catch (error) {
    console.error(error);
    sendErrorMessage(res, error);
  }
});

app.get("/supported-chains", async (req, res) => {
  res.status(200).send({
    success: true,
    result: supportedChains,
  });
});

app.listen(config.port, (error: Error) => {
  if (error) {
    console.error(error);
  }
});
