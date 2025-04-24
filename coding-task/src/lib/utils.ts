import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function formatTimeAgo(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000)
  const secondsAgo = now - timestamp

  if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`
  }

  const minutesAgo = Math.floor(secondsAgo / 60)
  if (minutesAgo < 60) {
    return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`
  }

  const hoursAgo = Math.floor(minutesAgo / 60)
  if (hoursAgo < 24) {
    return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`
  }

  const daysAgo = Math.floor(hoursAgo / 24)
  return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
