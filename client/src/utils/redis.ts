import Redis from "ioredis"
const redisConfig = {
    host: "localhost",
    port: 6379,
    password: process.env.REDIS_PASS,
}
const redis = new Redis(redisConfig)
export default redis
