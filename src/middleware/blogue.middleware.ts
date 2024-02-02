import {body, param} from "express-validator"
import {validate} from "./common.middleware"
import {NextFunction, Request, Response} from "express"
import {handleError} from "../utils/common"
import * as blogueService from "../services/blogue.service"
import { ErrorCodes } from "../utils/errorCodes"

export const inputChecks = validate([
    body("title")
        .exists()
        .withMessage(`Please provide a title`)
        .notEmpty()
        .withMessage(`Please provide a title`)
        .trim()
        .escape()
        .isString()
        .withMessage(`Please send the title as a string`)
        .isLength({max: 50})
        .withMessage(`Please limit title to 50 characters`),
    body("category")
        .exists()
        .withMessage(`Please provide a category`)
        .notEmpty()
        .withMessage(`Please provide a category`)
        .isLowercase()
        .withMessage(`Please provide a category in lower case`)
        .trim()
        .escape()
        .isString()
        .withMessage(`Please send the category as a string`),
    body("content")
        .exists()
        .withMessage(`Please provide a content`)
        .notEmpty()
        .withMessage(`Please provide a content`)
        .trim()
        .escape()
        .isString()
        .withMessage(`Please send the content as a string`),
])

export const editInputChecks = validate([
    param("slug")
        .exists()
        .withMessage(`Please provide a slug`)
        .notEmpty()
        .withMessage(`Please provide a slug`)
        .trim()
        .escape()
        .isString()
        .withMessage(`Please send the slug as a string`)
        .isLength({max: 50})
        .withMessage(`Please limit slug to 50 characters`),
    body("title")
        .optional()
        .exists()
        .withMessage(`Please provide a title`)
        .notEmpty()
        .withMessage(`Please provide a title`)
        .trim()
        .escape()
        .isString()
        .withMessage(`Please send the title as a string`)
        .isLength({max: 50})
        .withMessage(`Please limit username to 50 title`),
    body("category")
        .optional()
        .exists()
        .withMessage(`Please provide a category`)
        .notEmpty()
        .withMessage(`Please provide a category`)
        .trim()
        .escape()
        .isString()
        .withMessage(`Please send the category as a string`),
    body("content")
        .optional()
        .exists()
        .withMessage(`Please provide a content`)
        .notEmpty()
        .withMessage(`Please provide a content`)
        .trim()
        .escape()
        .isString()
        .withMessage(`Please send the content as a string`),
])
export const promtCheck = validate([
    body("theme")
        .exists()
        .withMessage(`Please provide a theme`)
        .notEmpty()
        .withMessage(`Please provide a theme`)
        .trim()
        .escape()
        .isString()
        .withMessage(`Please send the theme as a string`)
        .isLength({max: 100})
        .withMessage(`Please limit theme to 50 characters`),
])

export const postExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const postSlug = req.params.slug
        const exists = await blogueService.fetchPost(postSlug, false)
        if(!exists?.slug) throw ErrorCodes.POST_UNAVAILABLE
        next()
    } catch (error) {
        return handleError(error, res)
    }
}
