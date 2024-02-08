import type {PreviewPost} from "../types/type"

export default function PreviewPost(data: PreviewPost) {
    return (
        <article className="p-4 shadow rounded bg-white">
            <a href={`/posts/${data.slug}`}><h3 className="text-xl font-semibold mb-2">{data.title}</h3></a>
            <p className="text-sm text-gray-500 mb-2">
                {new Date(data.createdAt).toLocaleString()}
            </p>
            <p className="text-base text-gray-700">{data.description}</p>
        </article>
    )
}
