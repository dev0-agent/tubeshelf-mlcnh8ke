# TubeShelf

> Your private, local library for YouTube learning and notes.

TubeShelf is a client-side bookmark manager for YouTube videos. It allows you to build a personal library of educational content, tutorials, and lectures without needing a Google account. The key feature is **timestamped annotations**—create your own table of contents or study notes for any video, and jump to specific moments with a single click.

**Privacy First:** All data is stored in your browser's LocalStorage. No servers, no tracking, no accounts.

## Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React
- **Persistence:** LocalStorage (Client-side only)
- **Video Engine:** YouTube IFrame API

## Features

- 📚 **Personal Library:** Save videos by URL and organize them in a grid.
- 📝 **Timestamped Notes:** Take notes while watching; clicking a note seeks the video to that exact second.
- 🏷️ **Tagging & Search:** Organize videos with custom tags and filter easily.
- 🔒 **Private & Local:** Data never leaves your device.
- 💾 **Backup:** Export and Import your library as JSON to switch devices or backup data.

## Getting Started

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd tubeshelf
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  Open http://localhost:5173 to view the app.

## Project Documentation

- See [TASKLIST.md](./TASKLIST.md) for the development roadmap.
- See [LEARNINGS.md](./LEARNINGS.md) for technical insights during development.
- See [.dev0/RULES.md](./.dev0/RULES.md) for coding standards.