import Link from "next/link"
import { SiteLogo } from "./logo"

export default function Footer() {
    return (
        <footer className="flex justify-between items-center mt-8 pt-8 pb-6 border-t max-md:flex-col">
            <span className="max-md:pb-4">{new Date().getFullYear()} &copy; All Rights Reserved.</span>
            <Link href="/" className="max-md:py-4">
                <SiteLogo className="w-20" />
            </Link>
            <div className="flex items-center max-md:pt-4">
                Build With
                <span className="text-2xl px-1">&#9825;</span>
                by&nbsp;
                <Link href="/" className="underline underline-offset-2">
                    Sammy Shehter
                </Link>
            </div>
        </footer>
    )
}