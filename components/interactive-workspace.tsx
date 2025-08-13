"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface Block {
  id: number
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  visible: boolean
}

const INITIAL_BLOCKS: Block[] = [
  { id: 1, x: 50, y: 50, width: 300, height: 100, zIndex: 1, visible: true },
  { id: 2, x: 400, y: 50, width: 300, height: 100, zIndex: 2, visible: true },
  { id: 3, x: 50, y: 200, width: 300, height: 100, zIndex: 3, visible: true },
  { id: 4, x: 400, y: 200, width: 300, height: 100, zIndex: 4, visible: true },
  { id: 5, x: 225, y: 350, width: 300, height: 100, zIndex: 5, visible: true },
]

const GRID_SIZE = 10

export default function InteractiveWorkspace() {
  const [blocks, setBlocks] = useState<Block[]>(INITIAL_BLOCKS)
  const [dragState, setDragState] = useState<{
    isDragging: boolean
    blockId: number | null
    startX: number
    startY: number
    startBlockX: number
    startBlockY: number
  }>({
    isDragging: false,
    blockId: null,
    startX: 0,
    startY: 0,
    startBlockX: 0,
    startBlockY: 0,
  })
  const [resizeState, setResizeState] = useState<{
    isResizing: boolean
    blockId: number | null
    startX: number
    startY: number
    startWidth: number
    startHeight: number
    direction: string
  }>({
    isResizing: false,
    blockId: null,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    direction: "",
  })

  const workspaceRef = useRef<HTMLDivElement>(null)
  const maxZIndex = useRef(5)

  // Load state from localStorage on mount
  useEffect(() => {
    const savedBlocks = localStorage.getItem("workspace-blocks")
    if (savedBlocks) {
      try {
        const parsed = JSON.parse(savedBlocks)
        setBlocks(parsed)
        maxZIndex.current = Math.max(...parsed.map((b: Block) => b.zIndex))
      } catch (error) {
        console.error("Failed to load saved blocks:", error)
      }
    }
  }, [])

  // Save state to localStorage whenever blocks change
  useEffect(() => {
    localStorage.setItem("workspace-blocks", JSON.stringify(blocks))
  }, [blocks])

  const snapToGrid = (value: number) => Math.round(value / GRID_SIZE) * GRID_SIZE

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, blockId: number, action: "drag" | "resize", direction?: string) => {
      e.preventDefault()
      e.stopPropagation()

      const block = blocks.find((b) => b.id === blockId)
      if (!block) return

      if (action === "drag") {
        setDragState({
          isDragging: true,
          blockId,
          startX: e.clientX,
          startY: e.clientY,
          startBlockX: block.x,
          startBlockY: block.y,
        })
      } else if (action === "resize" && direction) {
        setResizeState({
          isResizing: true,
          blockId,
          startX: e.clientX,
          startY: e.clientY,
          startWidth: block.width,
          startHeight: block.height,
          direction,
        })
      }
    },
    [blocks],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragState.isDragging && dragState.blockId) {
        const deltaX = e.clientX - dragState.startX
        const deltaY = e.clientY - dragState.startY

        const newX = snapToGrid(dragState.startBlockX + deltaX)
        const newY = snapToGrid(dragState.startBlockY + deltaY)

        setBlocks((prev) =>
          prev.map((block) =>
            block.id === dragState.blockId ? { ...block, x: Math.max(0, newX), y: Math.max(0, newY) } : block,
          ),
        )
      }

      if (resizeState.isResizing && resizeState.blockId) {
        const deltaX = e.clientX - resizeState.startX
        const deltaY = e.clientY - resizeState.startY

        setBlocks((prev) =>
          prev.map((block) => {
            if (block.id !== resizeState.blockId) return block

            let newWidth = block.width
            let newHeight = block.height

            if (resizeState.direction.includes("right")) {
              newWidth = Math.max(100, snapToGrid(resizeState.startWidth + deltaX))
            }
            if (resizeState.direction.includes("left")) {
              newWidth = Math.max(100, snapToGrid(resizeState.startWidth - deltaX))
            }
            if (resizeState.direction.includes("bottom")) {
              newHeight = Math.max(50, snapToGrid(resizeState.startHeight + deltaY))
            }
            if (resizeState.direction.includes("top")) {
              newHeight = Math.max(50, snapToGrid(resizeState.startHeight - deltaY))
            }

            return { ...block, width: newWidth, height: newHeight }
          }),
        )
      }
    },
    [dragState, resizeState],
  )

  const handleMouseUp = useCallback(() => {
    setDragState((prev) => ({ ...prev, isDragging: false, blockId: null }))
    setResizeState((prev) => ({ ...prev, isResizing: false, blockId: null }))
  }, [])

  useEffect(() => {
    if (dragState.isDragging || resizeState.isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [dragState.isDragging, resizeState.isResizing, handleMouseMove, handleMouseUp])

  const bringToFront = (blockId: number) => {
    maxZIndex.current += 1
    setBlocks((prev) => prev.map((block) => (block.id === blockId ? { ...block, zIndex: maxZIndex.current } : block)))
  }

  const deleteBlock = (blockId: number) => {
    setBlocks((prev) => prev.map((block) => (block.id === blockId ? { ...block, visible: false } : block)))
  }

  const resetBlocks = () => {
    setBlocks(INITIAL_BLOCKS)
    maxZIndex.current = 5
  }

  const visibleBlocks = blocks.filter((block) => block.visible)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Interactive Workspace</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Drag blocks around, resize them, and click to bring to front. Changes are automatically saved.
            </p>
          </div>
          <Button onClick={resetBlocks} variant="outline" className="flex items-center gap-2 bg-transparent">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        <div
          ref={workspaceRef}
          className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg min-h-[600px] overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e5e7eb 1px, transparent 1px),
              linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
            `,
            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
          }}
        >
          {visibleBlocks.map((block) => (
            <Card
              key={block.id}
              className={cn(
                "absolute border-2 cursor-move select-none transition-shadow hover:shadow-lg",
                dragState.blockId === block.id && "shadow-xl ring-2 ring-blue-500",
                resizeState.blockId === block.id && "shadow-xl ring-2 ring-green-500",
              )}
              style={{
                left: block.x,
                top: block.y,
                width: block.width,
                height: block.height,
                zIndex: block.zIndex,
              }}
              onMouseDown={(e) => {
                bringToFront(block.id)
                handleMouseDown(e, block.id, "drag")
              }}
            >
              <div className="relative w-full h-full p-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">{block.id}</span>

                {/* Delete button */}
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2 h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteBlock(block.id)
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>

                {/* Resize handles */}
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize opacity-0 hover:opacity-100 transition-opacity"
                  onMouseDown={(e) => handleMouseDown(e, block.id, "resize", "bottom-right")}
                />
                <div
                  className="absolute bottom-0 left-0 w-4 h-4 bg-blue-500 cursor-sw-resize opacity-0 hover:opacity-100 transition-opacity"
                  onMouseDown={(e) => handleMouseDown(e, block.id, "resize", "bottom-left")}
                />
                <div
                  className="absolute top-0 right-0 w-4 h-4 bg-blue-500 cursor-ne-resize opacity-0 hover:opacity-100 transition-opacity"
                  onMouseDown={(e) => handleMouseDown(e, block.id, "resize", "top-right")}
                />
                <div
                  className="absolute top-0 left-0 w-4 h-4 bg-blue-500 cursor-nw-resize opacity-0 hover:opacity-100 transition-opacity"
                  onMouseDown={(e) => handleMouseDown(e, block.id, "resize", "top-left")}
                />

                {/* Edge resize handles */}
                <div
                  className="absolute right-0 top-1/2 w-2 h-8 bg-blue-500 cursor-e-resize opacity-0 hover:opacity-100 transition-opacity -translate-y-1/2"
                  onMouseDown={(e) => handleMouseDown(e, block.id, "resize", "right")}
                />
                <div
                  className="absolute left-0 top-1/2 w-2 h-8 bg-blue-500 cursor-w-resize opacity-0 hover:opacity-100 transition-opacity -translate-y-1/2"
                  onMouseDown={(e) => handleMouseDown(e, block.id, "resize", "left")}
                />
                <div
                  className="absolute bottom-0 left-1/2 w-8 h-2 bg-blue-500 cursor-s-resize opacity-0 hover:opacity-100 transition-opacity -translate-x-1/2"
                  onMouseDown={(e) => handleMouseDown(e, block.id, "resize", "bottom")}
                />
                <div
                  className="absolute top-0 left-1/2 w-8 h-2 bg-blue-500 cursor-n-resize opacity-0 hover:opacity-100 transition-opacity -translate-x-1/2"
                  onMouseDown={(e) => handleMouseDown(e, block.id, "resize", "top")}
                />
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>• Drag blocks to move them around (snaps to 10px grid)</p>
          <p>• Hover over block edges to see resize handles</p>
          <p>• Click on a block to bring it to the front</p>
          <p>• Use the X button to delete blocks</p>
          <p>• All changes are automatically saved to localStorage</p>
        </div>
      </div>
    </div>
  )
}
