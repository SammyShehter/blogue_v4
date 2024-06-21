import {ReactNode} from "react"

export type Repo = {
    status: string
    data: Array<Post>
}
export type Post = {
    title: string
    description: string
    author: string
    category: string
    slug: string
    views: number
    createdAt: string
    updatedAt: string
    batch: number
    date: string
    content: string
}

export type ApiPost = {
    status: string
    data: {
        title: string
        description: string
        content: string
        author: string
        category: string
        slug: string
        views: number
        createdAt: string
        updatedAt: string
    }
    date: string
    html: string
}

export type SideBardItemsData = {
    link: string
    displayName: string
    shortName: ReactNode
}

export type SidebarItems = {
    [key: string]: SideBardItemsData
}

export type TMBUserLog = {
    last_request: number
    is_requesting: boolean
    violation_count: number
    banned: boolean
    id: number
    userName: string
}

export type TMBSongLogs = {
    ytLink: string
    songName: string
    dwLink: string
    timestamp: number
    hits: number
    downloads: number
    songColor: string
}

export type TMBLogs = {
    [key: string]: {
        columns: string
        lastUpdate: Date
        data: any
    }
}
