import type {previewPost} from "../types/type"

export default function PreviewPost(data: previewPost) {
    return (
        <article className="py-4">
            <a href={`/posts/${data.slug}`}><h3 className="text-xl font-semibold mb-2">{data.title}</h3></a>
            <p className="text-sm text-gray-500 mb-2">
                {new Date(data.createdAt).toLocaleString()}
            </p>
            <p className="text-base text-gray-700">{data.description}</p>
        </article>
    )
}
