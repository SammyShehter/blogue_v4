"use client"
import {useState, useEffect, useRef} from "react"
import Link from "next/link"
import Logout from "../logout"
import {SideBardItemsData, SidebarItems} from "@/types/type"

const sidebarItems: SidebarItems = {
    dashboard: {
        link: "/dashboard",
        displayName: "Dashboard",
        shortName: "Da",
    },
    drafts: {
        link: "/dashboard/drafts",
        displayName: "Drafts",
        shortName: "Dr",
    },
    settings: {
        link: "/dashboard/settings",
        displayName: "Settings",
        shortName: "S",
    },
    post: {
        link: "/dashboard/post",
        displayName: "Add Post",
        shortName: "AP",
    },
}

const SidebarItem = ({
    data,
    isExpanded,
}: {
    data: SideBardItemsData
    isExpanded: boolean
}) => (
    <li>
        <Link href={data.link}>
            <p className="py-2 hover:bg-gray-700">
                {isExpanded ? data.displayName : data.shortName}
            </p>
        </Link>
    </li>
)

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
            } h-dlv`}
        >
            <div
                onClick={handleClickInside}
                className="flex items-center justify-center py-2 cursor-pointer mb-5"
            >
                <h1 className="text-lg font-bold">
                    {isExpanded ? "Admin Dashboard" : "AD"}
                </h1>
            </div>
            <div className="flex-1 text-center">
                <nav>
                    <ul>
                        {Object.entries(sidebarItems).map(([key, data]) => (
                            <SidebarItem
                                key={key}
                                data={data}
                                isExpanded={isExpanded}
                            />
                        ))}
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
