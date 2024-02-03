import { ErrorCode } from "../types/utils/errorCodes.types"


export class ErrorCodes {
    static get GENERAL_ERROR(): ErrorCode {
        return {
            message: "GENERAL ERROR",
            action: "action message",
            innerMessage: "inner message",
            alert: 1,
        }
    }

    static JSON_VALIDATION_FAILED({
        action,
        param,
    }: {action: string, param: string}): ErrorCode {
        return {
            message: "JSON VALIDATION FAILED",
            action,
            innerMessage: `User sent wrong ${param}`,
            alert: 1,
        }
    }

    static get PORTAL_NOT_SUPPORTED(): ErrorCode {
        return {
            message: "PORTAL NOT SUPPORTED",
            action: "Please provide a valid portal",
            innerMessage: "Unsopported portal",
            alert: 1,
        }
    }

    static INVALID_JSON_BODY(error: any): ErrorCode {
        return {
            message: "INVALID JSON BODY",
            action: "JSON sent was not valid. Please review your request",
            innerMessage: `Req.Body JSON was invalid. Sent ${JSON.stringify(error)}`,
            alert: 5,
        }
    }

    static ACCESS_DENIED(path: string, here: string): ErrorCode {
        return {
            message: "ACCESS DENIED",
            action: "You're not allowed to see the data",
            innerMessage: `User requested ${path} and failed in ${here}`,
            alert: 5,
        }
    }

    static get POST_UNAVAILABLE (): ErrorCode {
        return {
            message: "POST UNAVAILABLE",
            action: "Requested post is not available, please choose another",
            innerMessage: `User sent an invalid slug or post was deleted`,
            alert: 1,
        }
    }

    static get POST_CANT_BE_UPDATED (): ErrorCode {
        return {
            message: "POST CANT BE UPDATED",
            action: "Please add at least one update to the post",
            innerMessage: `User sent an empty update request`,
            alert: 5,
        }
    }
}
