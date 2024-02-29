"use client";
import { useRouter } from "next/navigation"

export default function page() {

  const router = useRouter();

  return (
    <div className="w-full pe-6 pt-24 flex flex-col gap-2 items-center justify-center">
      <img src="/ui/211.png" alt="" className="h-80" />
      <h2 className="font-bold text-xl">Payment Failed!</h2>
      <div className="w-full flex items-center justify-center gap-2 mt-4">
        <button
          onClick={() => { router.replace("/") }}
          className="px-4 py-2 border border-purple-800 text-purple-800 rounded-md w-fit font-semibold">
          Back to home
        </button>
        <button
          onClick={() => { router.replace("/student/") }}
          className="px-4 py-2 bg-purple-800 text-white rounded-md font-semibold">
          Go to dashboard
        </button>
      </div>
    </div>
  )
}
