import {SiteLogo} from "../logo"

export default function AdminHeader({
    data,
}: {
    data: {userRole: string; userName: string}
}) {
    return (
        <header className="bg-gray-800 text-white py-2 w-full">
            <div className="flex items-center justify-between px-6">
                <p>Hi {data.userName}!</p>
                <div>
                    <SiteLogo className="w-12" />
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <p className="cursor-pointer hover:text-gray-300">
                                D
                            </p>
                        </li>
                        <li>
                            <p className="cursor-pointer hover:text-gray-300">
                                S
                            </p>
                        </li>
                        <li>
                            <p className="cursor-pointer hover:text-gray-300">
                                U
                            </p>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
