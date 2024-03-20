import type {Post, Repo} from "../types/type"

const blogueUrl = process.env.BLOGUE_URL
const headers = new Headers()
headers.append("inner_request", "1")
headers.append("Content-Type", "application/json")

export async function fetchLatestPosts(): Promise<Repo> {
    const res = await fetch(`${blogueUrl}/api/posts`, {
        method: "GET",
        headers,
    })
    const parsedData: Repo = await res.json()
    return parsedData
}

export async function getPost(
    slug: string
): Promise<{status: string; data: Post}> {
    const res = await fetch(`${blogueUrl}/api/posts/post/${slug}`, {
        method: "GET",
        headers,
    })
    const post = await res.json()
    return post
}

export async function getPaginatedBatch(page: number): Promise<{
    status: string
    data: {maxBatch: number; paginatedBatch: Array<Post>}
}> {
    const res = await fetch(`${blogueUrl}/api/posts/paginated/${page}`, {
        method: "GET",
        headers,
    })
    const batch = await res.json()
    return batch
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
        console.log(error.message)
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
        category: string,
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
        // console.log(error.message) // Kek Alert ? 
        return {
            status: "FAILED",
            errors: {
                action: "",
                message: error.message,
            },
        }
    }
}
