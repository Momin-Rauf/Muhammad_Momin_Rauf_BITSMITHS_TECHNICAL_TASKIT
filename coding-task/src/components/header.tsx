'use client';
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-[#ff6600] text-black">
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-white mr-2">
            <span className="border border-white px-1">Y</span>
          </Link>
          <nav className="flex space-x-4 text-sm">
            <Link href="/" className="font-bold">
              HackerNews Clone
            </Link>
            <Link href="/">new</Link>
            <Link href="/">past</Link>
            <Link href="/">comments</Link>
            <Link href="/">ask</Link>
            <Link href="/">show</Link>
            <Link href="/">jobs</Link>
            <Link href="/">submit</Link>
          </nav>
        </div>
        <div className="ml-auto text-sm">
          <Link href="/">login</Link>
        </div>
      </div>
    </header>
  )
}
