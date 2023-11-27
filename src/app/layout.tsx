import type {Metadata} from "next"
import {Inter, Manrope} from "next/font/google"
import "@/styles/globals.css"
import siteMetaData from "@/utils/siteMetaData"
import Script from "next/script"
import {Header} from "@/components/Header"
import {cx} from "@/utils/common"
import {Footer} from "@/components/Footer"

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-in",
})

const manrope = Manrope({
    subsets: ["latin"],
    display: "swap",
    variable: "--forn-mr",
})

const metadata: Metadata = {
    title: {
        template: `%s | ${siteMetaData.title}`,
        default: siteMetaData.title,
    },
    description: siteMetaData.description,
    openGraph: {
        title: siteMetaData.title,
        description: siteMetaData.description,
        url: siteMetaData.siteUrl,
        siteName: siteMetaData.title,
        // images: [siteMetaData.socialBanner],
        locale: "en_US",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    twitter: {
        card: "summary_large_image",
        title: siteMetaData.title,
        // images: [siteMetaData.socialBanner],
    },
}

export default function RootLayout({children}: {children: any}) {
    return (
        <html lang="en">
            <body
                className={cx(
                    inter.variable,
                    manrope.variable,
                    "font-mr bg-light dark:bg-dark"
                )}
            >
              <Script>
                document.documentElement.classList.add('dark')
              </Script>
                <Script id="theme-switcher" strategy="beforeInteractive">
                    {`if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                      document.documentElement.classList.add('dark')
                    } else {
                      document.documentElement.classList.remove('dark')
                    }`}
                </Script>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    )
}
