import type {Metadata} from "next"
import {IBM_Plex_Mono} from "next/font/google"
import "../globals.css"
const inter = IBM_Plex_Mono({subsets: ["latin"], weight: "400"})

export const metadata: Metadata = {
    title: "Admin Panel",
    description: "Fancy programmer admin panel",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}
