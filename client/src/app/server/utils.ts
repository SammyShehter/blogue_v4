export function formattedTime(date: string) {
    const timeParts = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        dayPeriod: "narrow",
        timeZone: "Asia/Jerusalem",
        hourCycle: "h24",
        weekday: "long",
    })
        .formatToParts(new Date(date))
        .reduce((acc, part) => {
            acc[part.type] = part.value
            return acc
        }, Object.create(null))

    return `${timeParts.year} ${timeParts.month} ${timeParts.weekday}, ${timeParts.dayPeriod}`
}
