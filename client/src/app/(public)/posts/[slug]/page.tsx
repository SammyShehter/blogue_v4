import MarkdownRender from "@/components/markdown"
import type {Post} from "@/types/type"
import ShareLinks from "@/components/shareLinks"
import {PostTime} from "@/components/postTime"
import { redirect } from "next/navigation"
import { getPost } from "@/utils/postRepo"
import Posts from "../page"

export default async function Post({params}: {params: {slug: string}}) {
    if (!params || !params.slug) {
        return Posts({page: 1})
    }
    if (!isNaN(+params?.slug)) {
        return Posts({page: +params.slug})
    }

    const {data: post, status} = await getPost(params.slug)
    if (status !== "SUCCESS") {
        return redirect('/')
    }

    return (
        <>
            <div className="prose mx-auto">
                <h1>{post.title}</h1>
                <PostTime formattedTime={post.date} className="my-2" />
                <MarkdownRender markdownText={post.content} />
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
