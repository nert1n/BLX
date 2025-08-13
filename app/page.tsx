import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Blocks, Bitcoin, Sparkles, Zap, Shield, Smartphone } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Modern SPA Demo
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            BLX - Interactive SPA Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore two powerful interactive features: a draggable workspace with persistent state and real-time Bitcoin
            transaction tracking via WebSocket integration
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-blue-500/25 transition-shadow duration-300">
                  <Blocks className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Interactive Workspace</CardTitle>
                  <CardDescription className="text-base">
                    Drag, resize, and manage interactive blocks with persistent state
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 dark:text-gray-300 mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Drag & drop blocks freely with grid snapping
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Resize blocks dynamically with visual handles
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Z-index control with click interactions
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Delete and restore functionality
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Persistent state across browser sessions
                </li>
              </ul>
              <Link href="/workspace">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  Open Workspace
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg group-hover:shadow-orange-500/25 transition-shadow duration-300">
                  <Bitcoin className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Bitcoin Tracker</CardTitle>
                  <CardDescription className="text-base">
                    Real-time Bitcoin transaction monitoring via WebSocket
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 dark:text-gray-300 mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Live transaction updates from Blockchain API
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Real-time sum calculation and display
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Start/stop/reset controls
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Transaction history with details
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Automatic reconnection handling
                </li>
              </ul>
              <Link href="/bitcoin">
                <Button
                  variant="outline"
                  className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl bg-transparent"
                >
                  Open Bitcoin Tracker
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Technical Highlights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg w-fit mx-auto mb-4">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Lazy Loading</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Components load only when needed, optimizing performance and user experience
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg w-fit mx-auto mb-4">
                <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Persistent State</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                All interactions and data persist across browser sessions using localStorage
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg w-fit mx-auto mb-4">
                <Smartphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Responsive Design</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Fully responsive interface that works seamlessly on all device sizes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
