import { Request, Response } from "express"

export const loginController = async (req: Request, res: Response) => {
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
}