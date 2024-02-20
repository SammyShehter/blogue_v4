"use server"
import {getSessionData} from "@/utils/actions"
import {userData} from "@/utils/redis"

export default async function Dashboard() {
    const session = await getSessionData()
    const userRole = session?.role
    const userName = session?.user

    if (userRole === "admin") {
        return <h1>Hi {userName}! Welcome to Admin Dashboard</h1>
    } else if (userRole === "user") {
        return <h1>Hi {userName}! Welcome to User Dashboard</h1>
    } else {
        return <h1>AccessDenied</h1>
    }
}
