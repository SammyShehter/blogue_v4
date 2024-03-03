"use client"
import { fetchAllDraftKeys } from "@/utils/actions"
import { useEffect, useState } from "react"

export default function DraftList() {
    const [draftKeyList, setDraftKeyList] = useState([])
    const [selectdDraftKey, setSelectedDraftKeyList] = useState("")

    useEffect(() => {
        const draftKeyList = fetchAllDraftKeys().then((data: any) => {
            console.log(data)
            if(data) {
                setDraftKeyList(data)
            }
            
        })
        
    }, [])
    return (
        <div className="flex justify-between">
            <div>{draftKeyList.map(draftKey => <h1>{draftKey}</h1>)}</div>
            <h1>{selectdDraftKey ? `You've selected ${selectdDraftKey}` : 'No key selected'}</h1>
        </div>
    )
}
