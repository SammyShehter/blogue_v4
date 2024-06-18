import DraftList from "@/components/admin/draftList.tsx"

export default async function Page() {
    return (
        <div className="flex">
            <div className="min-w-48">
                <DraftList />
            </div>
            <div className="self-auto">
                <DraftList />
            </div>
        </div>
    )
}
