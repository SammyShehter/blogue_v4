import NewPost from "@/components/admin/newPost"
import { redirect } from "next/navigation"
import { getDraft } from "@/utils/redis"

export default async function Page({params}: {params: {draft: string}}) {
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
        <>
            <h1 className="text-2xl font-bold">Please create new post here</h1>
            <NewPost
                title={parsedDraftData.title}
                category={parsedDraftData.category}
                content={parsedDraftData.content}
                draftKey={draft}
            />
        </>
    )
}
