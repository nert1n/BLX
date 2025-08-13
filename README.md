<p align="center">
  <img alt="BLX logo" width="300px" src="./public/favicon.png">
</p>

<h1 align="center">BLX - Interactive SPA - Workspace & Bitcoin Tracker</h1>

<p align="center">
  A modern single-page application featuring an interactive draggable workspace and real-time Bitcoin transaction tracker. Built with Next.js, TypeScript, and WebSocket technology for optimal performance and user experience.
</p>

<p align="center">
  <strong>Live demo:</strong> <a target="_blank" href="https://your-deployment-url.vercel.app">Visit Interactive SPA</a>
</p>

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Features Overview](#features-overview)
    - [Interactive Workspace](#interactive-workspace)
    - [Bitcoin Transaction Tracker](#bitcoin-transaction-tracker)
- [External Libraries](#external-libraries)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Interactive Workspace**: Drag & drop, resizable blocks with persistent state
- **Real-time Bitcoin Tracker**: Live transaction monitoring via WebSocket
- **Lazy Loading**: Optimized performance with route-based code splitting
- **Responsive Design**: Mobile-first approach with dark/light theme support
- **Type-Safe**: Full TypeScript implementation for better maintainability
- **Modern UI**: Clean, accessible design with smooth animations
- **Persistent State**: Local storage integration for data persistence

## Tech Stack

- **Next.js 14**: React framework with App Router for optimal performance
- **TypeScript**: Typed superset of JavaScript for better code quality
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **WebSocket API**: Real-time communication for Bitcoin transactions
- **React Hooks**: Modern state management and lifecycle handling
- **Local Storage**: Client-side data persistence

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (>=18.x)
- **npm/yarn/pnpm**: Package manager of your choice

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/interactive-spa.git
cd interactive-spa
npm install
```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```bash
├── app/                    # Next.js App Router pages
│   ├── workspace/         # Interactive workspace page
│   ├── bitcoin/           # Bitcoin tracker page
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Home page with navigation
├── components/            # Reusable React components
│   ├── interactive-workspace.tsx  # Draggable workspace component
│   ├── bitcoin-tracker.tsx       # WebSocket Bitcoin tracker
│   ├── navigation.tsx            # Main navigation component
│   └── footer.tsx               # Footer component
├── hooks/                 # Custom React hooks
└── lib/                   # Utility functions and configurations
```

## Features Overview

### Interactive Workspace

The workspace section provides a fully interactive environment with:

- **5 Draggable Blocks**: Numbered blocks that can be moved freely on a grid
- **Resizable Elements**: Blocks can be resized both horizontally and vertically
- **Z-Index Control**: Click any block to bring it to the front layer
- **Grid Snapping**: Movement snaps to 10px increments for precise positioning
- **Delete Functionality**: Remove individual blocks with delete buttons
- **Reset Feature**: Restore all blocks to their initial state
- **Persistent State**: All changes are saved to localStorage and persist across sessions

**Initial Configuration:**
- Block size: 300px width × 100px height
- Grid snapping: 10px increments
- Z-index management for layering

### Bitcoin Transaction Tracker

Real-time Bitcoin transaction monitoring with:

- **Live WebSocket Connection**: Connects to Blockchain.info WebSocket API
- **Transaction Display**: Shows sender, receiver, and amount for each transaction
- **Running Total**: Calculates and displays cumulative BTC sum
- **Control Panel**: Start, Stop, and Reset functionality
- **Responsive Table**: Mobile-friendly transaction list
- **Connection Status**: Visual indicators for WebSocket connection state

**API Integration:**
- WebSocket endpoint: `wss://ws.blockchain.info/inv`
- Subscription: Unconfirmed Bitcoin transactions
- Data parsing: Real-time transaction processing

## External Libraries

### Core Dependencies
- **Next.js**: React framework for production-ready applications
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Static type checking for JavaScript

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library for React applications

### Justification for Library Choices

1. **Next.js**: Chosen for its excellent developer experience, built-in optimizations, and App Router for modern React patterns
2. **TypeScript**: Provides type safety, better IDE support, and improved code maintainability
3. **Tailwind CSS**: Enables rapid UI development with consistent design system and excellent responsive utilities
4. **Lucide React**: Lightweight, customizable icon library with consistent design language
5. **Native WebSocket API**: Used instead of external libraries to minimize bundle size and maintain direct control over connection handling

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Ensure responsive design compatibility
- Add proper error handling for WebSocket connections
- Test drag & drop functionality across different browsers

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ using Next.js and modern web technologies
</p>
