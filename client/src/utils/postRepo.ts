import type {Post, Repo} from "../types/type"

const posts: Array<Post> = []
const paginatedBatch = new Map<number, Array<Post>>()
let maxBatch = 0

const blogueUrl = process.env.BLOGUE_URL
const headers = new Headers()
headers.append("inner_request", "1")
headers.append("Content-Type", "application/json")

export async function fetchLatestPosts(): Promise<Repo> {
    try {
        if(posts.length) return {status: "SUCCESS", data: posts}
        const res = await fetch(`${blogueUrl}/api/posts`, {
            method: "GET",
            headers,
        })
        const parsedData: Repo = await res.json()
        if(parsedData.status === "SUCCESS") {
            posts.push(...parsedData.data)
        }
        return parsedData
    } catch (error: any) {
        console.log("error in fetchLatestPosts: ", error.message)
        return {status: "FAILED", data: []}
    }
}

export async function getPost(
    slug: string
): Promise<{status: string; data: Post}> {
    try {
        if (posts.length) {
            const post = posts.find((post) => post.slug === slug)
            if (post) {
                return {status: "SUCCESS", data: post}
            }
        }
        const res = await fetch(`${blogueUrl}/api/posts/post/${slug}`, {
            method: "GET",
            headers,
        })

        const post = await res.json()
        return post
    } catch (error: any) {
        console.log("error in getPost: ", error.message)
        return {
            status: "FAILED",
            data: {
                title: "",
                description: "",
                author: "",
                category: "",
                slug: "",
                views: 0,
                createdAt: "",
                updatedAt: "",
                batch: 0,
                date: "",
                content: "",
            },
        }
    }
}

export async function getPaginatedBatch(page: number): Promise<{
    status: string
    data: {maxBatch: number; paginatedBatch: Array<Post>}
}> {
    try {
        if (paginatedBatch.has(page)) {
            return {status: "SUCCESS", data: {maxBatch, paginatedBatch: paginatedBatch.get(page) || []}}
        }
        const res = await fetch(`${blogueUrl}/api/posts/paginated/${page}`, {
            method: "GET",
            headers,
        })
        const batch = await res.json()
        console.log("batch: ", batch)
        if (batch.status === "SUCCESS") {
            paginatedBatch.set(page, batch.data.paginatedBatch)
            maxBatch = batch.data.maxBatch
        }
        return batch
    } catch (error: any) {
        console.log("error in getPaginatedBatch: ", error.message)
        return {status: "FAILED", data: {maxBatch: 0, paginatedBatch: []}}
    }
}

export async function createPost(data: {
    title: string
    content: string
    category: string
}): Promise<{
    status: string
    errors: {
        message: string
        action: string
    }
}> {
    try {
        const res = await fetch(`${blogueUrl}/api/posts/add`, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        })
        const resData = await res.json()
        return resData
    } catch (error: any) {
        console.log("error in createPost: ", error.message)
        return {
            status: "FAILED",
            errors: {
                action: "",
                message: error.message,
            },
        }
    }
}

export async function editPost(
    slug: string,
    data: {
        title: string
        content: string
        category: string
        description: string
    }
): Promise<{
    status: string
    errors: {
        message: string
        action: string
    }
}> {
    try {
        const res = await fetch(`${blogueUrl}/api/posts/edit/${slug}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(data),
        })
        const resData = await res.json()
        return resData
    } catch (error: any) {
        console.log("error in editPost: ", error.message)
        return {
            status: "FAILED",
            errors: {
                action: "",
                message: error.message,
            },
        }
    }
}
