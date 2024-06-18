import { redirect } from "next/navigation"
import { getPost } from "@/utils/postRepo"
import EditPost from "@/components/admin/editPost"

export default async function Page({params}: {params: {slug: string}}) {
    const slug = params?.slug
    if (!slug) {
        redirect("/dashboard/post")
    }

    const {data, status} = await getPost(slug)

    if (status !== "SUCCESS") {
        redirect("/dashboard/post")
    }

    return (
        <>
            <h1 className="text-2xl font-bold">Please edit post here</h1>
            <EditPost
                title={data.title}
                category={data.category}
                content={data.content}
                description={data.description}
                slug={data.slug}
            />
        </>
    )
}
