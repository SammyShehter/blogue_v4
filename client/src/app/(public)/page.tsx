import Footer from "../components/footer"
import PreviewSection from "../components/previewSection"
import type { Repo } from "../types/type"

let repo: Repo = {
    data: [],
    date: new Date(),
    status: "",
}
export const getData = async () => {
    if (repo.status) return repo
    const myHeaders = new Headers()
    myHeaders.append("inner_request", "1")
    const res = await fetch("http://localhost:4747/api/posts", {
        method: "GET",
        headers: myHeaders,
    })
    const parsedData = await res.json()
    repo = parsedData
    repo.date = new Date()
    return repo
}

export default async function Home() {
    await getData()
    return (
        <>
            <header className="text-6xl font-bold text-center my-12">
                Welcome!
            </header>
            <p className="text-base text-gray-700 mb-6">
                The Easy Laptop Finder blog exists to help you find the perfect
                laptop based on your needs. Our blog posts have been
                specifically written to help you find the right laptop without
                having technical expertise in computer hardware.
            </p>
            <p className="text-base text-gray-700 mb-8">
                See our feature posts below for our favorites or head on over to
                <a href="/posts" className="text-blue-600 hover:text-blue-800">
                    the posts page
                </a>
                to read them all.
            </p>
            <PreviewSection previewPosts={repo.data} sectionName="Featured"/>
            <PreviewSection previewPosts={repo.data} sectionName="Recent Posts"/>
            <Footer />
        </>
    )
}
