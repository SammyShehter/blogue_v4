"use server"
import fs from "fs"
import {escapeHtml} from "xss"

let tmbLogs: any = null

export async function removeTMBCache() {
    tmbLogs = null
}

export async function getTMBLogs() {
    try {
        if (tmbLogs) return {status: "SUCCESS", data: tmbLogs}
        const filePath = process.env.TMB_LOGS_PATH as string
        const appLogs = fs
            .readFileSync(`${filePath}/app.log`, "utf-8")
            .split("\n")
        const errorLogs = fs
            .readFileSync(`${filePath}/error.log`, "utf-8")
            .split("\n")
        const usersStorageJSON = JSON.parse(
            fs.readFileSync(`${filePath}/users_list.json`, "utf-8")
        )
        const songsStorageJSON = JSON.parse(
            fs.readFileSync(`${filePath}/song_storage.json`, "utf-8")
        )
        tmbLogs = {
            ["App Logs"]: {
                columns: "appLogs",
                lastUpdate: new Date().toISOString(),
                data: appLogs.map((log) => {
                    const [date, name] = log.split(" - ")
                    return {
                        date: new Date(date),
                        name,
                    }
                }),
            },
            ["Error Logs"]: {
                columns: "errorLogs",
                lastUpdate: new Date().toISOString(),
                data: errorLogs.map((log) => {
                    const [date, error] = log.split(" - ")
                    return {
                        date: new Date(date),
                        error,
                    }
                }),
            },
            ["Song Logs"]: {
                columns: "songLogs",
                lastUpdate: new Date().toISOString(),
                data: Object.entries(songsStorageJSON).map(
                    ([key, value]: [string, any]) => ({
                        ytLink: value.ytLink,
                        songName: escapeHtml(value.songName),
                        dwLink: value.dwLink,
                        timestamp: value.timestamp,
                        hits: value.hits,
                        downloads: value.downloads,
                        songColor: key,
                    })
                ),
            },
            ["User Logs"]: {
                columns: "usersLogs",
                lastUpdate: new Date().toISOString(),
                data: Object.entries(usersStorageJSON).map(
                    ([key, value]: [string, any]) => ({
                        userName: key.split(".").slice(0, -1).join(" "),
                        id: value.id,
                        last_request: value.last_request,
                        is_requesting: value.is_requesting,
                        violation_count: value.violation_count,
                        banned: value.banned,
                    })
                ),
            },
        }
        return {status: "SUCCESS", data: tmbLogs}
    } catch (error) {
        return {status: "FAILED", data: {}}
    }
}
