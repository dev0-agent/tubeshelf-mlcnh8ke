import { Video } from "@/types";
import { VideoCard } from "./VideoCard";
import { 
  Empty, 
  EmptyHeader, 
  EmptyTitle, 
  EmptyDescription, 
  EmptyMedia 
} from "@/components/ui/empty";
import { PlusCircle } from "lucide-react";
import { AddVideoDialog } from "./AddVideoDialog";

interface VideoGridProps {
  videos: Video[];
  onVideoAdded?: () => void;
}

export function VideoGrid({ videos, onVideoAdded }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Empty className="max-w-md mx-auto">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PlusCircle className="h-4 w-4" />
            </EmptyMedia>
            <EmptyTitle>No videos found</EmptyTitle>
            <EmptyDescription>
              You haven't added any videos to your library yet. Start by adding your first YouTube video.
            </EmptyDescription>
          </EmptyHeader>
          <div className="mt-6">
            <AddVideoDialog onSuccess={onVideoAdded} />
          </div>
        </Empty>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
