import MarkdownRender from "@/app/components/markdown"
import type { Post } from "@/app/types/type"

let repo: Post
export const getData = async (slug: string) => {
    if (repo?.status) return repo
    const myHeaders = new Headers()
    myHeaders.append("inner_request", "1")
    const res = await fetch(`http://localhost:4747/api/posts/${slug}`, {
        method: "GET",
        headers: myHeaders,
    })
    repo = await res.json()
    repo.date = new Date()
    return repo
}

export default async function Post({params}: {params: {slug: string}}) {
    await getData(params.slug)
    return (
        <>
            {/* <h4>hi ,the slug is {params.slug}</h4> */}
            {/* <p>{repo.date.toLocaleString()}</p> */}
            {/* <p>{repo.status}</p> */}
            <div className="prose lg:prose-xl mx-auto">
                <MarkdownRender markdownText={repo.data.content} />
            </div>
        </>
    )
}
