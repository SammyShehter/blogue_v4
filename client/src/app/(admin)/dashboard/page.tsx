"use server"
import {getSessionData} from "@/utils/actions"
import Login from "../login/page"
import Logout from "@/app/components/logout"

export default async function Dashboard() {
    const session = await getSessionData()
    if (session.error) {
        return <Login />
    }

    const userRole = "admin"
    const userName = session?.data?.username || "test"

    if (userRole === "admin") {
        return (
            <>
                <h1>Hi {userName}! Welcome to Admin Dashboard</h1>
                <Logout />
            </>
        )
    } else if (userRole === "user") {
        return <h1>Hi {userName}! Welcome to User Dashboard</h1>
    } else {
        return <Login />
    }
}
