"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

const InteractiveWorkspace = dynamic(() => import("@/components/interactive-workspace"), {
  loading: () => (
    <div className="min-h-screen p-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    </div>
  ),
})

export default function WorkspacePage() {
  return (
    <Suspense fallback={<div>Loading workspace...</div>}>
      <InteractiveWorkspace />
    </Suspense>
  )
}
