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
            <PreviewSection
                previewPosts={data.slice(0, 3)}
                sectionName="Featured"
            />
            <div className="border-b my-10"></div>
            <PreviewSection
                previewPosts={data.slice(0, 3)}
                sectionName="Recent Posts"
            />
            <div className="flex space-x-2 items-center justify-center">
                <Link href="/posts/1">
                    <p>All Posts</p>
                </Link>
                <ArrowRight className="" />
            </div>
        </>
    )
}
