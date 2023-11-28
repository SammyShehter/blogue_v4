import mongoService from "./mongo.service"

export const allPosts = async () => {
    const posts = await mongoService.fetchAllPosts()
    return posts
}