export type Repo = {
    status: string
    data: Array<PreviewPost>
    date: Date
}
export type PreviewPost = {
    title: string
    description: string
    author: string
    category: string
    slug: string
    views: number
    createdAt: string
    updatedAt: string
}