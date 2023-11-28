import { handleError } from "../../src/utils/common";
import { ErrorCodes } from "../../src/utils/errorCodes";
import { NextFunction, Request, Response } from "express";

export const senderCheck = (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: add service validation
        console.log('sender check fired')
        next()
    } catch (error) {
        return handleError(ErrorCodes.ACCESS_DENIED(req.url, senderCheck.name), res)
    }
}