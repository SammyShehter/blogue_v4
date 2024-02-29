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
