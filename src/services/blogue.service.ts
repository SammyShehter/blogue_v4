import { newPost } from "../types/services/mongo.types"
import mongoService from "./mongo.service"

export const allPosts = async () => {
    const posts = await mongoService.fetchAllPosts()
    return posts
}

export const fetchPost = async (slug: string) => {
    const post = await mongoService.fetchPost(slug)
    return post
}

export const deletePost = async (slug: string) => mongoService.deletePost(slug)

export const addPost = async (newPost: newPost) => {
    const slug = "here we create slug"
    const description = "" // comes from ChatGPT?
    const author = "Sammy Shehter"
    const post = {
        ...newPost,
        slug,
        description,
        author
    }
    const addedPost = await mongoService.addPost(post)
    return addedPost
}