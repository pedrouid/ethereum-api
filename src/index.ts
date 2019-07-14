import fastify from 'fastify'
import helmet from 'fastify-helmet'
import cors from 'fastify-cors'
import config from './config'
import {
  apiGetAccountAssets,
  apiGetAccountTransactions,
  apiGetAccountNativeCurrency,
  apiGetAccountTokenAsset
} from './blockscout'
import { apiGetGasPrices, apiGetGasGuzzlers } from './gas-price'
import {
  rpcGetAccountNonce,
  rpcGetGasLimit,
  rpcGetBlockNumber,
  rpcGetCustomRequest
} from './rpc'
import { sanitizeHex } from './utilities'
import { convertStringToNumber } from './bignumber'
import supportedChains from './chains'
import { apiGetAccountCollectibles } from './opensea'
import { apiGetEthPrices, apiGetDaiPrices } from './cryptocompare'

const app = fastify({ logger: config.debug })

app.register(helmet)
app.register(cors)

app.get('/hello', (req, res) => {
  res.status(200).send(`Hello World`)
})

app.get('/account-balance', async (req, res) => {
  const address = sanitizeHex(req.query.address)
  const chainId = convertStringToNumber(req.query.chainId)

  if (!address || typeof address !== 'string') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid address parameter'
    })
  }

  if (!chainId || typeof chainId !== 'number') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid chainId parameter'
    })
  }
  try {
    const nativeCurrency = await apiGetAccountNativeCurrency(address, chainId)

    res.status(200).send({
      success: true,
      result: nativeCurrency
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

app.get('/account-assets', async (req, res) => {
  const address = sanitizeHex(req.query.address)
  const chainId = convertStringToNumber(req.query.chainId)

  if (!address || typeof address !== 'string') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid address parameter'
    })
  }

  if (!chainId || typeof chainId !== 'number') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid chainId parameter'
    })
  }
  try {
    const assets = await apiGetAccountAssets(address, chainId)

    res.status(200).send({
      success: true,
      result: assets
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

app.get('/account-transactions', async (req, res) => {
  const address = sanitizeHex(req.query.address)
  const chainId = convertStringToNumber(req.query.chainId)

  if (!address || typeof address !== 'string') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid address parameter'
    })
  }

  if (!chainId || typeof chainId !== 'number') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid chainId parameter'
    })
  }

  try {
    const transactions = await apiGetAccountTransactions(address, chainId)

    res.status(200).send({
      success: true,
      result: transactions
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

app.get('/account-nonce', async (req, res) => {
  const address = sanitizeHex(req.query.address)
  const chainId = convertStringToNumber(req.query.chainId)

  if (!address || typeof address !== 'string') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid address parameter'
    })
  }

  if (!chainId || typeof chainId !== 'number') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid chainId parameter'
    })
  }

  try {
    const nonce = await rpcGetAccountNonce(address, chainId)

    res.status(200).send({
      success: true,
      result: nonce
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

app.get('/account-collectibles', async (req, res) => {
  const address = sanitizeHex(req.query.address)

  if (!address || typeof address !== 'string') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid address parameter'
    })
  }

  try {
    const collectibles = await apiGetAccountCollectibles(address)

    res.status(200).send({
      success: true,
      result: collectibles
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

app.get('/token-balance', async (req, res) => {
  const address = sanitizeHex(req.query.address)
  const chainId = convertStringToNumber(req.query.chainId)
  const contractAddress = sanitizeHex(req.query.contractAddress)

  if (!address || typeof address !== 'string') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid address parameter'
    })
  }

  if (!chainId || typeof chainId !== 'number') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid chainId parameter'
    })
  }

  if (!contractAddress || typeof contractAddress !== 'string') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid contractAddress parameter'
    })
  }

  try {
    const tokenAsset = await apiGetAccountTokenAsset(
      address,
      chainId,
      contractAddress
    )

    res.status(200).send({
      success: true,
      result: tokenAsset
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

app.get('/gas-limit', async (req, res) => {
  const contractAddress = sanitizeHex(req.query.contractAddress)
  const data = sanitizeHex(req.query.data) || '0x'
  const chainId = convertStringToNumber(req.query.chainId)

  if (!contractAddress || typeof contractAddress !== 'string') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid contractAddress parameter'
    })
  }

  if (!data || typeof data !== 'string') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid data parameter'
    })
  }

  if (!chainId || typeof chainId !== 'number') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid chainId parameter'
    })
  }

  try {
    const gasLimit = await rpcGetGasLimit(contractAddress, data)

    res.status(200).send({
      success: true,
      result: gasLimit
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

app.get('/gas-prices', async (req, res) => {
  try {
    const gasPrices = await apiGetGasPrices()

    res.status(200).send({
      success: true,
      result: gasPrices
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

app.get('/gas-guzzlers', async (req, res) => {
  try {
    const gasGuzzlers = await apiGetGasGuzzlers()

    res.status(200).send({
      success: true,
      result: gasGuzzlers
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

app.get('/eth-prices', async (req, res) => {
  let fiat = req.query.fiat

  if (!fiat || typeof fiat !== 'string') {
    fiat = 'USD,EUR,GBP'
  }

  try {
    const ethPrices = await apiGetEthPrices(fiat)

    res.status(200).send({
      success: true,
      result: ethPrices
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

app.get('/dai-prices', async (req, res) => {
  let fiat = req.query.fiat

  if (!fiat || typeof fiat !== 'string') {
    fiat = 'USD,EUR,GBP'
  }

  try {
    const daiPrices = await apiGetDaiPrices(fiat)

    res.status(200).send({
      success: true,
      result: daiPrices
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

app.get('/block-number', async (req, res) => {
  const chainId = convertStringToNumber(req.query.chainId)

  if (!chainId || typeof chainId !== 'number') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid chainId parameter'
    })
  }

  try {
    const blockNumber = await rpcGetBlockNumber(chainId)

    res.status(200).send({
      success: true,
      result: blockNumber
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

app.post('/custom-request', async (req, res) => {
  const chainId = convertStringToNumber(req.query.chainId)

  if (!chainId || typeof chainId !== 'number') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid chainId parameter'
    })
  }

  try {
    const response = await rpcGetCustomRequest(chainId, req.body)

    res.status(200).send({
      success: true,
      result: response
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

app.get('/supported-chains', async (req, res) => {
  res.status(200).send({
    success: true,
    result: supportedChains
  })
})

app.listen(config.port, (error: Error) => {
  if (error) {
  }
})
