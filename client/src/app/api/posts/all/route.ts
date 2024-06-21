import {posts} from "@/utils/postRepo"
import {headersIP, rateLimitCheck} from "@/utils/utils"

export async function GET(request: Request) {
    try {
        await rateLimitCheck(
            headersIP.find((header) => request.headers.get(header)) || ""
        )
        return Response.json({posts: posts.slice(0, 10)})
    } catch (error) {
        console.error("Failed to fetch posts:", error)
        return new Response("An error occurred while fetching posts.", {
            status: 400,
        })
    }
}
