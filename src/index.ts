import fastify from 'fastify'
import helmet from 'fastify-helmet'
import cors from 'fastify-cors'
import config from './config'
import { apiGetAccountAssets, apiGetAccountTransactions } from './blockscout'
import { apiGetGasPrices } from './gas-price'
import { apiGetAccountNonce } from './rpc'
import { sanitizeHex } from './utilities'
import { convertStringToNumber } from './bignumber'

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
      result: 'Missing address parameter'
    })
  }

  if (!chainId || typeof chainId !== 'number') {
    res.status(500).send({
      success: false,
      result: 'Missing chainId parameter'
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
      result: 'Missing address parameter'
    })
  }

  if (!chainId || typeof chainId !== 'number') {
    res.status(500).send({
      success: false,
      result: 'Missing chainId parameter'
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
      result: 'Missing address parameter'
    })
  }

  if (!chainId || typeof chainId !== 'number') {
    res.status(500).send({
      success: false,
      result: 'Missing chainId parameter'
    })
  }

  const nonce = await apiGetAccountNonce(address, chainId)

  res.status(200).send({
    success: true,
    result: nonce
  })
})

app.get('/gas-prices', async (req, res) => {
  const gasPrices = await apiGetGasPrices()

  res.status(200).send({
    success: true,
    result: gasPrices
  })
})

app.listen(config.port, (error: Error) => {
  if (error) {
    return console.log('Something went wrong', error)
  }

  console.log('Server listening on port', config.port)
})
