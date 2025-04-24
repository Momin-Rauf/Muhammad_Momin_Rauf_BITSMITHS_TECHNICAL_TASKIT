import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-[#ff6600] text-black">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Left side: Logo + Nav */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-bold text-white">
            <span className="border border-white px-1">Y</span>
          </Link>
          <nav className="flex items-center space-x-4 text-sm">
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

        {/* Right side: Login */}
        <div className="text-sm">
          <Link href="/">login</Link>
        </div>
      </div>
    </header>
  )
}
