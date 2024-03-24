import {getAllDraftKeys} from "@/utils/redis"
import Link from "next/link"

export default async function DraftList() {
    const draftKeys = await getAllDraftKeys() // needs param for defining ownership
    if (!draftKeys || !draftKeys.length) {
        return <h1>No drafts found</h1>
    }
    const draftRender = draftKeys.map((draftKey, index) => {
        const draft = draftKey.slice(6)
        return (
            <Link href={`/dashboard/post/draft/${draft}`} key={index}>
                <h1>{draftKey}</h1>
            </Link>
        )
    })

    return (
        <div className="flex justify-between">
            <div>{draftRender}</div>
        </div>
    )
}
