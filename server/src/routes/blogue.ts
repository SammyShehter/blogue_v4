import express from "express"
import * as blogueController from "../controllers/blogue.controller"
import * as blogueMiddleware from "../middleware/blogue.middleware"

const router = express.Router()

router.get("/posts", blogueController.fetchLastPosts)
router.get("/posts/post/:slug", blogueController.fetchPost)
router.get("/posts/paginated/:page", blogueController.getPaginatedBatch)
router.post(
    "/posts/add",
    blogueMiddleware.inputChecks,
    blogueController.addPost
)
router.post(
    "/posts/add/generate",
    blogueMiddleware.promtCheck,
    blogueController.generatePost
)
router.put(
    "/posts/edit/:slug",
    blogueMiddleware.editInputChecks,
    blogueMiddleware.postExists,
    blogueController.editPost
)
router.delete("/posts/delete/:slug", blogueController.deletePost)

export default router
