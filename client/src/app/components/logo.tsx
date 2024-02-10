import Link from "next/link"
export function SiteLogo({className}: {className: string}) {
    return (
        <div className={`flex items-center justify-center mt-1 ${className}`}>
            <Link
                href="/"
                className={`w-20 h-16  flex items-center justify-center rounded-full text-2xl font-bold border border-solid border-transparent md:text-base md:h-8 text-dark dark:text-light`}
            >
                <svg viewBox="0 0 40 16.417460365900915">
                    <g
                        transform="translate(-0.31746031746031744, -12.10888938298301) scale(0.31746031746031744)"
                        fill="currentColor"
                    >
                        <g xmlns="http://www.w3.org/2000/svg">
                            <path d="M90.716,58.23c0.106-0.063,0.225-0.094,0.345-0.102l-0.651-8.221l-15.451,8.898l7.379,4.248L90.716,58.23z"></path>
                            <polygon points="38.218,79.959 37.434,89.857 63.781,74.688 55.426,70.053  "></polygon>
                            <path d="M38.148,49.908l-0.65,8.221c0.119,0.01,0.239,0.039,0.347,0.102l8.789,5.061h0.001l44.49,26.566l-0.785-9.898   L38.148,49.908z"></path>
                            <path d="M99.914,63.055l7.379-4.248L91.84,49.908l-0.65,8.221c0.119,0.008,0.239,0.039,0.348,0.102L99.914,63.055z"></path>
                            <path d="M64.904,53.248l8.394,4.613l17.184-9.895c0.138-0.17,0.341-0.289,0.579-0.309c0.285-0.021,0.547,0.104,0.712,0.313   l17.581,10.121c0.014,0.008,0.025,0.02,0.037,0.027c0.026,0.018,0.05,0.033,0.074,0.053c0.02,0.016,0.039,0.035,0.059,0.055   c0.018,0.018,0.036,0.037,0.053,0.057c0.02,0.023,0.036,0.049,0.053,0.074c0.009,0.014,0.02,0.023,0.038,0.061   c0.014,0.027,0.025,0.055,0.036,0.082c0.01,0.021,0.02,0.047,0.026,0.07c0.008,0.025,0.013,0.051,0.018,0.078   c0.006,0.025,0.012,0.053,0.014,0.078c0.003,0.027,0.002,0.053,0.002,0.08c0,0.025,0.001,0.051-0.002,0.078   c-0.002,0.025-0.008,0.053-0.014,0.078c-0.005,0.027-0.01,0.053-0.018,0.078c-0.007,0.023-0.017,0.047-0.026,0.07   c-0.011,0.027-0.022,0.055-0.047,0.105c-0.005,0.01-0.014,0.016-0.02,0.023c-0.027,0.045-0.059,0.086-0.096,0.125   c-0.012,0.014-0.021,0.025-0.035,0.037c-0.046,0.043-0.096,0.084-0.158,0.119L91.537,69.777c-0.128,0.074-0.271,0.109-0.412,0.109   s-0.283-0.035-0.409-0.109L37.458,38.143L1.573,58.801l35.857,19.713l16.318-9.395l-7.517-4.17l-8.388,4.828   c-0.127,0.074-0.269,0.111-0.41,0.111s-0.284-0.037-0.411-0.111c-0.815-0.451-16.51-9.107-17.285-9.568   c-0.514-0.305-1.114-0.572-1.021-1.271c0.111-0.842,1.209-1.262,1.861-1.637c2.014-1.16,4.028-2.318,6.042-3.479   c2.295-1.322,9.075-5.225,10.17-5.855c0.138-0.17,0.341-0.289,0.579-0.309c0.285-0.021,0.547,0.104,0.713,0.313l53.053,30.545   l35.863-19.709L91.125,38.15L64.904,53.248z"></path>
                            <polygon points="127,58.807 91.91,79.949 91.126,89.857 127,69.203  "></polygon>
                            <path d="M21.266,58.807l7.381,4.248l8.377-4.824c0.107-0.063,0.226-0.092,0.346-0.102l-0.651-8.221L21.266,58.807z"></path>
                            <polygon points="1,58.807 1,69.203 37.154,89.857 36.229,79.949  "></polygon>
                        </g>
                    </g>
                </svg>
            </Link>
        </div>
    )
}

export function Telegram({className}: {className: string}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${className} share-icon-anim icon-lines text-black`}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path>
        </svg>
    )
}

export function Whatsapp({className}: {className: string}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${className} share-icon-anim icon-lines text-black`}
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
            <path d="M9 10a0.5 .5 0 0 0 1 0v-1a0.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 .5 0 0 0 0 -1h-1a0.5 .5 0 0 0 0 1"></path>
        </svg>
    )
}

export function Twitter({className}: {className: string}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${className} share-icon-anim icon-lines text-black`}
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"></path>
        </svg>
    )
}

export function Mail({className}: {className: string}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${className} share-icon-anim icon-lines text-black`}
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <rect x="3" y="5" width="18" height="14" rx="2"></rect>
            <polyline points="3 7 12 13 21 7"></polyline>
        </svg>
    )
}

export function Calendar({className}: {className: string}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`inline-block fill-skin-base h-6 min-w-[1.375rem] scale-100 w-6 ${className}`}
            aria-hidden="true"
        >
            <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
            <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
        </svg>
    )
}

export function ArrowRight({className}: {className: string}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`inline-block fill-skin-base h-6 min-w-[1.375rem] scale-100 w-6 ${className}`}
        >
            <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path>
        </svg>
    )
}
