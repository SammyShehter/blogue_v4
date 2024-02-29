import type {Post} from "../types/type"
import { PostTime } from "./postTime"

export default async function PreviewPost(data: Post) {
    return (
        <article className="py-4">
            <a href={`/posts/${data.slug}`}><h3 className="text-xl font-semibold mb-2">{data.title}</h3></a>
            <PostTime formattedTime={data.date} className="my-2"/>
            <p className="text-base text-gray-700">{data.description}</p>
        </article>
    )
}
