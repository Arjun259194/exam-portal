'use client'

import Button from "@/components/UI/Button"
import { useState } from "react"
import { toast } from "react-hot-toast"

interface Props {
  testId: string,
  action: (arg1: FormData) => Promise<void>
}


export default function WrittenAttemptForm(pr: Props) {
  const [file, setFile] = useState<File | null>(null)

  return (
    <form
      className="ring-2 ring-gray-300 space-y-2 rounded-md p-2 m-2"
      onSubmit={(e) => {
        e.preventDefault()
        if (!file) return toast.error("Select a file first")
        const f = new FormData()
        f.set('file', file)
        f.set('testId', pr.testId)
        const p = pr.action(f)

        toast.promise(p, {
          loading: "Processing...",
          error: err => `${err}`,
          success: () => {
            window.location.href = "/dashboard"
            return "Done"
          }
        })
      }}
    >
      <div className="flex flex-col space-y-2 items-center ">
        <label
          htmlFor="pdfUpload"
          className="w-full mr-2 text-sm text-center font-medium text-gray-700"
        >
          Select PDF File
        </label>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null)
          }}
          id="pdfUpload"
          name="pdfFile"
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <Button
        type="submit"
        className="w-full "
      >
        Submit
      </Button>
    </form>
  )

}
