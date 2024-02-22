"use client"
import {deleteCookies} from "@/utils/actions"
import {useRouter} from "next/navigation"


export default function Logout() {
    const router = useRouter()
    const logoutFrom = () => {
        deleteCookies()
        router.push("/login")
    }
    return <button onClick={logoutFrom}>Logout</button>
}
