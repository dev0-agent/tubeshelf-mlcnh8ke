import { Video } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link to={`/video/${video.id}`} className="group transition-all hover:-translate-y-1">
      <Card className="h-full border-none shadow-md overflow-hidden">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="line-clamp-2 text-base leading-tight group-hover:text-primary transition-colors">
            {video.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-2">
          <p className="text-xs text-muted-foreground truncate">
            {video.channelTitle}
          </p>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0">
          <p className="text-[10px] text-muted-foreground">
            Added {formatDistanceToNow(video.addedAt, { addSuffix: true })}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
