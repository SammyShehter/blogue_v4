import NewPost from "@/components/admin/newPost"

export default async function Page() {
    return (
        <>
            <h1 className="text-2xl font-bold">Please create new post here</h1>
            <NewPost />
        </>
    )
}
