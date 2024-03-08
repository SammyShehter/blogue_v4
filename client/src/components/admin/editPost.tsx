"use client"
import {confirmPost, removeDraft, saveDraft} from "@/utils/actions"
import {useState} from "react"
import MarkdownRenderer from "../markdown"
import ModalDialog from "../modalDialog"
import {useRouter} from "next/navigation"
import {useModal} from "@/utils/hooks."
import { editPost } from "@/utils/postRepo"

export default function EditPost(props: {
    slug?: string
    title?: string
    content?: string
    category?: string,
    description?: string,
    draftKey?: string
}) {
    const router = useRouter()
    const [isModalOpen, openModal, closeModal] = useModal()

    const [title, setTitle] = useState(props?.title || "")
    const [content, setContent] = useState(props?.content || "")
    const [category, setCategory] = useState(props?.category || "")
    const [description, setDescription] = useState(props?.description || "")
    const [slug, setSlug] = useState(props?.description || "")
    const [draftKey, setDraftKey] = useState(props?.draftKey || `${Date.now()}`)

    const onSave = async (e: any) => {
        e.preventDefault()
        const response = await confirmEditPost(slug, {title, content, category, description})
        if(response.valid) {
            await removeDraft(draftKey)
            openModal()
        }
        
    }

    const onDraft = async (e: any) => {
        e.preventDefault()
        await saveDraft(draftKey, {title, content, category})
    }

    const handleCloseModal = () => {
        closeModal()
        router.push(
            "/dashboard/post"
        )
    }

    const handleAction = () => {
        closeModal()
        router.push(
            "/posts/the-java-vs.-javascript-battle:-exploring-the-differences-in-2010"
        )
    }
    return (
        <>
            {isModalOpen && (
                <ModalDialog
                    message={`Post "${title}" edited succesfully`}
                    actionMessage="Go to post page"
                    mood="happy"
                    onClose={handleCloseModal}
                    onAction={handleAction}
                />
            )}
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
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 h-screen"
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
        </>
    )
}
