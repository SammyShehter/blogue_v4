import type {Post, Repo} from "../types/type"
import {formattedTime} from "./utils"

class PostsRepo {
    featuredPosts: Repo = {
        data: [],
        date: new Date(),
        status: "",
    }

    cachedPosts = new Map()

    blogueUrl: string
    headers = new Headers()

    constructor() {
        this.blogueUrl = "http://localhost:4747"
        this.getFeaturedPosts()
        this.headers.append("inner_request", "1")
    }

    getFeaturedPosts = async () => {
        if (this.featuredPosts.status) return this.featuredPosts
        const myHeaders = new Headers()
        myHeaders.append("inner_request", "1")
        const res = await fetch(`${this.blogueUrl}/api/posts`, {
            method: "GET",
            headers: myHeaders,
        })
        const parsedData = await res.json()
        this.featuredPosts = parsedData
        this.featuredPosts.date = new Date()
        return this.featuredPosts
    }

    getPost = async (slug: string): Promise<Post> => {
        let post = this.cachedPosts.get(slug)
        if (post) return post
        const res = await fetch(`${this.blogueUrl}/api/posts/${slug}`, {
            method: "GET",
            headers: this.headers,
        })
        post = await res.json()
        post.date = formattedTime(post.data.createdAt)
        this.cachedPosts.set(slug, post)
        return post
    }
}

export default new PostsRepo()
