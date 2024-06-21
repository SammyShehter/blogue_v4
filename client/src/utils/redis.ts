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
export const deleteSession = async (hash: string) =>
    await redis.del(`user:${hash}`)

export const sendDraftToRedis = async (
    draftKey: string,
    data: {content: string; title: string; category: string}
) => await redis.set(`draft:${draftKey}`, JSON.stringify(data))
export const getDraft = async (draftKey: string) =>
    await redis.get(`draft:${draftKey}`)
export const getDraftRaw = async (draftKey: string) =>
    await redis.get(draftKey)
export const deleteDraft = async (draftKey: string) =>
    await redis.del(`draft:${draftKey}`)
export const getAllDraftKeys = async () => {
    const keys = await redis.keys("draft:*")
    return keys
}

export default redis
