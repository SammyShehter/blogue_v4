"use client"
import React, {useState} from "react"
import {motion} from "framer-motion"
import {HeaderLogo} from "./HeaderLogo"
import {GithubIcon, LinkedInIcon, MoonIcon, SunIcon} from "../Icons"
import siteMetaData from "@/utils/siteMetaData"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    const [theme, setTheme] = useState("dark")
    return (
        <header className="w-full p-4 px-5 sm:px-10 flex items-center justify-between">
            <HeaderLogo />

            <nav className="flex justify-center items-center flex-wrap">
                <motion.a
                    href={siteMetaData.linkedin}
                    target={"_blank"}
                    className="w-6 mr-3"
                    whileHover={{y: -2}}
                    whileTap={{scale: 0.7}}
                >
                    <LinkedInIcon className={""} />
                </motion.a>
                <motion.a
                    href={siteMetaData.github}
                    className="w-6 ml-3"
                    target={"_blank"}
                    whileHover={{y: -2}}
                    whileTap={{scale: 0.7}}
                >
                    <GithubIcon className={""} />
                </motion.a>
                <button
                    onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className={`ml-3 flex items-center justify-center rounded-full p-1 ${
                        theme === "light"
                            ? "bg-light text-dark"
                            : "bg-dark text-light"
                    }`}
                >
                    {theme === "dark" ? (
                        <SunIcon className="fill-dark" />
                    ) : (
                        <MoonIcon className="fill-dark" />
                    )}
                </button>
            </nav>
        </header>
    )
}
