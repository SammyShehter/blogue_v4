export async function formattedTime(date: string) {
    const timeParts = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "long",
        // day: "2-digit",
        dayPeriod: "short",
        timeZone: "Asia/Jerusalem",
        // hourCycle: "h24",
        weekday: "long",
    })
        .formatToParts(new Date(date))
        .reduce((acc, curr) => {
            acc[curr.type] = curr.value
            return acc
        }, Object.create(null))

    return `${timeParts.weekday} ${timeParts.dayPeriod}, ${timeParts.month} ${timeParts.year}`
}

export async function hashString(input: string) {
    const hashBuffer = await crypto.subtle.digest("SHA-256", Buffer.from(input))
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex
}