import express from "express"

const router = express.Router()

router.get("/posts", (req, res) => {
    res.json({message: "List of blog posts"})
})

export default router
