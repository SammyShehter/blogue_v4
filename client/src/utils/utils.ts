export async function hashString(input: string) {
    const hashBuffer = await crypto.subtle.digest("SHA-256", Buffer.from(input))
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("")
    return hashHex
}

export function dayNightBg() {
    const clock = new Date().getHours()
    const inlineStyle = {
        background: 'url("/12.jpeg") center',
        backgroundSize: "cover",
    }
    clock > 7 && clock < 19
        ? (inlineStyle.background = 'url("/12.jpeg") center')
        : (inlineStyle.background = 'url("/24.jpeg") center')
    return inlineStyle
}

export const headersIP = [
    "cf-connecting-ip",
    "x-real-ip",
    "x-forwarded-for",
    "x-client-ip",
    "x-host",
    "x-originating-ip",
    "x-remote-ip",
    "x-proxyuser-ip",
    "x-remote-addr",
    "x-forwarded-host",
    "x-forwarded-server",
    "x-remote-host",
    "x-remote-server",
    "x-client-host",
    "x-client-server",
    "x-proxy-user",
    "x-proxy-user-ip",
    "x-forwarded-by",
    "forwarded-for",
    "forwarded",
    "via",
    "x-forwarded",
]

const requestCounts: {
    [key: string]: {
        count: number
        startTime: number
    }
} = {}
const MAX_REQUESTS_PER_HOUR = 30
const WINDOW_SIZE_IN_HOURS = 1
const WINDOW_SIZE_IN_MS = WINDOW_SIZE_IN_HOURS * 60 * 60 * 1000

export async function rateLimitCheck(ip: string) {
    const currentTime = Date.now()
    if (!requestCounts[ip]) {
        requestCounts[ip] = {
            count: 1,
            startTime: currentTime,
        }
    } else {
        requestCounts[ip].count++
        const elapsedTime = currentTime - requestCounts[ip].startTime
        if (elapsedTime > WINDOW_SIZE_IN_MS) {
            requestCounts[ip] = {
                count: 1,
                startTime: currentTime,
            }
        } else if (requestCounts[ip].count > MAX_REQUESTS_PER_HOUR) {
            throw new Error("Rate limit exceeded. Try again later.")
        }
    }
}

export function customTrim(str: string): string {
    // Remove whitespace from both ends of a string
    return str.replace(/^\s+|\s+$/g, '');
}

export function customEscape(str: string): string {
    // Encode a string to make it safe for URL or HTML
    // This replaces characters that have special meaning in HTML with their entity codes
    return encodeURIComponent(str).replace(/[!'()*]/g, (c) => {
        // RFC 3986 specifies !, ', (, ), and * should be escaped
        return '%' + c.charCodeAt(0).toString(16);
    });
}