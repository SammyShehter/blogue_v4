"use client"
import {deleteCookies} from "@/utils/actions"
import {useRouter} from "next/navigation"
import {ReactNode} from "react"

export default function Logout({
    text,
    className,
}: {
    text: string | ReactNode
    className?: string
}) {
    const router = useRouter()
    const logoutFrom = async () => {
        await deleteCookies()
        router.push("/")
    }
    return (
        <button onClick={logoutFrom} className={className}>
            {text}
        </button>
    )
}
