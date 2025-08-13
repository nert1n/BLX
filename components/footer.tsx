export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">BLX</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              A showcase of modern web technologies including React, Next.js, WebSocket integration, and interactive UI
              components with persistent state management.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Drag & Drop Interface</li>
              <li>• Real-time WebSocket Data</li>
              <li>• Persistent State Storage</li>
              <li>• Responsive Design</li>
              <li>• Dark Mode Support</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Technologies</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Next.js 14 with App Router</li>
              <li>• React 18 with Hooks</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• WebSocket API</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built with modern web technologies • Lazy loading • Responsive design
          </p>
        </div>
      </div>
    </footer>
  )
}
