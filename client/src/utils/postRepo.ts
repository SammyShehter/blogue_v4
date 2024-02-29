import type {Post, Repo} from "../types/type"

const blogueUrl = "http://localhost:4747"
const headers = new Headers()
headers.append("inner_request", "1")

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
