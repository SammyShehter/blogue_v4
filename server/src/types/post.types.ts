export type Post = {
    author: string
    content: string
    category: string
    slug: string
    title: string
    description: string
    views: number

    date?: string
    createdAt?: string
}

export type newPost = {
    content: string
    category: string
    title: string
}

export type generatedPost = {
    content: string
    description: string
    title: string
}

export type rawEditPost = {
    slug: string
    content?: string
    category?: string
    title?: string
    description?: string
    views?: number
}