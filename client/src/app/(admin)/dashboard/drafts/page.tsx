import AdminHeader from "@/components/admin/header"
import Sidebar from "@/components/admin/sideBar"
import Login from "../../login/page"
import {getSessionData} from "@/utils/actions"
import ContentLayout from "@/components/contentLayout"
import NewPost from "@/components/admin/newPost"
import DraftList from "@/components/admin/draftList.tsx"

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
                    <DraftList />
                </ContentLayout>
            </div>
        </div>
    )
}
