import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";

// Placeholder components for routes
const Home = () => (
  <div>
    <h1 className="text-2xl font-bold">Welcome to TubeShelf</h1>
    <p className="mt-2 text-muted-foreground">Your private, local library for YouTube learning and notes.</p>
  </div>
);

const Library = () => (
  <div>
    <h1 className="text-2xl font-bold">Your Library</h1>
    <p className="mt-2 text-muted-foreground">Saved videos will appear here.</p>
  </div>
);

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
