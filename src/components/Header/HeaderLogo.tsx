import React from "react"
import Link from "next/link"
import Image from "next/image"
import profileImg from "../../../public/profile-img.png"

interface HeaderLogoProps {}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({}) => {
    return (
        <Link href="/" className="flex items-center text-dark dark:text-light">
            <div className="w-12 md:w-16 mr-2 md:mr-4 rounded-full overflow-hidden border border-solid border-dark dark:border-gray">
                <Image
                    src={profileImg}
                    alt="SammyShehter logo"
                    className="w-full h-auto rounded-full"
                    sizes="20vw"
                    priority
                />
            </div>
            <span className="font-bold dark:font-semibold text-lg md:text-xl">
                SammyShehter
            </span>
        </Link>
    )
}
