"use client"
import {useState} from "react"

export default function Login() {
    const [creds, setCreds] = useState({username: "", password: ""})
    const login = async ({
        username,
        password,
    }: {
        username: string
        password: string
    }) => {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(creds),
            })

            if (response.ok) {
                const parsedResponse = await response.json()
                if (parsedResponse.status === "SUCCESS") {
                    document.cookie = `token=${parsedResponse.data.token}; path=/;`
                    return "ok"
                }
                return "fail"
            } else {
                return "fail"
            }
        } catch (error) {
            return "fail"
        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        const answer = await login(creds)
        console.log('redirecting now', answer)
        if (answer === "ok") {
            console.log('okokok')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={creds.username}
                onChange={(e) =>
                    setCreds({
                        username: e.target.value,
                        password: creds.password,
                    })
                }
                placeholder="Username"
            />
            <input
                type="password"
                value={creds.password}
                onChange={(e) =>
                    setCreds({
                        username: creds.username,
                        password: e.target.value,
                    })
                }
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    )
}
