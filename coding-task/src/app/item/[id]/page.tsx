import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { formatTimeAgo } from "@/lib/utils"

async function fetchItem(id: number) {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, { next: { revalidate: 300 } })

  if (!response.ok) {
    throw new Error(`Failed to fetch item with ID ${id}`)
  }

  return response.json()
}

async function fetchComments(ids: number[] = []) {
  if (!ids.length) return []

  const comments = await Promise.all(
    ids.map(async (id) => {
      const comment = await fetchItem(id)

      if (comment.kids) {
        comment.childComments = await fetchComments(comment.kids)
      }

      return comment
    }),
  )

  return comments
}

export default async function ItemPage({ params }: { params: { id: string } }) {
  const id = Number(params.id)

  if (isNaN(id)) {
    return notFound()
  }

  const story = await fetchItem(id)

  if (!story) {
    return notFound()
  }

  const comments = story.kids ? await fetchComments(story.kids) : []

  return (
    <main className="min-h-screen bg-[#f6f6ef]">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-2">
        <div className="mb-4">
          <h1 className="text-xl">
            <a href={story.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {story.title}
            </a>
            {story.url && (
              <span className="text-xs text-gray-500 ml-1">({new URL(story.url).hostname.replace("www.", "")})</span>
            )}
          </h1>
          <div className="text-xs text-gray-500">
            {story.score} points by {story.by} {formatTimeAgo(story.time)} | {story.descendants || 0} comments
          </div>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} level={0} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}

function Comment({ comment, level }: { comment: any; level: number }) {
  if (comment.deleted || comment.dead) {
    return null
  }

  return (
    <div className="text-sm" style={{ marginLeft: `${level * 20}px` }}>
      <div className="text-xs text-gray-500">
        {comment.by} {formatTimeAgo(comment.time)}
      </div>
      <div className="mt-1" dangerouslySetInnerHTML={{ __html: comment.text || "" }} />
      {comment.childComments && comment.childComments.length > 0 && (
        <div className="mt-2 space-y-4">
          {comment.childComments.map((childComment: any) => (
            <Comment key={childComment.id} comment={childComment} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
