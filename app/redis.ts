import redis from 'redis'

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1'
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379

export let redisClient: any

export function redisStart () {
  redisClient = redis.createClient(REDIS_PORT, REDIS_HOST)

  redisClient.on('connect', () => {
    console.log('REDIS: client connected')
  })

  redisClient.on('error', (err: Error) => {
    console.log('REDIS: Something went wrong')
    console.error(err)
  })
}

export function redisWrite (key: string, value: string) {
  return new Promise((resolve, reject) => {
    redisClient.set(key, value, (error: any, result: any) => {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}

export function redisRead (key: string) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, function (error: any, result: any) {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}
