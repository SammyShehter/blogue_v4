import {NextResponse} from "next/server"
import type {NextRequest} from "next/server"

const protectedRoutes = [
    '/dashboard',
]


export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const currentUser = request.cookies.get("token")?.value

    // TODO implement token check

    if(currentUser && pathname === '/login') {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    if (!currentUser && protectedRoutes.includes(pathname)) {
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
