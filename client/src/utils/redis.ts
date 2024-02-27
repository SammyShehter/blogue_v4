import Redis from "ioredis"
const redisConfig = {
    host: "localhost",
    port: 6379,
    password: process.env.REDIS_PASS,
}
const redis = new Redis(redisConfig)
redis.on("error", (error: unknown) => {
    console.warn("[Redis] Error connecting", error)
})
export const userData = async (hash: string) => await redis.get(`user:${hash}`)
export const deleteSession = async (hash: string) => await redis.del(`user:${hash}`)
export default redis
