"use client"
import {confirmPost, removeDraft, saveDraft} from "@/utils/actions"
import {useState} from "react"
import MarkdownRenderer from "../markdown"
import ModalDialog from "../modalDialog"
import {useRouter} from "next/navigation"
import {useModal} from "@/utils/hooks."

export default function NewPost(props: {
    title?: string
    content?: string
    category?: string
    draftKey?: string
}) {
    const router = useRouter()
    const [isModalOpen, openModal, closeModal] = useModal()

    const [title, setTitle] = useState(props?.title || "")
    const [content, setContent] = useState(props?.content || "")
    const [category, setCategory] = useState(props?.category || "")
    const [draftKey, setDraftKey] = useState(props?.draftKey || `${Date.now()}`)

    const onSave = async (e: any) => {
        e.preventDefault()
        const response = await confirmPost({title, content, category})
        if (response.valid) {
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
        router.push("/dashboard/post")
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
                    message={`Post "${title}" uploaded succesfully`}
                    actionMessage="Go to post page"
                    mood="happy"
                    onClose={handleCloseModal}
                    onAction={handleAction}
                />
            )}
            <div className="flex justify-between py-4">
                <div className="w-full h-screen overflow-y-auto p-4 border border-gray-400 rounded-lg bg-[#f1ece6] mr-2">
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
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 h-96"
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
                {content && (
                    <div className="w-full h-screen overflow-y-auto p-4 border border-gray-400 rounded-lg bg-[#f1ece6]">
                        <MarkdownRenderer markdownText={content} />
                    </div>
                )}
            </div>
        </>
    )
}
