import type {Post, Repo, previewPost} from "../types/type"
import {formattedTime} from "./utils"

class PostsRepo {
    cachedPosts = new Map<string, Post>()
    featuredPosts = new Map<string, previewPost>()
    paginatedPosts: Array<Array<previewPost>> = []
    maxBatch = 0

    blogueUrl: string
    headers = new Headers()

    constructor() {
        this.blogueUrl = "http://localhost:4747"
        this.headers.append("inner_request", "1")

        this.getFeaturedPosts()
        this.maxBatch = this.paginatedPosts.length
    }

    getFeaturedPosts = async () => {
        if (this.featuredPosts.size && this.paginatedPosts.length) return

        const res = await fetch(`${this.blogueUrl}/api/posts`, {
            method: "GET",
            headers: this.headers,
        })
        const parsedData: Repo = await res.json()
        parsedData.data.forEach( async (post, index) => {
            if (!this.paginatedPosts[Math.round(index / 2)]) {
                this.paginatedPosts[Math.round(index / 2)] = []
            }
            this.paginatedPosts[Math.round(index / 2)].push(post)
            post.date = await formattedTime(post.createdAt)
            this.featuredPosts.set(post.slug, post)
        })
        return
    }

    getPost = async (slug: string): Promise<Post> => {
        let post: Post = this.cachedPosts.get(slug) as Post
        if (post) return post
        const res = await fetch(`${this.blogueUrl}/api/posts/${slug}`, {
            method: "GET",
            headers: this.headers,
        })
        post = await res.json()
        if (!post || post.status === "FAILURE") {
            return post
        }
        post.date = await formattedTime(post.data.createdAt)
        this.cachedPosts.set(slug, post)
        return post
    }
}

export default new PostsRepo()
