import { Video, Tag } from '../types';

const STORAGE_KEY = 'tubeshelf-data';

export interface StorageData {
  videos: Video[];
  tags: Tag[];
}

/**
 * Retrieves the entire dataset from LocalStorage.
 * Handles JSON parsing errors and returns a default structure if empty or invalid.
 */
export const getStorageData = (): StorageData => {
  if (typeof localStorage === 'undefined') {
    return { videos: [], tags: [] };
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { videos: [], tags: [] };

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to parse storage data:', error);
    return { videos: [], tags: [] };
  }
};

/**
 * Saves the entire dataset to LocalStorage.
 * Handles quota exceeded errors.
 */
export const saveToLocalStorage = (data: StorageData): void => {
  if (typeof localStorage === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    if (error instanceof DOMException && 
        (error.name === 'QuotaExceededError' || 
         error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
      console.error('LocalStorage quota exceeded');
      throw new Error('Storage full. Please delete some videos to free up space.');
    }
    throw error;
  }
};

/**
 * Returns the list of stored videos.
 */
export const getVideos = (): Video[] => {
  return getStorageData().videos;
};

/**
 * Adds a new video to storage.
 * Throws an error if the video already exists.
 */
export const addVideo = (video: Video): void => {
  const data = getStorageData();
  if (data.videos.some((v) => v.id === video.id)) {
    throw new Error(`Video with ID ${video.id} already exists.`);
  }
  data.videos.push(video);
  saveToLocalStorage(data);
};

/**
 * Deletes a video by its ID.
 */
export const deleteVideo = (id: string): void => {
  const data = getStorageData();
  const initialLength = data.videos.length;
  data.videos = data.videos.filter((v) => v.id !== id);
  
  if (data.videos.length !== initialLength) {
    saveToLocalStorage(data);
  }
};

/**
 * Updates an existing video.
 * Useful for adding notes, updating tags, or modifying metadata.
 * Throws an error if the video is not found.
 */
export const updateVideo = (updatedVideo: Video): void => {
  const data = getStorageData();
  const index = data.videos.findIndex((v) => v.id === updatedVideo.id);

  if (index === -1) {
    throw new Error(`Video with ID ${updatedVideo.id} not found.`);
  }

  data.videos[index] = updatedVideo;
  saveToLocalStorage(data);
};
