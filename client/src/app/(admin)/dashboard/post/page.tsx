import AdminHeader from "@/components/admin/header"
import Sidebar from "@/components/admin/sideBar"
import Login from "../../login/page"
import {getSessionData} from "@/utils/actions"
import ContentLayout from "@/components/contentLayout"
import NewPost from "@/components/admin/newPost"

export default async function Page() {
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
                <ContentLayout>
                    <h1 className="text-2xl font-bold">
                        Please create new post here
                    </h1>
                    <NewPost />
                </ContentLayout>
            </div>
        </div>
    )
}
