import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addVideo } from "@/lib/storage";
import { Video } from "@/types";
import { PlusCircle } from "lucide-react";

interface AddVideoDialogProps {
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

export function AddVideoDialog({ onSuccess, trigger }: AddVideoDialogProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleSave = () => {
    setError(null);
    const videoId = getYoutubeId(url);

    if (!videoId) {
      setError("Invalid YouTube URL");
      return;
    }

    try {
      setLoading(true);
      
      const newVideo: Video = {
        id: videoId,
        url: url,
        title: title.trim() || `Video ${videoId}`,
        channelTitle: "Unknown Channel", // Cannot fetch without API
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        addedAt: Date.now(),
        tags: [],
        notes: [],
      };

      addVideo(newVideo);
      
      // Reset form
      setUrl('');
      setTitle('');
      setOpen(false);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Video
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Video</DialogTitle>
          <DialogDescription>
            Enter the YouTube URL and an optional title for your video.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="url">YouTube URL</Label>
            <Input
              id="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Custom Title (Optional)</Label>
            <Input
              id="title"
              placeholder="My Video Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave} disabled={loading || !url}>
            {loading ? "Adding..." : "Add Video"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
