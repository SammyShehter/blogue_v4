import PostsRepo from "../../server/postRepo"
import PreviewSection from "@/app/components/previewSection"
export default function Posts({page}: {page: number}) {
    // if(!page || page > PostsRepo.maxBatch) page = 1
    if(!page) page = 1
    return (
        <>
            <div className="">
                <h2 className="text-3xl font-bold">Posts</h2>
                {page && <p>Current page is {page}</p>}
                <PreviewSection previewPosts={PostsRepo.paginatedPosts[page-1]} sectionName="Recent Posts"/>
            </div>
        </>
    )
}