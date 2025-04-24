import { Suspense } from "react"
import StoriesList from "@/components/stories-list"
import Pagination from "@/components/pagination"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const currentPage = Number(searchParams.page) || 1

  return (
    <main className="min-h-screen bg-[#f6f6ef]">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-2">
        <Suspense fallback={<StoriesListSkeleton />}>
          <StoriesList page={currentPage} />
        </Suspense>
        <Pagination currentPage={currentPage} />
      </div>
      <Footer />
    </main>
  )
}

function StoriesListSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="flex items-start">
            <div className="text-gray-500 mr-1">{i + 1}.</div>
            <div className="w-full">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2 mt-2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
