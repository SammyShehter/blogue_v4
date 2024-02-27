import AdminHeader from "@/components/admin/header"
import Sidebar from "@/components/admin/sideBar"
import Login from "../../login/page"
import {getSessionData} from "@/utils/actions"

export default async function Settings() {
    const session = await getSessionData()
    if (session.error) {
        return <Login />
    }
    const userRole = session?.data?.role?.value
    const userName = session?.data?.username

    return (
        <div className="flex flex-col">
            <AdminHeader data={{userRole, userName}} />
            <div className="flex">
                <Sidebar />
                <h1>Welcome to Settings</h1>
            </div>
        </div>
    )
}
