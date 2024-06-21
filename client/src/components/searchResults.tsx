import React from "react"
import Link from "next/link"

const SearchResults = ({results, onClose}: any) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {results.length === 0 ? (
                <p className="p-4 text-gray-500">No results found</p>
            ) : (
                <ul>
                    {results.map((result: any) => (
                        <li
                            key={result.slug}
                            className="border-b last:border-b-0"
                        >
                            <Link
                                href={`/posts/${result.slug}`}
                                className="block p-4 hover:bg-gray-100 transition duration-150 ease-in-out"
                                onClick={onClose}
                            >
                                <h3 className="font-semibold">
                                    {result.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Category: {result.category}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Date: {result.date}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}



export default SearchResults
