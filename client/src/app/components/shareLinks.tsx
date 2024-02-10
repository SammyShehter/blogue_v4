import Link from "next/link"
import {Mail, Telegram, Twitter, Whatsapp} from "./logo"

export default function ShareLinks({
    whatsAppLink,
    telegramLink,
    twitterLink,
    mailLink,
}: {
    whatsAppLink: string
    telegramLink: string
    twitterLink: string
    mailLink: string
}) {
    return (
        <div className="flex items-start justify-start space-x-3">
            <Link href={whatsAppLink} target="_blank" rel="noopener noreferrer">
                <Whatsapp className="" />
            </Link>
            <Link
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Telegram className="" />
            </Link>
            <Link
                href={twitterLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Twitter className="" />
            </Link>
            <Link
                href={mailLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Mail className="" />
            </Link>
        </div>
    )
}
