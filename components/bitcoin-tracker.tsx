"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Square, RotateCcw, Bitcoin, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface Transaction {
  hash: string
  time: number
  inputs: Array<{
    prev_out: {
      addr?: string
      value: number
    }
  }>
  out: Array<{
    addr?: string
    value: number
  }>
  size: number
}

interface TransactionDisplay {
  id: string
  hash: string
  time: number
  from: string
  to: string
  value: number
  size: number
}

export default function BitcoinTracker() {
  const [transactions, setTransactions] = useState<TransactionDisplay[]>([])
  const [totalSum, setTotalSum] = useState(0)
  const [isConnected, setIsConnected] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"disconnected" | "connecting" | "connected" | "error">(
    "disconnected",
  )

  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 5

  const formatBTC = (satoshis: number) => {
    return (satoshis / 100000000).toFixed(8)
  }

  const formatAddress = (address: string | undefined) => {
    if (!address) return "Unknown"
    return address.length > 20 ? `${address.slice(0, 10)}...${address.slice(-10)}` : address
  }

  const connectWebSocket = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return

    setConnectionStatus("connecting")

    try {
      wsRef.current = new WebSocket("wss://ws.blockchain.info/inv")

      wsRef.current.onopen = () => {
        console.log("WebSocket connected")
        setIsConnected(true)
        setConnectionStatus("connected")
        reconnectAttempts.current = 0

        // Subscribe to unconfirmed transactions
        wsRef.current?.send(JSON.stringify({ op: "unconfirmed_sub" }))
      }

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)

          if (data.op === "utx" && data.x) {
            const tx: Transaction = data.x

            // Get primary input and output
            const primaryInput = tx.inputs?.[0]?.prev_out
            const primaryOutput = tx.out?.[0]

            if (primaryOutput) {
              const transactionDisplay: TransactionDisplay = {
                id: `${tx.hash}-${Date.now()}`,
                hash: tx.hash,
                time: tx.time * 1000, // Convert to milliseconds
                from: formatAddress(primaryInput?.addr),
                to: formatAddress(primaryOutput.addr),
                value: primaryOutput.value,
                size: tx.size,
              }

              setTransactions((prev) => [transactionDisplay, ...prev.slice(0, 49)]) // Keep last 50 transactions
              setTotalSum((prev) => prev + primaryOutput.value)
            }
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error)
        }
      }

      wsRef.current.onclose = (event) => {
        console.log("WebSocket closed:", event.code, event.reason)
        setIsConnected(false)
        setConnectionStatus("disconnected")

        // Auto-reconnect if it was started and not manually stopped
        if (isStarted && reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++
          setConnectionStatus("connecting")
          reconnectTimeoutRef.current = setTimeout(() => {
            connectWebSocket()
          }, 2000 * reconnectAttempts.current) // Exponential backoff
        }
      }

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error)
        setConnectionStatus("error")
      }
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error)
      setConnectionStatus("error")
    }
  }, [isStarted])

  const disconnectWebSocket = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }

    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }

    setIsConnected(false)
    setConnectionStatus("disconnected")
    reconnectAttempts.current = 0
  }, [])

  const handleStart = () => {
    setIsStarted(true)
    connectWebSocket()
  }

  const handleStop = () => {
    setIsStarted(false)
    disconnectWebSocket()
  }

  const handleReset = () => {
    setTransactions([])
    setTotalSum(0)
    if (isStarted) {
      disconnectWebSocket()
      setIsStarted(false)
    }
  }

  useEffect(() => {
    return () => {
      disconnectWebSocket()
    }
  }, [disconnectWebSocket])

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "bg-green-500"
      case "connecting":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = () => {
    switch (connectionStatus) {
      case "connected":
        return "Connected"
      case "connecting":
        return "Connecting..."
      case "error":
        return "Connection Error"
      default:
        return "Disconnected"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Bitcoin className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Bitcoin Transaction Tracker</h1>
              <div className="flex items-center gap-3">
                <p className="text-gray-600 dark:text-gray-300">Real-time Bitcoin transaction monitoring</p>
                <Badge className={cn("text-white", getStatusColor())}>{getStatusText()}</Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleStart} disabled={isStarted} className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Start
            </Button>
            <Button
              onClick={handleStop}
              disabled={!isStarted}
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              <Square className="h-4 w-4" />
              Stop
            </Button>
            <Button onClick={handleReset} variant="destructive" className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        {/* Total Sum Card */}
        <Card className="mb-8 bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5" />
              Total Transaction Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{formatBTC(totalSum)} BTC</div>
            <p className="text-orange-100 mt-1">From {transactions.length} transactions</p>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <CardTitle>Live Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Bitcoin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No transactions yet</p>
                <p className="text-sm">Click "Start" to begin monitoring Bitcoin transactions</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {transactions.map((tx, index) => (
                  <div
                    key={tx.id}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-lg border transition-all duration-300",
                      index === 0 && "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
                      index > 0 && "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700",
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {new Date(tx.time).toLocaleTimeString()}
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Size: {tx.size} bytes</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400 mb-1">From</p>
                          <p className="font-mono text-xs break-all">{tx.from}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400 mb-1">To</p>
                          <p className="font-mono text-xs break-all">{tx.to}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400 mb-1">Value</p>
                          <p className="font-bold text-orange-600 dark:text-orange-400">{formatBTC(tx.value)} BTC</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>• Displays live unconfirmed Bitcoin transactions from the Blockchain WebSocket API</p>
          <p>• Shows the most recent 50 transactions with automatic scrolling</p>
          <p>• Total sum accumulates all transaction values received during the session</p>
          <p>• Connection automatically reconnects if interrupted</p>
        </div>
      </div>
    </div>
  )
}
