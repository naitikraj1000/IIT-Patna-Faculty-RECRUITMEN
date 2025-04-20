import Redis from 'ioredis';
import 'dotenv/config'; // OR use dotenv.config() in CommonJS


const redis = new Redis(process.env.REDIS_URL);

function connectRedis() {
    redis.on('connect', () => {
        console.log('Connected to Redis');
    });

    redis.on('error', (err) => {
        console.error('Redis error:', err);
    });
}

export default redis;
export { connectRedis };
