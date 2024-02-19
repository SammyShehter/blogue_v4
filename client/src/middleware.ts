import {NextResponse} from "next/server"
import type {NextRequest} from "next/server"
import { hashString } from "./server/utils"
// import redis from "./server/redis"

const protectedRoutes = [
    '/dashboard',
]


export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const currentUser = request.cookies.get("token")?.value
    if(!currentUser) {
        if(protectedRoutes.includes(pathname)) {
            return NextResponse.redirect(new URL("/login", request.url))
        } else {
            return NextResponse.next()
        }
    }

    const hash = await hashString(currentUser)

    // const userData = await redis.get(`user:${hash}`)

    console.log(hash.toString())

    if(currentUser && pathname === '/login') {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    
    NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpeg$).*)"],
    missing: [
        {type: "header", key: "next-router-prefetch"},
        {type: "header", key: "purpose", value: "prefetch"},
    ],
}
