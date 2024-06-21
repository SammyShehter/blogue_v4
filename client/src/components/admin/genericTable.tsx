"use client"
import React, {useState, useMemo} from "react"

const GenericTable = ({data, columns}: any) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "ascending",
    })

    const sortedData = useMemo(() => {
        let sortableItems = [...data]
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key!] < b[sortConfig.key!]) {
                    return sortConfig.direction === "ascending" ? -1 : 1
                }
                if (a[sortConfig.key!] > b[sortConfig.key!]) {
                    return sortConfig.direction === "ascending" ? 1 : -1
                }
                return 0
            })
        }
        return sortableItems
    }, [data, sortConfig])

    const filteredData = useMemo(() => {
        return sortedData.filter((item) =>
            Object.values(item).some(
                (value) =>
                    value &&
                    value
                        .toString()
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            )
        )
    }, [sortedData, searchTerm])

    const requestSort = (key: any) => {
        let direction = "ascending"
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending"
        }
        setSortConfig({key, direction})
    }

    const getSortDirection = (key: any) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === "ascending" ? "▲" : "▼"
        }
        return ""
    }

    const renderCellContent = (item: any, column: any) => {
        const value = item[column.key]
        if (column.render) {
            return column.render(value, item)
        }
        return value
    }

    return (
        <div className="p-6">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200 text-gray-600 text-sm leading-normal">
                    <tr>
                        {columns.map((column: any) => (
                            <th
                                key={column.key}
                                className={`py-3 px-6 text-${
                                    column.align || "left"
                                } cursor-pointer`}
                                onClick={() => requestSort(column.key)}
                            >
                                {column.label} {getSortDirection(column.key)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {filteredData.map((item, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            {columns.map((column: any) => (
                                <td
                                    key={column.key}
                                    className={`py-3 px-6 text-${
                                        column.align || "left"
                                    } ${column.className || ""}`}
                                >
                                    {renderCellContent(item, column)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredData.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                    No results found for "{searchTerm}"
                </div>
            )}
        </div>
    )
}

export default GenericTable
