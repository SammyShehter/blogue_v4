import { createHash } from "crypto";

export const cx = (...classNames: Array<string>) => classNames.filter(Boolean).join(" ");

export function hashString(input: string) {
    return createHash('sha256').update(input).digest('hex');
}