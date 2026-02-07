
import { getVideos, addVideo, updateVideo, deleteVideo, saveToLocalStorage, getStorageData } from './storage';
import { Video, Note } from '../types';

if (import.meta.main) {
  // Mock localStorage
  const store: Record<string, string> = {};
  const mockLocalStorage = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { for (const k in store) delete store[k]; },
    length: 0,
    key: (index: number) => null,
  };

  Object.defineProperty(global, 'localStorage', {
    value: mockLocalStorage,
    writable: true
  });

  // Test addVideo
  const video: Video = {
    id: 'v1',
    url: 'https://youtube.com/watch?v=v1',
    title: 'Test Video',
    channelTitle: 'Test Channel',
    thumbnailUrl: 'http://thumb.url',
    addedAt: Date.now(),
    tags: [],
    notes: []
  };

  console.log('Adding video...');
  try {
      addVideo(video);
  } catch (e) {
      console.error('Add video threw error:', e);
      process.exit(1);
  }

  const videos = getVideos();
  if (videos.length !== 1 || videos[0].id !== 'v1') {
      console.error('Add video failed. Videos:', videos);
      process.exit(1);
  }
  console.log('Add video passed');

  // Test updateVideo (add note)
  console.log('Updating video (adding note)...');
  const note: Note = {
    id: 'n1',
    videoId: 'v1',
    timestamp: 10,
    content: 'Cool point',
    createdAt: Date.now()
  };
  // Fetch fresh copy
  const v1 = getVideos()[0]; 
  v1.notes.push(note);
  updateVideo(v1);

  const updatedVideos = getVideos();
  if (updatedVideos[0].notes.length !== 1 || updatedVideos[0].notes[0].content !== 'Cool point') {
    console.error('Update video (add note) failed. Notes:', updatedVideos[0].notes);
    process.exit(1);
  }
  console.log('Update video passed');

  // Test deleteVideo
  console.log('Deleting video...');
  deleteVideo('v1');
  const remainingVideos = getVideos();
  if (remainingVideos.length !== 0) {
      console.error('Delete video failed. Remaining:', remainingVideos);
      process.exit(1);
  }
  console.log('Delete video passed');

  // Test saveToLocalStorage directly
  console.log('Testing saveToLocalStorage directly...');
  saveToLocalStorage({ videos: [video], tags: [] });
  const manualSaveVideos = getVideos();
  if (manualSaveVideos.length !== 1) {
      console.error('Manual save failed');
      process.exit(1);
  }
  console.log('Manual save passed');

  console.log('All tests passed!');
}
