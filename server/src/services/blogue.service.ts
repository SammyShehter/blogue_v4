import axios from "axios"
import {
    generatedPost,
    newPost,
    rawEditPost,
} from "../types/services/mongo.types"
import {ErrorCodes} from "../utils/errorCodes"
import mongoService from "./mongo.service"

export const lastPosts = async () => {
    const posts = await mongoService.fetchLastPosts()
    return posts
}

export const fetchPost = async (
    slug: string,
    updateCounter: boolean = true
) => {
    const post = await mongoService.fetchPost(slug)
    if (!post) throw ErrorCodes.POST_UNAVAILABLE
    updateCounter && mongoService.editPost({slug, views: post.views + 1})
    return post
}

export const deletePost = async (slug: string) => mongoService.deletePost(slug)

export const addPost = async (newPost: newPost, description?: string) => {
    if (!description) {
        description = "generate" // TODO: implement
    }
    const slug = newPost.title.toLowerCase().split(" ").join("-")
    const author = "Sammy Shehter"
    const post = {
        ...newPost,
        slug,
        description,
        author,
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
