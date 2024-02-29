import {Calendar} from "@/components/logo"

export default function Loading() {
    return (
        <div className="flex items-center space-x-4 p-4">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Posts</h2>
                <div className="space-y-4">
                    <article className="py-4">
                        <div className="w-96 h-8 animate-shimmer mb-2"></div>
                        <div
                            className={`flex items-center justify-start space-x-2 text-sm text-gray-500 mb-2`}
                        >
                            <Calendar className="fill-gray-300" />
                            <div className="w-24 h-2 animate-shimmer"></div>
                        </div>
                        <div className="w-96 h-4 animate-shimmer mb-1"></div>
                        <div className="w-96 h-4 animate-shimmer mb-1"></div>
                        <div className="w-96 h-4 animate-shimmer mb-1"></div>
                        <div className="w-96 h-4 animate-shimmer mb-1"></div>
                    </article>
                    <article className="py-4">
                        <div className="w-96 h-8 animate-shimmer mb-2"></div>
                        <div
                            className={`flex items-center justify-start space-x-2 text-sm text-gray-500 mb-2`}
                        >
                            <Calendar className="fill-gray-300" />
                            <div className="w-24 h-2 animate-shimmer"></div>
                        </div>
                        <div className="w-96 h-4 animate-shimmer mb-1"></div>
                        <div className="w-96 h-4 animate-shimmer mb-1"></div>
                        <div className="w-96 h-4 animate-shimmer mb-1"></div>
                        <div className="w-96 h-4 animate-shimmer mb-1"></div>
                    </article>
                </div>
            </div>
        </div>
    )
}
