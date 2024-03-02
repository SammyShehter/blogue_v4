"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Logout from "../logout"

const Sidebar = () => {
    const sidebarRef = useRef(null)
    const [isExpanded, setIsExpanded] = useState(false)

    const handleClickOutside = (event: any) => {
        // @ts-ignore
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsExpanded(false)
        }
    }

    const handleClickInside = () => {
        setIsExpanded(!isExpanded)
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    return (
        <div
            ref={sidebarRef}
            className={`bg-gray-800 text-white flex flex-col transition-all ${
                isExpanded ? "w-64" : "w-16"
            } min-h-screen`}
        >
            <div
                onClick={handleClickInside}
                className="flex items-center justify-center py-2 cursor-pointer mb-5"
            >
                {isExpanded ? (
                    <h1 className="text-lg font-bold">Admin Dashboard</h1>
                ) : (
                    <h1 className="text-lg font-bold">AD</h1>
                )}
            </div>
            <div className="flex-1 text-center">
                <nav>
                    <ul>
                        <li>
                            <Link href="/dashboard">
                                {isExpanded ? (
                                    <p className="py-2 hover:bg-gray-700">
                                        Dashboard
                                    </p>
                                ) : (
                                    <p className="py-2 hover:bg-gray-700">D</p>
                                )}
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/settings">
                                {isExpanded ? (
                                    <p className="py-2 hover:bg-gray-700">
                                        Settings
                                    </p>
                                ) : (
                                    <p className="block py-2 hover:bg-gray-700">
                                        S
                                    </p>
                                )}
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/post">
                                {isExpanded ? (
                                    <p className="py-2 hover:bg-gray-700">
                                        Add Post
                                    </p>
                                ) : (
                                    <p className="block py-2 hover:bg-gray-700">
                                        A
                                    </p>
                                )}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="mb-5 mx-auto">
            <Logout text={isExpanded ? "Logout" : "L"} />
            </div>
        </div>
    )
}

export default Sidebar
