import TMBTable from "@/components/admin/tmbTable"
import { getTMBLogs } from "@/utils/tmbLogRepo"
import { redirect } from "next/navigation"

export default async function Page() {
    const {data: logs, status} = await getTMBLogs()
    if (status !== "SUCCESS") {
        return redirect("/")
    }

    return (
        <>
            <TMBTable data={logs} />
        </>
    )
}
