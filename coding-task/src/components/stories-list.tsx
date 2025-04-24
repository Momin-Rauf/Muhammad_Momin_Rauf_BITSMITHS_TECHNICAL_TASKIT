import Link from "next/link"
import { fetchTopStories } from "@/lib/api"
import { formatTimeAgo } from "@/lib/utils"

export default async function StoriesList({ page = 1 }: { page: number }) {
  const ITEMS_PER_PAGE = 30
  const startIndex = (page - 1) * ITEMS_PER_PAGE

  const stories = await fetchTopStories(startIndex, ITEMS_PER_PAGE)

  return (
    <div className="space-y-2 mt-2">
      {stories.map((story, index) => (
        <div key={story.id} className="flex items-start">
          <div className="text-gray-500 mr-1 w-5 text-right">{startIndex + index + 1}.</div>
          <div className="w-4 text-center mr-1">
            <span className="text-gray-500 cursor-pointer">▲</span>
          </div>
          <div>
            <div>
              <a href={story.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {story.title}
              </a>
              {story.url && (
                <span className="text-xs text-gray-500 ml-1">({new URL(story.url).hostname.replace("www.", "")})</span>
              )}
            </div>
            <div className="text-xs text-gray-500">
              {story.score} points by {story.by} {formatTimeAgo(story.time)} |
              <Link href={`/item/${story.id}`} className="hover:underline ml-1">
                {story.descendants || 0} comments
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
