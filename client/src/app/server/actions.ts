'use server'
import { cookies } from 'next/headers'

import axios from "axios"

export async function getSessionData() {
    const encryptedSessionData = cookies().get("session")
    const session = {user: 'sammy', role: 'user'}
    return session
        ? session
        : null
}

export async function authenticate(credentials: {username: string, password: string}): Promise<{valid: boolean}> {
    try {
        const response = await axios.post('http://localhost:9000/login', credentials, {})
        if (!response.data) {
            return {valid: false}
        }
    
        cookies().set("token", response.data.data.token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24,
            path: "/",
        })
        return {valid: true}
    } catch (error) {
        return {valid: false}
    }
    
}