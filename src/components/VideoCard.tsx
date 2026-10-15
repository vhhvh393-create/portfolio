import React from 'react';
import { VideoItem } from '../data/portfolioData';

interface VideoCardProps {
  video: VideoItem;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <div className="glass-panel p-2 md:p-2.5 rounded-2xl transition-all duration-300 hover:border-[#ffd700]/50 hover:shadow-xl hover:shadow-[#ffd700]/10">
      {/* Video Player Frame */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-[#ffd700]/20 shadow-inner">
        <iframe
          className="w-full h-full rounded-xl"
          src={`${video.embedUrl}?rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};
