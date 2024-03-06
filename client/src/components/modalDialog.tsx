import {moods} from "@/utils/enums"
import {useEffect, useRef, useState} from "react"

export default function ModalDialog({
    message,
    actionMessage,
    mood,
    onClose,
    onAction,
}: {
    message: string
    actionMessage: string
    onClose: Function
    onAction: Function
    mood: "happy" | "bored" | "dance"
}) {
    const [isOpen, setIsOpen] = useState(true)

    const handleClose = () => {
        setIsOpen(false)
        onClose()
    }

    const handleAction = () => {
        setIsOpen(false)
        onAction()
    }

    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div
                        className="bg-white rounded-lg p-8 flex flex-col items-center"
                    >
                        <button
                            onClick={handleClose}
                            className="text-gray-500 hover:text-gray-700 self-end"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <img src={moods[mood]}></img>
                        <div className="mb-4">{message}</div>
                        <button
                            onClick={handleAction}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            {actionMessage}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
