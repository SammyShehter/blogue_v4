import type {NextApiRequest, NextApiResponse} from "next"
import loginMiddleware from "../middleware/login"

type ResponseData = {
    status: string
    data: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    loginMiddleware(req, res, async () => {
        try {
            const {username, password} = req.body
            const response = await fetch("http://localhost:9000/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            })
            const parsedResponse = await response.json()
            return res.status(200).json(parsedResponse)
        } catch (error) {
            return res.status(200).json({status: "FAILURE", data: {}})
        }
    })
}
