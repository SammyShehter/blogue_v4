import { getSessionData } from "@/utils/actions"
import React from "react"
import Login from "../login/page"
import { fetchLatestPosts } from "@/utils/postRepo"
import Sidebar from "@/components/admin/sideBar"
import ContentLayout from "@/components/contentLayout"
import AdminHeader from "@/components/admin/header"

const SessionWrapper = async ({children}: {children: React.ReactNode}) => {
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
                    {children}
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

export default SessionWrapper
