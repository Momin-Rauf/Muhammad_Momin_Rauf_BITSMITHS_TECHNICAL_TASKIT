import Link from "next/link"

export default function Pagination({ currentPage }: { currentPage: number }) {
  return (
    <div className="py-4 flex">
      {currentPage > 1 && (
        <Link href={`/?page=${currentPage - 1}`} className="px-4 py-2 text-gray-700 hover:underline">
          Previous
        </Link>
      )}
      <Link href={`/?page=${currentPage + 1}`} className="px-4 py-2 text-gray-700 hover:underline ml-auto">
        More
      </Link>
    </div>
  )
}
