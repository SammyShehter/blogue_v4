import Link from "next/link"
import {SiteLogo} from "./logo"

export default function NavBar() {
    return (
        <nav className="mx-auto mb-8 pt-6 pb-8 border-b">
            <div className="mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    Sammy Shehter Blogue
                </Link>
                <Link href="/">
                    <SiteLogo className="w-20" />
                </Link>
                <div className="flex space-x-4 items-center">
                    <Link href="/posts/1" className="hover:text-gray-700">
                        Posts
                    </Link>
                    <Link href="/tags" className="hover:text-gray-700">
                        Tags
                    </Link>
                    <form>
                        <input
                            type="search"
                            placeholder="Search"
                            className="px-2 py-1 border rounded"
                        />
                    </form>
                </div>
            </div>
        </nav>
    )
}
