"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

const BitcoinTracker = dynamic(() => import("@/components/bitcoin-tracker"), {
  loading: () => (
    <div className="min-h-screen p-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  ),
})

export default function BitcoinPage() {
  return (
    <Suspense fallback={<div>Loading Bitcoin tracker...</div>}>
      <BitcoinTracker />
    </Suspense>
  )
}
