import {NextRequest} from "next/server"
import {posts, searchForPost} from "@/utils/postRepo"
import {
    customEscape,
    customTrim,
    headersIP,
    rateLimitCheck,
} from "@/utils/utils"

export async function GET(request: NextRequest) {
    try {
        await rateLimitCheck(
            headersIP.find((header) => request.headers.get(header)) || ""
        )

        const rawQuery = request.nextUrl.searchParams.get("query")
        if (!rawQuery) {
            return new Response("Query parameter 'query' is required.", {
                status: 400,
            })
        }
        const decodedQuery = decodeURIComponent(rawQuery || "").trim()
        if (
            !decodedQuery ||
            decodedQuery.trim() === "" ||
            decodedQuery.length > 15
        ) {
            return new Response("Query parameter 'query' is not valid.", {
                status: 400,
            })
        }

        const parsedQuery = customEscape(customTrim(String(decodedQuery)))
        if (
            !parsedQuery ||
            parsedQuery.trim() === "" ||
            parsedQuery.length > 15
        ) {
            return new Response("Query parameter 'query' is not valid.", {
                status: 400,
            })
        }

        console.log("parsedQuery", parsedQuery, typeof parsedQuery)
        const searchResults = await searchForPost(parsedQuery.toLowerCase())

        return Response.json({posts: searchResults.splice(0, 5)})
    } catch (error) {
        console.error("Failed to fetch posts:", error)
        return new Response("An error occurred while fetching posts.", {
            status: 400,
        })
    }
}
