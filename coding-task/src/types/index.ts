export interface Story {
    id: number
    title: string
    url?: string
    text?: string
    by: string
    time: number
    score: number
    descendants: number
    kids?: number[]
    type: "story" | "job" | "comment" | "poll" | "pollopt"
  }