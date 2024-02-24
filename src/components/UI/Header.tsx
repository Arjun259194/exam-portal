import { BookOpenCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
      <header className="flex z-50 sticky top-0 bg-gray-50/90 items-center border-b-2 border-gray-100 justify-between px-10 py-3">
        <div className="flex items-end space-x-2">
          <BookOpenCheck className="size-8" />
          <h1 className="text-4xl underline capitalize font-bold">Examify</h1>
        </div>
        <nav>
          <ul className="flex space-x-5 text-lg text-gray-500">
            <li className="">
              <Link href="/">Home</Link>
            </li>
            <li className="">
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
  )
}

export default Header