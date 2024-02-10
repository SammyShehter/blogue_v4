import Link from "next/link"
import {SiteLogo} from "./logo"

export default function Footer() {
    return (
        <footer className="flex justify-between items-center mt-8 pt-8 pb-6 border-t">
            <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
            <SiteLogo className="" />
            <div className="flex items-center lg:py-2">
                Build With
                <span className="text-2xl px-1">
                    &#9825;
                </span>
                by&nbsp;
                <Link href="/" className="underline underline-offset-2">
                    Sammy Shehter
                </Link>
            </div>
        </footer>
    )
}
