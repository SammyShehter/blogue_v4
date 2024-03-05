"use client"
import {confirmPost, saveDraft} from "@/utils/actions"
import {useState} from "react"
import MarkdownRenderer from "../markdown"

export default function NewPost(props: {title?: string, content?: string, category?: string, draftKey?: string}) {
    const [title, setTitle] = useState(props?.title || '')
    const [content, setContent] = useState(props?.content || '')
    const [category, setCategory] = useState(props?.category || '')
    const [draftKey, setDraftKey] = useState(props?.draftKey || `${Date.now()}`)

    const onSave = (e: any) => {
        e.preventDefault()
        console.log(title, content, category)
        confirmPost({title, content, category})
    }

    const onDraft = async (e: any) => {
        e.preventDefault()
        await saveDraft(draftKey, {title, content, category})
    }
    return (
        <div className="flex justify-between">
            <div className="w-full pr-4">
                <label className="block mb-2 font-semibold text-gray-800">
                    Title
                </label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label className="block mb-2 font-semibold text-gray-800">
                    Category
                </label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <label className="block mb-2 font-semibold text-gray-800">
                    Content
                </label>
                <textarea
                    className="w-full min-h-screen border border-gray-300 rounded-md px-3 py-2 mb-4"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <div className="flex justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        onClick={onSave}
                    >
                        Confirm
                    </button>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                        onClick={onDraft}
                    >
                        Save Draft
                    </button>
                </div>
            </div>
            {/* <div></div> */}
            <div className="w-full h-screen overflow-y-auto pl-4">
                <MarkdownRenderer markdownText={content} />
            </div>
        </div>
    )
}
