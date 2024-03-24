import {getSessionData} from "@/utils/actions"
import Login from "../login/page"
import Sidebar from "@/components/admin/sideBar"
import AdminHeader from "@/components/admin/header"
import ContentLayout from "@/components/contentLayout"
import { fetchLatestPosts } from "@/utils/postRepo"
import Link from "next/link"

export default async function Dashboard() {
    const session = await getSessionData()
    if (session.error) {
        return <Login />
    }
    const userRole = session?.data?.role?.value
    const userName = session?.data?.username

    const latestPosts = await fetchLatestPosts()
    switch (userRole) {
        case "ADMIN":
            return (
                <div className="flex flex-col">
                    <AdminHeader data={{userRole, userName}} />
                    <div className="flex">
                        <Sidebar />
                        <ContentLayout>
                            <h1 className="text-2xl font-bold">
                                Welcometo Dashboard. Please check the recent
                                posts
                            </h1>
                            <div className="flex flex-col">
                                {
                                    latestPosts.data.map(post => {
                                        return <Link href={`/dashboard/post/edit/${post.slug}`} key={post.slug}>{post.title}</Link> 
                                    })
                                }
                            </div>
                        </ContentLayout>
                    </div>
                </div>
            )

        case "USER":
            return <h1>Hi {userName}! Welcome to User Dashboard</h1>

        default:
            return <Login />
    }
}
