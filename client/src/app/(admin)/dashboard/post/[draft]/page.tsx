import AdminHeader from "@/components/admin/header"
import Sidebar from "@/components/admin/sideBar"
import Login from "../../../login/page"
import {getSessionData} from "@/utils/actions"
import ContentLayout from "@/components/contentLayout"
import NewPost from "@/components/admin/newPost"
import {redirect} from "next/navigation"
import {getDraft} from "@/utils/redis"

export default async function Page({params}: {params: {draft: string}}) {
    const session = await getSessionData()
    if (session.error) {
        return <Login />
    }
    const userRole = session?.data?.role?.value
    const userName = session?.data?.username

    const draft = params?.draft
    if (!draft) {
        redirect("/dashboard/post")
    }

    const draftData = await getDraft(draft)

    if (!draftData) {
        redirect("/dashboard/post")
    }

    const parsedDraftData = JSON.parse(draftData)

    return (
        <div className="flex flex-col">
            <AdminHeader data={{userRole, userName}} />
            <div className="flex">
                <Sidebar />
                <ContentLayout>
                    <h1 className="text-2xl font-bold">
                        Please create new post here
                    </h1>
                    <NewPost title={parsedDraftData.title} category={parsedDraftData.category} content={parsedDraftData.content} draftKey={draft}/>
                </ContentLayout>
            </div>
        </div>
    )
}
