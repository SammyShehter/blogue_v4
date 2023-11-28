import express from "express"
import { senderCheck } from "../middleware/common.middleware"
import { fetchAllPosts } from "../controllers/blogue.controller"

const router = express.Router()

router.get("/posts", fetchAllPosts)
router.post("/posts/add", fetchAllPosts)

export default router
