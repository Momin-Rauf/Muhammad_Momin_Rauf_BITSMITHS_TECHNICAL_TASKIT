'use client';
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-gray-300 py-4 text-center text-xs text-gray-500">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center space-x-4 mb-2">
          <Link href="/">Guidelines</Link>
          <Link href="/">FAQ</Link>
          <Link href="/">Lists</Link>
          <Link href="/">API</Link>
          <Link href="/">Security</Link>
          <Link href="/">Legal</Link>
          <Link href="/">Apply to YC</Link>
          <Link href="/">Contact</Link>
        </div>
        <div>
          <form className="inline-flex items-center">
            <label htmlFor="search" className="mr-2">
              Search:
            </label>
            <input type="text" id="search" className="border border-gray-300 px-2 py-1" />
          </form>
        </div>
      </div>
    </footer>
  )
}
