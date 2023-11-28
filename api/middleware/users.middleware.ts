import {NextFunction, Request, Response} from "express"

const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    if (!req.body || !req.body.username || !req.body.password) {
        res.status(400).end(`Wrong Request`)
    }

    next()
}

export default loginMiddleware
