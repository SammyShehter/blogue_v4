import AdminHeader from "@/components/admin/header"
import Sidebar from "@/components/admin/sideBar"
import Login from "../../../../login/page"
import { getSessionData } from "@/utils/actions"
import ContentLayout from "@/components/contentLayout"
import { redirect } from "next/navigation"
import { getPost } from "@/utils/postRepo"
import EditPost from "@/components/admin/editPost"

export default async function Page({params}: {params: {slug: string}}) {
    const session = await getSessionData()
    if (session.error) {
        return <Login />
    }
    const userRole = session?.data?.role?.value
    const userName = session?.data?.username

    const slug = params?.slug
    if (!slug) {
        redirect("/dashboard/post")
    }

    const {data, status} = await getPost(slug)

    if (status !== "SUCCESS") {
        redirect("/dashboard/post")
    }

    return (
        <div className="flex flex-col">
            <AdminHeader data={{userRole, userName}} />
            <div className="flex">
                <Sidebar />
                <ContentLayout>
                    <h1 className="text-2xl font-bold">
                        Please edit post here
                    </h1>
                    <EditPost title={data.title} category={data.category} content={data.content} description={data.description} slug={data.slug}/>
                </ContentLayout>
            </div>
        </div>
    )
}
