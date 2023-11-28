import RedisService from "../services/redis.service"
import MongoService from "../services/mongo.service"
import {createHash} from "crypto"
import {EventEmitter} from "stream"
import fs from 'fs'
import { ErrorCode } from "@/types/utils/errorCodes.types"
import { ErrorCodes } from "./errorCodes"
import { Response } from "express"

export const initEvents = new EventEmitter()

export async function init() {
    if (process.env.INIT !== "fine") {
        console.log("env file is not confiured")
        process.exit(1)
    }

    const checklist = await Promise.all([
        MongoService.connectWithRetry(),
        RedisService.connectWithRetry(),
    ])

    if (checklist.every(pass => pass)) {
        console.log("> Everything is ok!")
        initEvents.emit("go")
    } else {
        console.log("checks failed", checklist)
        process.exit(1)
    }
}

export const cx = (...classNames: Array<string>) =>
    classNames.filter(Boolean).join(" ")

export function hashString(input: string) {
    return createHash("sha256").update(input).digest("hex")
}

const date = (): string => {
    return new Date().toLocaleString("he-IL")
}

export const handleSuccess = (
    data: any,
    res: Response,
    status: number = 200
): Response => {
    return res.status(status).json({status: "SUCCESS", data})
}

export const handleError = (
    error: ErrorCode = ErrorCodes.GENERAL_ERROR,
    res: Response,
    status: number = error?.status || 400
    ): Response => {
    if (error instanceof Error) {
        //@ts-ignore
        const stack = error.stack.split("\n")
        const callerName = stack[1].trim().split(" ")[1]
        const genericMessage = error.message
        error = ErrorCodes.GENERAL_ERROR
        error.innerMessage = genericMessage
        error.caller_name = callerName
        error.alert = 5
    }

    if(error.alert) {
        // TelegramAPI.errorAlert(res.operationID, error)
    }
    
    const message = `
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        REQUEST ${status === 400 ? "ERROR" : "WARNING"}!     
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Error Time: ${date()}
Error Message ${error.innerMessage}
    `
    fs.appendFile("error.log", message, () => {})
    return res.status(status).json({
        status: "FAILURE",
        errors: {message: error.message, action: error.action},
    })
}

