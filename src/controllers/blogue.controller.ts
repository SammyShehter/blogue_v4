import { Request, Response } from "express"
import * as blogueService from "../services/blogue.service"
import { handleError, handleSuccess } from "../utils/common"

export const fetchAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await blogueService.allPosts()
        return handleSuccess(posts, res)
    } catch (error: any) {
        return handleError(error, res)
    }
}

export const fetchPost = async (req: Request, res: Response) => {
    try {
        const slug = req.data.slug
        const post = await blogueService.fetchPost(slug)
        return handleSuccess(post, res)
    } catch (error) {
        return handleSuccess(error, res)
    }
}

export const addPost = async (req: Request, res: Response) => {
    try {
        const { content, title, category } = req.data
        const addedPost = await blogueService.addPost({ content, title, category })
        return handleSuccess({ message: "Post added succesfully!", slug: addedPost.slug }, res)
    } catch (error) {
        return handleSuccess(error, res)
    }
}

export const editPost = async (req: Request, res: Response) => {
    try {
        return handleSuccess("Post edited succesfully!", res)
    } catch (error) {
        return handleSuccess(error, res)
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        await blogueService.deletePost(req.data.slug)
        return handleSuccess("Post deleted succesfully!", res)
    } catch (error) {
        return handleSuccess(error, res)
    }
}
