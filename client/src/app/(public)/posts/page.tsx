import Link from "next/link"
import PostsRepo from "../../../utils/postRepo"
import PreviewSection from "@/app/components/previewSection"
import {ArrowLeft, ArrowRight} from "@/app/components/logo"
export default function Posts({page}: {page: number}) {
    if (!page || page > PostsRepo.maxBatch) page = 1
    return (
        <>
            <div className="">
                <PreviewSection
                    previewPosts={PostsRepo.paginatedPosts[page - 1]}
                    sectionName="Posts"
                />

                <div className="flex space-x-2 items-center justify-center">
                    <ArrowLeft className="" />
                    <Link href={`/posts/${page-1}`}>
                        <p>Prev</p>
                    </Link>
                    <p>/</p>
                    <Link href={`/posts/${page+1}`}>
                        <p>Next</p>
                    </Link>
                    <ArrowRight className="" />
                </div>
            </div>
        </>
    )
}
