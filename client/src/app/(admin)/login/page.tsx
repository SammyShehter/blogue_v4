"use client"
import {useState, FormEvent, useEffect} from "react"
import {useRouter} from "next/navigation"
import {authenticate, deleteCookies} from "@/utils/actions"

export default function Login() {
    const router = useRouter()
    const [form, setForm] = useState({
        username: "",
        password: "",
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        deleteCookies()
    }, [])

    const dayNightBg = () => {
        const clock = new Date().getHours()
        const inlineStyle = {
            background: 'url("./12.jpeg") center',
            backgroundSize: "cover",
        }
        clock > 7 && clock < 19
            ? (inlineStyle.background = 'url("./12.jpeg") center')
            : (inlineStyle.background = 'url("./24.jpeg") center')
        return inlineStyle
    }

    const changeHandler = (event: any) => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        try {
            if (!form.username || !form.password) {
                setIsLoading(false)
                return
            }
            const response = await authenticate(form)

            if (response.valid) {
                router.push("/dashboard")
            }
            
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div
            className="grid place-content-center h-screen"
            style={dayNightBg()}
        >
            <div className="p-8 bg-gray-300/50 w-96 h-72">
                <h3 className="text-center p-1 text-3xl text-white">Welcome</h3>

                <form onSubmit={onSubmit}>
                    <div className="p-2">
                        <input
                            type="text"
                            name="username"
                            className="relative outline-none border border-gray-400 rounded py-3 px-3 w-full bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline"
                            placeholder="Username"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="p-2">
                        <input
                            type="password"
                            name="password"
                            className="relative outline-none border border-gray-400 rounded py-3 px-3 w-full bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline"
                            placeholder="Password"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="p-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-500 rounded h-10 text-white"
                        >
                            {isLoading ? "Loading..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
