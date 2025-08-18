"use client";

import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { RelatedFile } from "@/lib/api";

interface SearchResult {
  id: string;
  title: string;
  thumbnail: string;
  provider: string;
  type: string;
  file_type: string;
  width: number | null;
  height: number | null;
  url: string;
  file_id: string;
  image_type: string;
  poster?: string;
  providerIcon?: string;
}

interface RelatedFilesCardProps {
  related: RelatedFile;
  index: number;
  imageData: SearchResult;
  isValidVideoUrl: (url: string) => boolean;
  getVideoMimeType: (url: string) => string;
}

export function RelatedFilesCard({
  related,
  index,
  imageData,
  isValidVideoUrl,
  getVideoMimeType,
}: RelatedFilesCardProps) {
  // Create a mock SearchResult for navigation
  const relatedSearchResult: SearchResult = {
    id: related.file_id,
    title: related.metadata.title,
    thumbnail: related.preview.src,
    provider: imageData.provider,
    type: imageData.type,
    file_type: imageData.file_type,
    width: related.preview.width || null,
    height: related.preview.height || null,
    url: related.url,
    file_id: related.file_id,
    image_type: imageData.image_type,
    poster: related.preview.src,
    providerIcon: imageData.providerIcon,
  };

  // Check if this related item is a video
  const isRelatedVideo = isValidVideoUrl(related.preview.src);

  const handleClick = () => {
    // Store the related file data and navigate
    localStorage.setItem(
      `image_${related.file_id}`,
      JSON.stringify(relatedSearchResult)
    );
    window.location.href = `/media/${related.file_id}`;
  };

  return (
    <div
      key={index}
      className="group bg-card dark:bg-card/50 border border-primary/50 dark:border-primary/20 rounded-xl overflow-hidden hover:border-primary/70 hover:shadow-sm transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Media Preview */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {isRelatedVideo ? (
          <>
            {/* Video with poster */}
            <video
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              poster={related.preview.src}
              muted
              playsInline
              preload="metadata"
              onError={(e) => {
                // Fallback to image if video fails
                const video = e.target as HTMLVideoElement;
                const container = video.parentElement;
                if (container) {
                  video.style.display = "none";
                  const fallbackImg = document.createElement("img");
                  fallbackImg.src = related.preview.src;
                  fallbackImg.alt = related.metadata.title;
                  fallbackImg.className =
                    "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300";
                  fallbackImg.onerror = () => {
                    fallbackImg.src = "/placeholder.png";
                  };
                  container.appendChild(fallbackImg);
                }
              }}
            >
              <source
                src={related.preview.src}
                type={getVideoMimeType(related.preview.src)}
              />
            </video>

            {/* Video Play Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
              <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center group-hover:bg-black/80 transition-colors duration-300">
                <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
              </div>
            </div>

            {/* Video Badge */}
            <div className="absolute top-2 left-2">
              <Badge
                variant="secondary"
                className="text-xs bg-black/80 text-white border-none"
              >
                <VideoIcon className="w-3 h-3 mr-1" />
                Video
              </Badge>
            </div>
          </>
        ) : (
          <>
            {/* Regular Image */}
            <img
              src={related.preview.src}
              alt={related.metadata.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.png";
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {related.metadata.title}
        </h4>
        <div className="flex items-center gap-2 mb-2">
          {related.preview.width && related.preview.height && (
            <Badge variant="secondary" className="text-xs">
              {related.preview.width} × {related.preview.height}
            </Badge>
          )}
        </div>
        {related.metadata.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {related.metadata.description}
          </p>
        )}
      </div>
    </div>
  );
}
