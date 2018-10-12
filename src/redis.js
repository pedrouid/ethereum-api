import redis from 'redis';

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

export let redisClient = null;

export function redisStart () {
  redisClient = redis.createClient(REDIS_PORT, REDIS_HOST);

  redisClient.on('connect', () => {
    console.log('REDIS: client connected');
  });

  redisClient.on('error', err => {
    console.log('REDIS: Something went wrong');
    console.error(err);
  });
}

export function redisWrite (key, value) {
  return new Promise((resolve, reject) => {
    redisClient.set(key, value, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}

export function redisRead (key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}
