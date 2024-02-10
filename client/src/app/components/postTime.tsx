import {Calendar} from "./logo"

export function PostTime({formattedTime, className}: {formattedTime: string, className: string}) {
    return (
        <div className={`flex items-center justify-start space-x-2 text-sm text-gray-500 ${className}`}>
            <Calendar className="" />
            <p className="italic my-0">{formattedTime}</p>
        </div>
    )
}
