import PostTable from "@/components/admin/postTable"
import {getAllDraftKeys, getDraftRaw} from "@/utils/redis"

export default async function Dashboard() {
    const draftKeys = await getAllDraftKeys() // needs param for defining ownership
    if (!draftKeys || !draftKeys.length) {
        return <h1>No drafts found</h1>
    }

    const drafts = await Promise.all(
        draftKeys.map(async (key) => {
            const draft = await getDraftRaw(key)
            const parsedDraft = JSON.parse(draft!)
            return {
                key: key.split(":")[1],
                ...parsedDraft,
            }
        })
    )

    return (
        drafts && (
            <PostTable
                data={drafts.map((post: any) => ({
                    key: post.key,
                    title: post.title,
                    category: post.category,
                    content: post.content,
                }))}
                columnName="draftsPosts"
                headerText="Drafts Menu"
            />
        )
    )
}
