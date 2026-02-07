# Task List

This file shows the current progress of all tasks in this project.
It is automatically updated by dev0 as tasks are completed.

---

## Phase 1

- [ ] ⏳ **Project Foundation & Types**
  Initialize the project structure. Set up React Router with a layout component (header/sidebar). Define TypeScript interfaces for `Video`, `Note`, and `Tag`. Create a basic `env.ts` (even if empty initially) to follow best practices.

- [ ] ⏳ **LocalStorage Service Implementation**
  Create a `storage.ts` service module. This will act as the 'database' layer. Implement methods to: `getVideos`, `addVideo`, `deleteVideo`, `updateVideo` (for adding notes), and `saveToLocalStorage`. Include error handling for quota limits and JSON parsing.

## Phase 2

- [ ] ⏳ **Add Video UI & Logic**
  Create a dialog/modal component to add a new video. It should accept a YouTube URL, extract the Video ID using regex, and allow the user to enter a custom title (optional). On save, use the Storage Service to persist the new video entry.

- [ ] ⏳ **Library Dashboard (Grid View)**
  Implement the Home page. Fetch videos from the Storage Service and display them in a responsive grid using shadcn/ui Cards. Display video thumbnails (using `img.youtube.com/vi/{id}/mqdefault.jpg`). Handle the empty state (no videos added).

- [ ] ⏳ **Video Player Page & Routing**
  Create the dynamic route `/video/:id`. Implement the layout for the player view: Video player on the left (or top on mobile), Notes sidebar on the right. Integrate `react-youtube` or IFrame API to load the video ID from the URL params.

- [ ] ⏳ **Timestamp Capture Logic**
  Implement the core note-taking logic. Add a 'Add Note' input area in the player view. When the user focuses the input or clicks 'Capture', get the current time from the player instance. Save the note (text + timestamp) to the video object in LocalStorage.

- [ ] ⏳ **Interactive Note List**
  Render the list of notes for the current video. Format the timestamp (e.g., 125s -> 02:05). Make the timestamp clickable: clicking it should trigger the player to seek to that specific second.

## Phase 3

- [ ] ⏳ **Note Management (Edit/Delete)**
  Add functionality to edit the text of an existing note or delete it entirely. Update the Storage Service to handle these nested updates within a video object.

- [ ] ⏳ **Tagging System**
  Allow users to add tags to videos in the 'Add Video' dialog and the Player view. Update the Library Dashboard to show tags on video cards.

- [ ] ⏳ **Search and Filter**
  Add a search bar and tag filter to the Library Dashboard. Filter the displayed video grid based on title matches or selected tags.

## Phase 4

- [ ] ⏳ **Data Backup (Import/Export)**
  Create a Settings page or a utility menu. Implement 'Export Data' (downloads `tubeshelf_backup.json`) and 'Import Data' (reads JSON file and replaces/merges LocalStorage). Crucial for data safety in a local-only app.

- [ ] ⏳ **UI Polish & Responsive Design**
  Refine the UI. Ensure the player and note list stack correctly on mobile. Add tooltips, improve empty states, and ensure consistent spacing using Tailwind.

---

_Last updated by dev0 automation_
