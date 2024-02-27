export type Repo = {
    status: string
    data: Array<previewPost>
}
export type previewPost = {
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
}

export type Post = {
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
