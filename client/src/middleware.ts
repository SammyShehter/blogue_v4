import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { deleteCookies } from "./utils/actions"

const protectedRoutes = [
    '/dashboard',
]


export async function middleware(request: NextRequest & { hash: string }) {
    const { pathname } = request.nextUrl
    const currentUser = request.cookies.get("token")?.value

    if (!currentUser) {
        if (protectedRoutes.includes(pathname)) {
            return NextResponse.redirect(new URL("/login", request.url))
        } else {
            return NextResponse.next()
        }
    }

    if (currentUser && pathname === '/login') {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpeg$).*)"],
    missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
    ],
}
