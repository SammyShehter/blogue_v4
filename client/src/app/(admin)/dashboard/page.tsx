import PostTable from "@/components/admin/postTable"
import {fetchLatestPosts} from "@/utils/postRepo"

export default async function Dashboard() {
    const latestPosts = await fetchLatestPosts()
    return (
        <PostTable
            data={latestPosts.data.map((post) => ({
                title: [post.title, post.slug],
                author: post.author,
                createdAt: post.createdAt,
                description: post.description,
                views: post.views,
                category: post.category,
                updatedAt: post.updatedAt,
            }))}
            columnName="dashboardPosts"
            headerText="Welcome to Dashboard!"
        />
    )
}
