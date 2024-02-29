import { Request, Response } from "express"
import * as blogueService from "../services/blogue.service"
import { handleError, handleSuccess } from "../utils/common"
import {
    newPost,
    rawEditPost
} from "../types/post.types"

export const fetchLastPosts = async (req: Request, res: Response) => {
    try {
        const posts = await blogueService.lastPosts()
        return handleSuccess(posts, res)
    } catch (error: any) {
        return handleError(error, res)
    }
}

export const fetchPost = async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug
        const post = await blogueService.fetchPost(slug)
        return handleSuccess(post, res)
    } catch (error) {
        return handleError(error, res)
    }
}

export const getPaginatedBatch = async (req: Request, res: Response) => {
    try {
        const page = req.params.page
        const batch = await blogueService.getPaginatedBatch(page)
        return handleSuccess(batch, res)
    } catch (error) {
        return handleError(error, res)
    }
}

export const addPost = async (req: Request, res: Response) => {
    try {
        const {content, title, category}: newPost = req.body
        const addedPost = await blogueService.addPost({
            content,
            title,
            category,
        })
        return handleSuccess(
            {message: "Post added succesfully!", slug: addedPost.slug},
            res
        )
    } catch (error) {
        return handleError(error, res)
    }
}

export const editPost = async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug
        const {content, title, category, description}: rawEditPost = req.body
        const editedPost = await blogueService.editPost({
            content,
            title,
            category,
            slug,
            description,
        })
        return handleSuccess(
            {message: "Post edited succesfully!", slug: editedPost.slug},
            res
        )
    } catch (error) {
        return handleError(error, res)
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        req.params.slug && blogueService.deletePost(req.params.slug)
        return handleSuccess({message: "Post deleted succesfully!"}, res)
    } catch (error) {
        return handleError(error, res)
    }
}

export const generatePost = async (req: Request, res: Response) => {
    try {
        const theme = req.body.theme
        const {description, content, title} = await blogueService.askAItoGenerate(theme)
        const addedPost = await blogueService.addPost(
            {
                content,
                title,
                category: "new",
            },
            description
        )
        return handleSuccess(
            {message: "Post generated succesfully!", slug: addedPost.slug},
            res
        )
    } catch (error) {
        return handleError(error, res)
    }
}
