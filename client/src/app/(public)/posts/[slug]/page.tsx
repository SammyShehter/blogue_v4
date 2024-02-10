import MarkdownRender from "@/app/components/markdown"
import type { Post } from "@/app/types/type"
import ShareLinks from "@/app/components/shareLinks"
import { PostTime } from "@/app/components/postTime"
import PostsRepo from "../../../server/postRepo"

export default async function Post({params}: {params: {slug: string}}) {
    const post = await PostsRepo.getPost(params.slug)
    return (
        <>
            <div className="prose mx-auto">
                <h1>{post.data.title}</h1>
                <PostTime formattedTime={post.date} className="my-2"/>
                <MarkdownRender markdownText={post.data.content} />
                <h4 className="italic">Share this post on:</h4>
                <ShareLinks
                    whatsAppLink=""
                    telegramLink=""
                    twitterLink=""
                    mailLink=""
                />
            </div>
        </>
    )
}
