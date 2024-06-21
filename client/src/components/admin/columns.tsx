import Link from "next/link"

export const columns = {
    usersLogs: [
        {
            key: "userName",
            label: "User",
            className: "whitespace-nowrap w-60",
            render: (value: string) => (
                <div title={value}>
                    {value?.length > 20 ? `${value.slice(0, 20)}...` : value}
                </div>
            ),
        },
        {key: "id", label: "ID"},
        {
            key: "last_request",
            label: "Last Request",
            render: (value: string) => new Date(value).toLocaleString(),
        },
        {
            key: "is_requesting",
            label: "Requesting",
            align: "center",
            render: (value: string) => (
                <span
                    className={`${
                        value
                            ? "bg-green-200 text-green-600"
                            : "bg-red-200 text-red-600"
                    } py-1 px-3 rounded-full text-xs`}
                >
                    {value ? "Yes" : "No"}
                </span>
            ),
        },
        {
            key: "violation_count",
            label: "Violations",
            align: "center",
            render: (value: number) => value.toLocaleString(),
        },
        {
            key: "banned",
            label: "Banned",
            align: "right",
            render: (value: string) => (
                <span
                    className={`${
                        value
                            ? "bg-red-200 text-red-600"
                            : "bg-green-200 text-green-600"
                    } py-1 px-3 rounded-full text-xs`}
                >
                    {value ? "Yes" : "No"}
                </span>
            ),
        },
    ],
    songLogs: [
        {
            key: "songName",
            label: "Song Name",
            className: "whitespace-nowrap w-60",
            render: (value: string) => (
                <div title={value}>
                    {value?.length > 20 ? `${value.slice(0, 20)}...` : value}
                </div>
            ),
        },
        {
            key: "ytLink",
            label: "YouTube Link",
            render: (value: string) => (
                <a href={value} target="_blank" rel="noopener noreferrer">
                    Link
                </a>
            ),
        },
        {
            key: "dwLink",
            label: "Download Link",
            render: (value: string) => (
                <a href={value} target="_blank" rel="noopener noreferrer">
                    Download
                </a>
            ),
        },
        {
            key: "timestamp",
            label: "Timestamp",
            render: (value: string) => new Date(value).toLocaleString(),
        },
        {key: "hits", label: "Hits", align: "center"},
        {key: "downloads", label: "Downloads", align: "center"},
        {
            key: "songColor",
            label: "Color",
            render: (value: string) => (
                <p style={{color: `#${value}`}}>{value}</p>
            ),
        },
    ],
    appLogs: [
        {
            key: "date",
            label: "Date",
            render: (value: Date) => new Date(value).toLocaleString(),
        },
        {key: "name", label: "Name"},
    ],
    errorLogs: [
        {
            key: "date",
            label: "Date",
            render: (value: Date) => new Date(value).toLocaleString(),
        },
        {key: "error", label: "Error"},
    ],
    dashboardPosts: [
        {
            key: "title",
            label: "Title",
            className: "whitespace-nowrap w-60",
            render: ([title, slug]: Array<string>) => (
                <div title={title}>
                    <Link href={`/dashboard/post/edit/${slug}`}>
                        <p className="font-medium text-blue-500 hover:underline">
                            {title?.length > 20
                                ? `${title.slice(0, 20)}...`
                                : title}
                        </p>
                    </Link>
                </div>
            ),
        },
        {
            key: "author",
            label: "Author",
            className: "whitespace-nowrap w-40",
        },
        {
            key: "createdAt",
            label: "Date",
            render: (value: string) => new Date(value).toLocaleString(),
        },
        {
            key: "description",
            label: "Description",
            className: "whitespace-nowrap w-60",
            render: (value: string) => (
                <div title={value}>
                    {value?.length > 20 ? `${value.slice(0, 20)}...` : value}
                </div>
            ),
        },
        {
            key: "views",
            label: "Views",
            align: "center",
        },
        {
            key: "category",
            label: "Category",
            className: "whitespace-nowrap w-40",
        },
        {
            key: "updatedAt",
            label: "Updated At",
            render: (value: string) => new Date(value).toLocaleString(),
        },
    ],
    draftsPosts: [
        {
            key: "key",
            label: "Key",
            className: "whitespace-nowrap w-40",
            render: (value: string) => (
                <div title={value}>
                    <Link href={`/dashboard/post/draft/${value}`}>
                        <p className="font-medium text-blue-500 hover:underline">
                            {value}
                        </p>
                    </Link>
                </div>
            ),
        },
        {
            key: "title",
            label: "Title",
            className: "whitespace-nowrap w-60",
            render: (value: string) => (
                <div title={value}>
                    <p>
                        {value?.length > 20
                            ? `${value.slice(0, 20)}...`
                            : value}
                    </p>
                </div>
            ),
        },
        {
            key: "category",
            label: "Category",
            className: "whitespace-nowrap w-40",
        },
        {
            key: "content",
            label: "Content",
            className: "whitespace-nowrap w-60",
            render: (value: string) => (
                <div title={value}>
                    {value?.length > 20 ? `${value.slice(0, 20)}...` : value}
                </div>
            ),
        },
    ],
}
