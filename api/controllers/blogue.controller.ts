import {allPosts} from "../../src/services/blogue.service"
import {handleError, handleSuccess} from "../../src/utils/common"
import {Request, Response} from "express"

export const fetchAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await allPosts()
        return handleSuccess(posts, res)
    } catch (error: any) {
        return handleError(error, res)
    }
}
