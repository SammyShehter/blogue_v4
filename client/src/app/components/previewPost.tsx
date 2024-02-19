import { formattedTime } from "../../server/utils"
import type {previewPost} from "../types/type"
import { PostTime } from "./postTime"

export default function PreviewPost(data: previewPost) {
    return (
        <article className="py-4">
            <a href={`/posts/${data.slug}`}><h3 className="text-xl font-semibold mb-2">{data.title}</h3></a>
            <PostTime formattedTime={formattedTime(data.createdAt)} className="my-2"/>
            <p className="text-base text-gray-700">{data.description}</p>
        </article>
    )
}
