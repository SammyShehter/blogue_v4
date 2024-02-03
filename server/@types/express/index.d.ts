import express = require("express")
import {decodedUser} from "../../src/common/common.types"

declare global {
    namespace Express {
        interface Request {
            user: decodedUser
            operationID: string
            data: {
                /**
                 * used in addPost,
                 * editPost
                 */
                category
                /**
                 * used in addPost,
                 * editPost
                 */
                title
                /**
                 * used in addPost,
                 * editPost
                 */
                content: string
                /**
                 * Used in:
                 * fetchPost,
                 * deletePost,
                 * editPost
                 */
                slug: string
            }
        }
        interface Response {
            operationID: string
        }
    }
}

declare module "http" {
    interface IncomingHttpHeaders {
        apikey?: string
        host: string
    }
}
