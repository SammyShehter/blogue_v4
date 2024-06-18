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
