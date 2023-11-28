import express, {Request, Response} from "express"
import loginMiddleware from "../middleware/users.middleware"
import { loginController } from "../controllers/users.controller"

const router = express.Router()

router.post("/login", loginMiddleware, loginController)

export default router