"use client"
import { useState } from "react"
import Link from "next/link"
import Logout from "../logout"
import { SideBardItemsData, SidebarItems } from "@/types/type"
import { DocumentsIcon, DraftDocumentsIcon, LogoutIcon, NewDocumentIcon, SettingsIcon, SiteLogo, TMBIcon } from "../logo"

const sidebarItems: SidebarItems = {
    dashboard: {
        link: "/dashboard",
        displayName: "Dashboard",
        shortName: DocumentsIcon(),
    },
    drafts: {
        link: "/dashboard/drafts",
        displayName: "Drafts",
        shortName: DraftDocumentsIcon(),
    },
    post: {
        link: "/dashboard/post",
        displayName: "Add Post",
        shortName: NewDocumentIcon(),
    },
    settings: {
        link: "/dashboard/settings",
        displayName: "Settings",
        shortName: SettingsIcon(),
    },
    tmb: {
        link: "/dashboard/tmb",
        displayName: "TMB Logs",
        shortName: TMBIcon(),
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
            <div className="flex justify-center py-2 hover:bg-gray-700 text-nowrap">
                {isExpanded ? <p>{data.displayName}</p> : data.shortName}
            </div>
        </Link>
    </li>
)

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    
    const handleMouseEnter = () => {
        setIsExpanded(true)
    }

    const handleMouseLeave = () => {
        setIsExpanded(false)
    }

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`bg-gray-800 text-white flex flex-col transition-all duration-200 ${
                isExpanded ? "w-64" : "w-16"
            } h-screen fixed left-0 top-0 pt-12 overflow-y-auto overflow-x-hidden`}
        >
            <div className="flex justify-center py-2 text-nowrap p-4">
                {isExpanded ? <img className="size-9 w-full" src="/admin_vanilla.gif"></img> : <SiteLogo className="size-9"/>}
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
                <Logout text={isExpanded ? "Logout" : LogoutIcon()} className="mb-5 w-full py-2 hover:bg-gray-700 text-nowrap text-center flex justify-center"/>
        </div>
    )
}


export default Sidebar
