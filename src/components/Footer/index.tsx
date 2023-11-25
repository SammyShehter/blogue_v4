"use client"
import siteMetaData from "@/utils/siteMetaData"
import React from "react"
import {GithubIcon, LinkedInIcon, Logo} from "../Icons"
import Link from "next/link"

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
    return (
        <footer className="flex items-center justify-around w-full font-medium text-lg dark:text-light sm:text-base bg-light dark:bg-dark flex-col md:flex-row">
                    <span>
                        {new Date().getFullYear()} &copy; All Rights Reserved.
                    </span>
                    <Logo className="" />
                    <div className="flex items-center lg:py-2">
                        Build With
                        <span className="text-primary text-2xl px-1 dark:text-primaryDark">
                            &#9825;
                        </span>
                        by&nbsp;
                        <Link href="/" className="underline underline-offset-2">
                            Sammy Shehter
                        </Link>
                    </div>
        </footer>
    )
}
