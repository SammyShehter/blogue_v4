import PreviewPost from "@/components/previewPost"
import type {Post} from "../types/type"

export default function PreviewSection({
    sectionName,
    previewPosts,
}: {
    sectionName: string
    previewPosts: Array<Post>
}) {
    return (
        <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">{sectionName}</h2>
            <div className="space-y-4">
                {previewPosts && previewPosts.map((data) => {
                    return <PreviewPost {...data} key={data.slug} />
                })}
            </div>
        </div>
    )
}
