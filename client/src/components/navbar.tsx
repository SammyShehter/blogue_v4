"use client"
import Link from "next/link"
import {useState, useEffect, useRef} from "react"
import {SiteLogo} from "./logo"
import SearchResults from "./searchResults"

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const searchRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                searchRef.current &&
                //@ts-ignore
                !searchRef.current.contains(event.target)
            ) {
                setIsSearching(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () =>
            document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSearch = async (e: any) => {
        e.preventDefault()
        setIsSearching(true)

        try {
            const response = await fetch(
                `/api/posts/search?query=${encodeURIComponent(searchTerm)}`,
                {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                }
            )
            const {posts} = await response.json()
            setSearchResults(posts || [])
        } catch (error) {
            console.error("Search error:", error)
            setSearchResults([])
        }
    }

    const closeSearch = () => {
        setIsSearching(false)
        setIsMenuOpen(false)
    }

    return (
        <nav className="mx-auto mb-8 pt-6 pb-8">
            <div className="mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold max-md:hidden">
                    Sammy Shehter Blogue
                </Link>
                <Link href="/" className="text-xl font-bold md:hidden">
                    <img
                        src="/glitched_bestBoi.gif"
                        alt="logo"
                        className="w-20 grayscale opacity-90"
                    />
                </Link>
                <Link href="/">
                    <SiteLogo className="w-20" />
                </Link>
                <div className="flex space-x-4 items-center">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="block md:hidden"
                    >
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
                    <div className="flex space-x-4 items-center max-md:hidden">
                        <Link href="/posts/1" className="hover:text-gray-700">
                            Posts
                        </Link>
                        <SearchBar
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            handleSearch={handleSearch}
                            isSearching={isSearching}
                            searchResults={searchResults}
                            closeSearch={closeSearch}
                            searchRef={searchRef}
                        />
                    </div>
                </div>
            </div>
            <MobileMenu
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                isSearching={isSearching}
                searchResults={searchResults}
                closeSearch={closeSearch}
                setIsSearching={setIsSearching}
            />
        </nav>
    )
}

function SearchBar({
    searchTerm,
    setSearchTerm,
    handleSearch,
    isSearching,
    searchResults,
    closeSearch,
    searchRef,
}: any) {
    return (
        <div ref={searchRef} className="relative">
            <form onSubmit={handleSearch}>
                <input
                    type="search"
                    placeholder="Search"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchButton searchTerm={searchTerm} />
            </form>
            {isSearching && (
                <div className="absolute right-0 mt-2 w-64">
                    <SearchResults
                        results={searchResults}
                        onClose={closeSearch}
                    />
                </div>
            )}
        </div>
    )
}

function SearchButton({searchTerm}: any) {
    return (
        <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
            {!searchTerm && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            )}
        </button>
    )
}

function MobileMenu({
    isMenuOpen,
    setIsMenuOpen,
    searchTerm,
    setSearchTerm,
    handleSearch,
    isSearching,
    searchResults,
    closeSearch,
    setIsSearching,
}: any) {
    const searchRef = useRef(null)
    const menuRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (
                searchRef.current &&
                //@ts-ignore
                !searchRef.current.contains(event.target) &&
                menuRef.current &&
                //@ts-ignore
                !menuRef.current.contains(event.target)
            ) {
                setIsSearching(false)
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [setIsSearching, setIsMenuOpen])

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out ${
                isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <div
                ref={menuRef}
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="p-4 flex flex-col h-full">
                    <nav className="mt-8">
                        <Link
                            href="/posts/1"
                            className="block py-2 text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors duration-200"
                        >
                            Posts
                        </Link>
                        <div className="border-t border-gray-200 my-2"></div>
                        <Link
                            href="/about"
                            className="block py-2 text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors duration-200"
                        >
                            About
                        </Link>
                        <div className="border-t border-gray-200 my-2"></div>
                        <Link
                            href="/contact"
                            className="block py-2 text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors duration-200"
                        >
                            Contact
                        </Link>
                    </nav>

                    <div className="mt-auto" ref={searchRef}>
                        {isSearching && (
                            <div className="mt-2 bg-white rounded-lg shadow-md max-h-60 overflow-y-auto mb-4">
                                <SearchResults
                                    results={searchResults}
                                    onClose={closeSearch}
                                />
                            </div>
                        )}
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="search"
                                placeholder="Search"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setIsSearching(true)}
                            />
                            <SearchButton searchTerm={searchTerm} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
