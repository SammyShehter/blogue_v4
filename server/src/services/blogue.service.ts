import axios from "axios"
import {Post, generatedPost, newPost, rawEditPost} from "../types/post.types"
import {ErrorCodes} from "../utils/errorCodes"
import mongoService from "./mongo.service"
import {formattedTime} from "../utils/common"

const cachedPosts = new Map<string, Post>()
const cachedPaginatedPosts: Array<Array<Post>> = []
const featuredPosts = new Map<string, Post>()
let maxBatch = 0

export const lastPosts = async () => {
    const posts = await mongoService.fetchLastPosts()
    return posts
}

export const fetchPost = async (
    slug: string,
    updateCounter: boolean = true
) => {
    if (cachedPosts.has(slug)) {
        return cachedPosts.get(slug)
    }
    const post = await mongoService.fetchPost(slug)
    if (!post) throw ErrorCodes.POST_UNAVAILABLE
    updateCounter && mongoService.editPost({slug, views: post.views + 1})
    cachedPosts.set(slug, post)
    return post
}

export const deletePost = async (slug: string) => mongoService.deletePost(slug)

export const addPost = async (newPost: newPost, description?: string) => {
    if (!description) {
        description = "generate" // TODO: implement
    }
    const slug = newPost.title.toLowerCase().split(" ").join("-")
    const author = "Sammy Shehter"
    const date = formattedTime(Date.now())
    const post: Post = {
        ...newPost,
        slug,
        description,
        author,
        date,
        views: 1,
    }
    const addedPost = await mongoService.addPost(post)
    return addedPost
}

export const editPost = async (editPost: rawEditPost) => {
    const postEdits = JSON.parse(JSON.stringify(editPost))
    if (postEdits == null || !Object.keys(postEdits).length) {
        throw ErrorCodes.POST_CANT_BE_UPDATED
    }
    const editedPost = await mongoService.editPost(postEdits)
    return editedPost
}

export const askAItoGenerate = async (
    theme: string
): Promise<generatedPost> => {
    const response = await axios.post(
        "http://localhost:8000/blogue",
        {theme},
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
    return response.data.message
}

export const getPaginatedPosts = async (): Promise<{
    paginatedPosts: Array<Array<Post>>
    maxBatch: number
}> => {
    if (cachedPaginatedPosts.length) {
        return {
            paginatedPosts: cachedPaginatedPosts,
            maxBatch,
        }
    }
    const posts = await lastPosts()
    const paginatedPosts = []
    posts.forEach(async (post, index) => {
        if (!paginatedPosts[Math.floor(index / 2)]) {
            paginatedPosts[Math.floor(index / 2)] = []
        }
        paginatedPosts[Math.floor(index / 2)].push(post)
        featuredPosts.set(post.slug, post)
    })
    maxBatch = paginatedPosts.length
    return {paginatedPosts, maxBatch}
}

export const getPaginatedBatch = async (
    rawPage: string
): Promise<{
    paginatedBatch: Array<Post>
    maxBatch: number
}> => {
    if (!rawPage) {
        throw ErrorCodes.POSTS_BATCH_UNAVAILABLE(rawPage)
    }
    let page = +rawPage - 1
    if (!Number.isInteger(+page) || isNaN(+page)) {
        throw ErrorCodes.POSTS_BATCH_UNAVAILABLE(rawPage)
    }
    const {maxBatch, paginatedPosts} = await getPaginatedPosts()
    if (page > maxBatch) page = maxBatch
    if (page < 0) page = 1
    return {paginatedBatch: paginatedPosts[page], maxBatch: maxBatch+1}
}
