import fastify from 'fastify'
import helmet from 'fastify-helmet'
import cors from 'fastify-cors'
import config from './config'
import { apiGetAccountAssets, apiGetAccountTransactions } from './blockscout'
import { apiGetGasPrices } from './gas-price'
import { apiGetAccountNonce, apiGetGasLimit } from './rpc'
import { sanitizeHex } from './utilities'
import { convertStringToNumber } from './bignumber'
import supportedChains from './chains'

const app = fastify({ logger: config.debug })

app.register(helmet)
app.register(cors)

app.get('/hello', (req, res) => {
  res.status(200).send(`Hello World`)
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

  const assets = await apiGetAccountAssets(address, chainId)

  res.status(200).send({
    success: true,
    result: assets
  })
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

  const transactions = await apiGetAccountTransactions(address, chainId)

  res.status(200).send({
    success: true,
    result: transactions
  })
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

  const nonce = await apiGetAccountNonce(address, chainId)

  res.status(200).send({
    success: true,
    result: nonce
  })
})

app.get('/gas-limit', async (req, res) => {
  const contractAddress = sanitizeHex(req.query.contractAddress)
  console.log('contractAddress', contractAddress)
  const data = sanitizeHex(req.query.data)
  console.log('data', data)
  const chainId = convertStringToNumber(req.query.chainId)
  console.log('chainId', chainId)

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

  const gasLimit = await apiGetGasLimit(contractAddress, data)

  res.status(200).send({
    success: true,
    result: gasLimit
  })
})

app.get('/gas-prices', async (req, res) => {
  const gasPrices = await apiGetGasPrices()

  res.status(200).send({
    success: true,
    result: gasPrices
  })
})

app.get('/supported-chains', async (req, res) => {
  res.status(200).send({
    success: true,
    result: supportedChains
  })
})

app.listen(config.port, (error: Error) => {
  if (error) {
    return console.log('Something went wrong', error)
  }

  console.log('Server listening on port', config.port)
})
