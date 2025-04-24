'use client';
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-300 py-6 text-center text-xs text-gray-500">
      <div className="max-w-4xl mx-auto px-4 space-y-4">
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">Guidelines</Link>
          <Link href="/">FAQ</Link>
          <Link href="/">Lists</Link>
          <Link href="/">API</Link>
          <Link href="/">Security</Link>
          <Link href="/">Legal</Link>
          <Link href="/">Apply to YC</Link>
          <Link href="/">Contact</Link>
        </div>

        {/* Search */}
        <form className="inline-flex items-center space-x-2">
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            className="border border-gray-300 px-2 py-1 text-sm rounded"
          />
        </form>
      </div>
    </footer>
  );
}
    