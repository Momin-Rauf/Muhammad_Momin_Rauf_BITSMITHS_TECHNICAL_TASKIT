import type { Story } from "@/types"

// Fetch IDs of top stories
async function fetchTopStoryIds(): Promise<number[]> {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
    { next: { revalidate: 300 } }, // Revalidate every 5 minutes
  )

  if (!response.ok) {
    throw new Error("Failed to fetch top stories")
  }

  return response.json()
}

// Fetch a single story by ID
async function fetchStory(id: number): Promise<Story> {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, { next: { revalidate: 300 } })

  if (!response.ok) {
    throw new Error(`Failed to fetch story with ID ${id}`)
  }

  return response.json()
}

// Fetch multiple stories for a page
export async function fetchTopStories(startIndex: number, limit: number): Promise<Story[]> {
  const storyIds = await fetchTopStoryIds()
  const pageStoryIds = storyIds.slice(startIndex, startIndex + limit)

  const stories = await Promise.all(pageStoryIds.map((id) => fetchStory(id)))

  return stories
}
