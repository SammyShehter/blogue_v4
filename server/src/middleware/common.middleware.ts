import {NextFunction, Request, Response} from "express"
import {validationResult} from "express-validator"
import {handleError} from "../utils/common"
import {ErrorCodes} from "../utils/errorCodes"

export const senderCheck = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.headers.inner_request || isNaN(+req.headers.inner_request)) {
            return handleError(
                ErrorCodes.ACCESS_DENIED(req.url, senderCheck.name),
                res
            )
        }
        next()
    } catch (error) {
        return handleError(
            ErrorCodes.ACCESS_DENIED(req.url, senderCheck.name),
            res
        )
    }
}

const customValidationResult = validationResult.withDefaults({
    formatter: ({msg, param}) => {
        return ErrorCodes.JSON_VALIDATION_FAILED({
            action: msg,
            param,
        })
    },
})

export const validate = (validations: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (const validation of validations) {
            const result = await validation.run(req)
            if (result.errors.length) break
        }

        const errors = customValidationResult(req)
        return errors.isEmpty() ? next() : handleError(errors.array()[0], res)
    }
}
