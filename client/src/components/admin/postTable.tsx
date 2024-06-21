"use client"
import {useRouter} from "next/navigation"
import GenericTable from "./genericTable"
import {columns} from "./columns"
import {fetchLatestPosts, removePostsCache} from "@/utils/postRepo"

function PostTable({
    data,
    columnName,
    headerText,
}: {
    data: any
    columnName: string
    headerText: string
}) {
    const router = useRouter()
    function updadtePosts() {
        removePostsCache().then(fetchLatestPosts).then(router.refresh)
    }
    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold pl-6">{headerText}</h1>
                {headerText === "dashboardPosts" && (
                    <button onClick={updadtePosts}>Update Posts</button>
                )}
            </div>
            <div>
                {
                    <GenericTable
                        data={data}
                        //@ts-ignore
                        columns={columns[columnName]}
                    />
                }
            </div>
        </>
    )
}

export default PostTable
