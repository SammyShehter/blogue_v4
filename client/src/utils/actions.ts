"use server"
import {cookies} from "next/headers"
import axios from "axios"
import {hashString} from "./utils"
import {deleteSession, getAllDraftKeys, sendDraftToRedis, userData} from "./redis"

export async function deleteCookies() {
    const tokenData = cookies().get("token")
    if (tokenData?.value) {
        const hash = await hashString(tokenData.value)
        await deleteSession(hash)
    }
    cookies().delete("token")
}

export async function getSessionData() {
    if (!cookies()?.get("token")?.value) {
        return {error: true, data: {}, action: "redirect"}
    }
    const hash = await hashString(cookies().get("token")!.value)
    const rawSession = await userData(hash)
    if (!rawSession) {
        return {error: true, data: {}, action: "redirect"}
    }
    const parsedSession = JSON.parse(rawSession)
    if (parsedSession.timeToRefresh) {
        // send request to server and refresh the token
        // set new session cookie
    }
    return {error: false, data: parsedSession, action: "none"}
}

export async function authenticate(credentials: {
    username: string
    password: string
}): Promise<{valid: boolean}> {
    try {
        const response = await axios.post(
            "http://localhost:9000/login",
            credentials,
            {}
        )
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

export async function saveDraft(draftKey: string, data: {title: string, content: string, category: string}) {
    "use server"
    const session = await getSessionData();
    if(session.error) {
        // should add alert?
        return
    }
    await sendDraftToRedis(draftKey, data)
}

export async function confirmPost(data: any) {
    "use server"
    console.log(data)
    const session = await getSessionData();
    if(session.error) {
        // should add alert?
        return
    }
    // Save post to server
    // Example: fetch(`/api/posts/add`, { method: 'POST', body: JSON.stringify({ title, content, category }) });
}

// export async function fetchAllDraftKeys() {
//     "use server"
//     const session = await getSessionData();
//     if(session.error) {
//         // should add alert?
//         return []
//     }
//     const keys = await getAllDraftKeys()
//     return keys
// }