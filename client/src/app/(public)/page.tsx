import Link from "next/link"
import { ArrowRight } from "@/components/logo"
import PreviewSection from "@/components/previewSection"
import { fetchLatestPosts } from "@/utils/postRepo"

export default async function Home() {
    const {data, status} = await fetchLatestPosts()
    if(status !== "SUCCESS") {
        data.length = 0
    }

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <PreviewSection
                    previewPosts={data.slice(0, 3)}
                    sectionName="Featured"
                />
                <PreviewSection
                    previewPosts={data.slice(0, 3)}
                    sectionName="Recent Posts"
                />
            </div>
            <div className="flex max-md:flex-row space-x-0 items-center justify-center mt-8">
                <Link href="/posts/1">
                    <p className="text-center md:text-left">All Posts</p>
                </Link>
                <ArrowRight className="" />
            </div>
        </>
    )
}
