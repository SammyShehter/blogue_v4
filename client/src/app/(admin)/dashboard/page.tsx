import { fetchLatestPosts } from "@/utils/postRepo"
import Link from "next/link"

export default async function Dashboard() {
    const latestPosts = await fetchLatestPosts()
    return (
        <>
            <h1 className="text-2xl font-bold">
                Welcometo Dashboard. Please check the recent posts
            </h1>
            <div className="flex flex-col">
                {latestPosts.data.map((post) => {
                    return (
                        <Link
                            href={`/dashboard/post/edit/${post.slug}`}
                            key={post.slug}
                        >
                            {post.title}
                        </Link>
                    )
                })}
            </div>
        </>
    )
}
