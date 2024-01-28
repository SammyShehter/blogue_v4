import express = require("express")
import {decodedUser} from "../../src/common/common.types"

declare global {
    namespace Express {
        interface Request {
            user: decodedUser
            operationID: string
            data: {
                /**
                 * used in addPost
                 */
                category
                /**
                 * used in addPost
                 */
                title
                /**
                 * used in addPost
                 */
                content: string
                /**
                 * Used in:
                 * fetchPost,
                 * deletePost
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
