"use client"

import { Popover, Transition } from "@headlessui/react"
import Link from "next/link"
import { Fragment } from 'react'

export default function CreateTestButton() {
  return <Popover className="relative">
    <Popover.Button className={`bg-green-600 px-4 py-1 text-lg capitalize rounded-xl text-white`}>Solutions</Popover.Button>

    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <Popover.Panel className="absolute z-10">
        <div className="flex flex-col min-w-32 text-lg ring-gray-200 ring-2 space-y-2 bg-gray-100 rounded-md overflow-hidden shadow-md items-start ">
          <Link className="hover:bg-green-500 hover:text-white hover:font-semibold py-2 w-full text-start px-2" href="/test/mcq/new">MCQ</Link>
          <Link className="hover:bg-green-500 hover:text-white hover:font-semibold py-2 w-full text-start px-2" href="/test/written/new">Written</Link>
          <Link className="hover:bg-green-500 hover:text-white hover:font-semibold py-2 w-full text-start px-2" href="/test/typing/new">Typing</Link>
        </div>
        {/* <img src="/solutions.jpg" alt="" /> */}
      </Popover.Panel>
    </Transition>
  </Popover>
}
