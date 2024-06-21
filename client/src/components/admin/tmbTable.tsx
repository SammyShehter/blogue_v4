"use client"
import {getTMBLogs, removeTMBCache} from "@/utils/tmbLogRepo"
import {useRouter} from "next/navigation"
import {useState} from "react"
import GenericTable from "./genericTable"
import {columns} from "./columns"
import {TMBLogs} from "@/types/type"

function TMBTable({data}: {data: TMBLogs}) {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<string>("")
    function updadteLogs() {
        removeTMBCache().then(getTMBLogs).then(router.refresh)
    }
    return (
        <>
            <div className="flex justify-between pb-4">
                <h1 className="text-2xl font-bold">TMB Page</h1>
                <button onClick={updadteLogs}>Update Logs</button>
            </div>
            <div>
                <nav className="w-full flex justify-around">
                    {Object.keys(data).map((key) => (
                        <button
                            key={key}
                            className={`text-gray-800 px-4 py-2 rounded-md ${
                                activeTab === key
                                    ? "bg-gray-400 hover:bg-gray-400"
                                    : "bg-gray-200 hover:bg-gray-300"
                            }`}
                            onClick={() => setActiveTab(key)}
                        >
                            {key}
                        </button>
                    ))}
                </nav>
            </div>
            {activeTab && (
                <div>
                    {
                        <GenericTable
                            data={data[activeTab].data}
                            // @ts-ignore
                            columns={columns[data[activeTab].columns]}
                        />
                    }
                </div>
            )}
        </>
    )
}

export default TMBTable
