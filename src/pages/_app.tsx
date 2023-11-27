import {Footer} from "@/components/Footer"
import {Header} from "@/components/Header"
import "@/styles/globals.css"
import {cx} from "@/utils/common"
import {Inter, Manrope} from "next/font/google"
import {useRouter} from "next/router"

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

export default function App({Component, pageProps}: any) {
    const router = useRouter()
    return (
        <div className={cx(inter.variable, manrope.variable)}>
            <Header />
            <Component key={router.asPath} {...pageProps} />
            <Footer />
        </div>
    )
}
