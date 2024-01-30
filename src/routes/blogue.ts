import express from "express"
import { senderCheck } from "../middleware/common.middleware"
import * as blogueController from "../controllers/blogue.controller"

const router = express.Router()

router.get("/posts", blogueController.fetchAllPosts)
router.get("/posts/:slug", blogueController.fetchPost)
router.post("/posts/add", blogueController.addPost)
router.put("/posts/edit/:slug", blogueController.editPost)
router.delete("/posts/delete/:slug", blogueController.deletePost)

router.post("/ollama", blogueController.test)

export default router
