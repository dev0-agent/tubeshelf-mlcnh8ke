export interface Video {
  id: string; // YouTube video ID
  url: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  description?: string;
  addedAt: number; // timestamp
  tags: string[]; // tag IDs
  notes: Note[];
}

export interface Note {
  id: string;
  videoId: string;
  timestamp: number; // in seconds
  content: string;
  createdAt: number;
}

export interface Tag {
  id: string;
  name: string;
  color?: string;
}
