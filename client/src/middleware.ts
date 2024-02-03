import {NextResponse} from "next/server"
import type {NextRequest} from "next/server"

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const currentUser = request.cookies.get("token")?.value
    if(pathname == '/login' && currentUser) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    if (!currentUser && pathname !== '/login') {
        return NextResponse.redirect(new URL("/login", request.url))
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
