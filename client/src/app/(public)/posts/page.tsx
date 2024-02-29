import Link from "next/link"
import PreviewSection from "@/components/previewSection"
import {ArrowLeft, ArrowRight} from "@/components/logo"
import {getPaginatedBatch} from "@/utils/postRepo"
import {redirect} from "next/navigation"
export default async function Posts({page}: {page: number}) {
    if (!page || page <= 0) {
        return redirect("/posts/1")
    }
    const {data, status} = await getPaginatedBatch(page)

    if (status !== "SUCCESS") {
        return redirect("/")
    }

    const {maxBatch, paginatedBatch} = data

    if(+page >= maxBatch) {
        return redirect(`/posts/${maxBatch-1}`)
    }

    return (
        <>
            <div className="">
                <PreviewSection
                    previewPosts={paginatedBatch}
                    sectionName="Posts"
                />

                <div className="flex space-x-2 items-center justify-center">
                    <Link
                        href={`/posts/${page - 1}`}
                        className={`flex ${
                            page - 1 <= 0 && "pointer-events-none text-gray-300"
                        }`}
                        aria-disabled={page - 1 <= 0}
                        tabIndex={page - 1 <= 0 ? -1 : undefined}
                    >
                        <ArrowLeft className={`${page - 1 <= 0 && "fill-gray-200"}`} />
                        <p>Prev</p>
                    </Link>
                    <p>/</p>
                    <Link
                        href={`/posts/${page + 1}`}
                        className={`flex ${
                            page + 1 == maxBatch &&
                            "pointer-events-none text-gray-300"
                        }`}
                        aria-disabled={page + 1 == maxBatch}
                        tabIndex={page + 1 == maxBatch ? -1 : undefined}
                    >
                        <p>Next</p>
                        <ArrowRight className={`${page + 1 == maxBatch && "fill-gray-200"}`} />
                    </Link>
                </div>
            </div>
        </>
    )
}
