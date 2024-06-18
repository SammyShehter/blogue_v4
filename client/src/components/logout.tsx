"use client"
import {deleteCookies} from "@/utils/actions"
import {useRouter} from "next/navigation"


export default function Logout({text} : {text: string}) {
    const router = useRouter()
    const logoutFrom = async () => {
        await deleteCookies()
        router.push("/")
    }
    return <button onClick={logoutFrom}>{text}</button>
}
