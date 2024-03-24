"use client"
import Link from "next/link"
import {useState, useEffect, useRef} from "react"
import {SiteLogo} from "./logo"

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
        if ((e.target as HTMLElement).classList.contains("menu-outside") && isMenuOpen) {
            setIsMenuOpen(false)
        }
    }

    return (
        <nav className="mx-auto mb-8 pt-6 pb-8 border-b">
            <div className="mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold max-md:hidden">
                    Sammy Shehter Blogue
                </Link>
                <Link href="/" className="text-xl font-bold md:hidden">
                    <img src="/glitched_bestBoi.gif" alt="logo" className="w-20 grayscale opacity-90"/>
                </Link>
                <Link href="/">
                    <SiteLogo className="w-20" />
                </Link>
                <div className="flex space-x-4 items-center">
                    <button onClick={() => setIsMenuOpen(true)} className="block md:hidden">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    <div
                        className="flex space-x-4 items-center max-md:hidden"
                    >
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
            </div>
            {isMenuOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 menu-outside"
                    onClick={handleOutsideClick}
                >
                    <div className="bg-white p-4 rounded">
                        <Link href="/posts/1" className="block py-2">
                            Posts
                        </Link>
                        <Link href="/tags" className="block py-2">
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
            )}
        </nav>
    )
}
