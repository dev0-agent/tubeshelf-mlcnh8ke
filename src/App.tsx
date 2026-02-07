import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { useEffect, useState } from "react";
import { Video } from "./types";
import { getVideos } from "./lib/storage";
import { VideoGrid } from "./components/VideoGrid";

const LibraryView = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const loadVideos = () => {
    setVideos(getVideos());
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Library</h1>
        <p className="text-muted-foreground">
          Manage and browse your saved YouTube videos.
        </p>
      </div>
      <VideoGrid videos={videos} onVideoAdded={loadVideos} />
    </div>
  );
};

const Home = () => <LibraryView />;

const Library = () => <LibraryView />;

const Settings = () => (
  <div>
    <h1 className="text-2xl font-bold">Settings</h1>
    <p className="mt-2 text-muted-foreground">Manage your preferences and data.</p>
  </div>
);

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <h1 className="text-4xl font-bold">404</h1>
    <p className="text-muted-foreground">Page not found</p>
  </div>
);

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="library" element={<Library />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
